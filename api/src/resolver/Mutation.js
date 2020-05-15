const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Authentication = require('../authentication')

const SessionRepository = require('../repository/SessionRepository')
const UserRepository = require('../repository/UserRepository')
const QuestionRepository = require('../repository/QuestionRepository')
const VoteRepository = require('../repository/VoteRepository')

function createSession (parent, { title, description }, context) {
  const postedBy = Authentication.getUserId(context)
  return SessionRepository.createSession(title, description, postedBy)
}

function updateSession (parent, { id, title, description }, context) {
  const updatedBy = Authentication.getUserId(context)
  return SessionRepository.updateSession(id, title, description, updatedBy)
}

function deleteSession (parent, { id }, context) {
  const deletedBy = Authentication.getUserId(context)
  return SessionRepository.deleteSession(id, deletedBy)
}

function createQuestion (parent, { text, sessionId }, context) {
  const postedBy = Authentication.getUserId(context)
  return QuestionRepository.createQuestion(text, sessionId, postedBy)
}

async function signup (parent, { name, email, password }, context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    throw new Error('signup - Already logged in!')
  }

  const user = await UserRepository.createUser(name, email, password)
  const token = jwt.sign({ userId: user.id }, Authentication.APP_SECRET)

  return {
    token,
    user
  }
}

async function login (parent, { email, password }, context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    throw new Error('login - Already logged in!')
  }

  const user = UserRepository.getUserByEmail(email)
  if (!user) {
    console.log(`No such user found for ${email}`)
    throw new Error('login - Invalid username or password')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    console.log(`Invalid password for ${email}`)
    throw new Error('login - Invalid username or password')
  }

  const token = jwt.sign({ userId: user.id }, Authentication.APP_SECRET)

  return {
    token,
    user
  }
}

function vote (parent, { questionId, sessionId }, context) {
  const postedBy = Authentication.getUserId(context)
  return VoteRepository.createVote(questionId, sessionId, postedBy)
}

module.exports = {
  createSession,
  updateSession,
  deleteSession,

  createQuestion,

  signup,
  login,

  vote
}
