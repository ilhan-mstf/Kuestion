const QuestionRepository = require('./QuestionRepository')
const SessionRepository = require('./SessionRepository')

async function createVote (repo, questionId, sessionId, postedBy) {
  if (!postedBy) {
    throw new Error('createVote - No user found', postedBy)
  }
  const hasQuestion = await QuestionRepository.getQuestion(repo, questionId)
  if (!hasQuestion) {
    throw new Error('createVote - No question found', questionId)
  }
  const hasSession = await SessionRepository.getSession(repo, sessionId)
  if (!hasSession) {
    throw new Error('createVote - No session found', sessionId)
  }

  const hasVote = await getVote(repo, questionId, postedBy)
  if (hasVote) {
    throw new Error(`createVote - Already voted`, questionId, postedBy)
  }

  const vote = {
    questionId: questionId,
    sessionId: sessionId,
    email: postedBy,
    createdAt: new Date().getTime()
  }
  const result = await repo.Vote.persist(vote)

  QuestionRepository.incrementVoteCount(repo, questionId)
  SessionRepository.incrementTotalVoteCount(repo, sessionId)

  return result
}

function getVote (repo, questionId, email) {
  return repo.Vote.get(questionId, email)
}

function getSessionVotesOfCurrentUser (repo, sessionId, userId) {
  return repo.Vote.getSessionVotesOfCurrentUser(sessionId, userId).map(v => v.questionId)
}

module.exports = {
  createVote,
  getSessionVotesOfCurrentUser
}