const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Authentication = require('../authentication')

const SessionRepository = require('../repository/SessionRepository')
const UserRepository = require('../repository/UserRepository')
const QuestionRepository = require('../repository/QuestionRepository')
const VoteRepository = require('../repository/VoteRepository')

function createSession (parent, { title, description }, context) {
  const postedBy = Authentication.getEmail(context)
  return SessionRepository.createSession(context.repo, postedBy, title, description)
}

function updateSession (parent, { id, title, description }, context) {
  const updatedBy = Authentication.getEmail(context)
  return SessionRepository.updateSession(context.repo, id, updatedBy, title, description)
}

function createQuestion (parent, { text, sessionId }, context) {
  const postedBy = Authentication.getEmail(context)
  return QuestionRepository.createQuestion(context.repo, sessionId, postedBy, text)
}

async function signup (parent, { name, email, password }, context) {
  const Authorization = Authentication.getAuthorization(context)
  if (Authorization) {
    throw new Error('signup - Already logged in!')
  }

  const user = await UserRepository.createUser(context.repo, name, email, password)
  const token = jwt.sign({ email: user.email }, Authentication.APP_SECRET)

  return {
    token,
    user
  }
}

async function login (parent, { email, password }, context) {
  const Authorization = Authentication.getAuthorization(context)
  if (Authorization) {
    throw new Error('login - Already logged in!')
  }

  const user = await UserRepository.getUser(context.repo, email)
  if (!user.email) {
    console.log(`No such user found for ${email}`)
    throw new Error('login - Invalid username or password')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    console.log(`Invalid password for ${email}`)
    throw new Error('login - Invalid username or password')
  }

  const token = jwt.sign({ email: user.email }, Authentication.APP_SECRET)

  return {
    token,
    user
  }
}

function vote (parent, { questionId, sessionId }, context) {
  const postedBy = Authentication.getEmail(context)
  return VoteRepository.createVote(context.repo, questionId, sessionId, postedBy)
}

module.exports = {
  createSession,
  updateSession,

  createQuestion,

  signup,
  login,

  vote
}
