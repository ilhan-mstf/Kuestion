const SessionRepository = require('../repository/SessionRepository')
const UserRepository = require('../repository/UserRepository')
const Authentication = require('../authentication')

function info () {
  return `This is the API of a Kuestion App`
}

function session (parent, { id }, context) {
  return SessionRepository.getSession(context.repo, id)
}

function user (parent, args, context) {
  const email = Authentication.getEmail(context)
  return UserRepository.getUser(context.repo, email)
}

module.exports = {
  info,
  session,
  user
}
