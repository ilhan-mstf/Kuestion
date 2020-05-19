const SessionRepository = require('../repository/SessionRepository')

module.exports = {
  name: (parent) => parent.name,
  email: (parent) => parent.email,
  sessions: (parent, args, context) => SessionRepository.getSessionsOfUser(context.repo, parent.email)
}
