function createSession (repo, postedBy, title, description) {
  if (!postedBy) {
    throw new Error('createSession - No user found')
  }
  
  const session = {
    email: postedBy,
    createdAt: new Date().getTime(),
    title: title,
    description: description,
    totalQuestionCount: 0,
    totalVoteCount: 0
  }
  
  return repo.Session.persist(session)
}

function getSession (repo, id) {
  return repo.Session.get(id)
}

async function updateSession (repo, id, updatedBy, title, description) {
  const session = await getSession(repo, id)
  if (!session) {
    throw new Error('updateSession - No session found')
  }
  if (session.email !== updatedBy) {
    throw new Error('updateSession - Not allowed')
  }

  session.title = title || session.title
  session.description = description || session.description
  
  return repo.Session.update(session)
}

function getSessionsOfUser (repo, email) {
  return repo.Session.getSessionsOfUser(email)
}

function incrementTotalQuestionCount (repo, id) {
  return repo.Session.incrementTotalQuestionCount(id)
}

function incrementTotalVoteCount (repo, id) {
  return repo.Session.incrementTotalVoteCount(id)
}

module.exports = {
  getSession,
  createSession,
  updateSession,
  getSessionsOfUser,
  incrementTotalQuestionCount,
  incrementTotalVoteCount
}