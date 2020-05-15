const db = require('../data/db.js')
const { get, persist } = require('./EntityRepository')
const QuestionRepository = require('./QuestionRepository')

function createVote (questionId, sessionId, postedBy) {
  if (!postedBy) {
    throw new Error('createVote - No user found')
  }
  const id = `${questionId}-${postedBy}`
  const hasVote = getVote(id)
  if (hasVote) {
    console.log('createVote - Already voted.', questionId, sessionId, postedBy)
    throw new Error(`createVote - Already voted`)
  }
  const vote = {
    id: id,
    questionId: questionId,
    sessionId: sessionId,
    userId: postedBy
  }
  QuestionRepository.incrementVoteCount(questionId)
  return persist(db.votes, vote)
}

function getVote (id) {
  return get(db.votes, id)
}

function getSessionVotesOfCurrentUser (sessionId, userId) {
  return Object.values(db.votes).filter(v => v.sessionId === sessionId && v.userId === userId)
}

function getVoteCountOfSession (sessionId) {
  let count = 0
  Object.values(db.votes).forEach(q => {
    if (q.sessionId === sessionId) {
      count++
    }
  })
  return count
}

module.exports = {
  createVote,
  getSessionVotesOfCurrentUser,
  getVoteCountOfSession
}
