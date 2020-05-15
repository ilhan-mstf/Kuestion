const db = require('../data/db.js')
const { get, persist } = require('./EntityRepository')

function createQuestion (text, sessionId, postedBy) {
  if (!postedBy) {
    throw new Error('createQuestion - No user found')
  }
  const question = {
    id: `question-${db.questions.idCount}`,
    createdAt: new Date().getTime(),
    text: text,
    sessionId: sessionId,
    userId: postedBy,
    voteCount: 0
  }
  return persist(db.questions, question)
}

function getQuestion (id) {
  return get(db.questions, id)
}

function getQuestionsOfSession (sessionId) {
  return Object.values(db.questions).filter(q => q.sessionId === sessionId)
}

function incrementVoteCount (id) {
  const question = getQuestion(id)
  console.log("incrementVoteCount", question, id)
  if (question) {
    question.voteCount += 1
  }
}

function getQuestionCountOfSession (sessionId) {
  let count = 0
  Object.values(db.questions).forEach(q => {
    if (q.sessionId === sessionId) {
      count++
    }
  })
  return count
}

module.exports = {
  createQuestion,
  getQuestion,
  getQuestionsOfSession,
  incrementVoteCount,
  getQuestionCountOfSession
}
