const SessionRepository = require('./SessionRepository')

async function createQuestion (repo, sessionId, postedBy, text) {
  if (!postedBy) {
    throw new Error('createQuestion - No user found')
  }
  const hasSession = await SessionRepository.getSession(repo, sessionId)
  if (!hasSession) {
    throw new Error('createQuestion - No session found')
  }
  // TODO string.notblank
  
  const question = {
    sessionId: sessionId,
    email: postedBy,
    createdAt: new Date().getTime(),
    text: text,
    voteCount: 0
  }
  const result = await repo.Question.persist(question)
  
  SessionRepository.incrementTotalQuestionCount(repo, sessionId)
  
  return result
}

function getQuestion (repo, id) {
  return repo.Question.get(id)
}

function getQuestionsOfSession (repo, sessionId) {
  return repo.Question.getQuestionsOfSession(sessionId)
}

function incrementVoteCount (repo, id) {
  return repo.Question.incrementVoteCount(id)
}

module.exports = {
  createQuestion,
  getQuestion,
  getQuestionsOfSession,
  incrementVoteCount
}