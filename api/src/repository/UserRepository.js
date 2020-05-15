const db = require('../data/db.js')
const { get, persist } = require('./EntityRepository')
const bcrypt = require('bcryptjs')

async function createUser (name, email, password) {
  // TODO email validation
  const hasUser = getUserByEmail(email)
  if (hasUser) {
    throw new Error('createUser - User already exists')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = {
    id: `user-${db.users.idCount}`,
    createdAt: new Date().getTime(),
    name: name,
    email: email,
    password: hashedPassword
  }
  return persist(db.users, user)
}

function getUserByEmail (email) {
  const users = Object.values(db.users)
  for (const user of users) {
    if (user.email === email) {
      return user
    }
  }
}

function getUser (id) {
  return get(db.users, id)
}

module.exports = {
  createUser,
  getUserByEmail,
  getUser
}
