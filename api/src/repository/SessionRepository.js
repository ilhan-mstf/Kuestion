const db = require('../data/db.js')
const { get, persist, remove } = require('./EntityRepository')

function createSession (title, description, postedBy) {
  if (!postedBy) {
    throw new Error('createSession - No user found')
  }
  const session = {
    id: `session-${db.sessions.idCount}`,
    createdAt: new Date().getTime(),
    title: title,
    description: description,
    userId: postedBy
  }
  return persist(db.sessions, session)
}

function getSession (id) {
  return get(db.sessions, id)
}

function updateSession (id, title, description, updatedBy) {
  const session = getSession(id)
  if (!session) {
    throw new Error('updateSession - No session found')
  }
  if (session.userId !== updatedBy) {
    throw new Error('updateSession - Not allowed')
  }
  session.title = title || session.title
  session.description = description || session.description
  return session
}

function deleteSession (id, deletedBy) {
  const session = getSession(id)
  if (!session) {
    throw new Error('deleteSession - No session found')
  }
  if (session.userId !== deletedBy) {
    throw new Error('deleteSession - Not allowed')
  }
  remove(db.sessions, id)
  // TODO You need to delete questions and votes associated with that session
  return session
}

function getSessionsOfUser (userId) {
  return Object.values(db.sessions).filter(s => s.userId === userId)
}

module.exports = {
  getSession,
  createSession,
  updateSession,
  deleteSession,
  getSessionsOfUser
}
