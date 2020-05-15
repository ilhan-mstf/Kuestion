const SessionRepository = require('../repository/SessionRepository')
const UserRepository = require('../repository/UserRepository')
const Authentication = require('../authentication')

function info () {
  return `This is the API of a Kuestion App`
}

function session (parent, { id }) {
  return SessionRepository.getSession(id)
}

function user (parent, args, context) {
  const userId = Authentication.getUserId(context)
  return UserRepository.getUser(userId)
}

module.exports = {
  info,
  session,
  user
}
