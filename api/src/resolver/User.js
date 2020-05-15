const SessionRepository = require('../repository/SessionRepository')

module.exports = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  email: (parent) => parent.email,
  sessions: (parent) => SessionRepository.getSessionsOfUser(parent.id)
}
