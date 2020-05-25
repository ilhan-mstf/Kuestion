const bcrypt = require('bcryptjs')

async function createUser (repo, name, email, password) {
  // TODO email validation
  const hasUser = await getUser(repo, email)
  if (hasUser) {
    throw new Error('createUser - User already exists')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = {
    createdAt: new Date().getTime(),
    name: name,
    email: email,
    password: hashedPassword
  }
  return repo.User.persist(user)
}

function getUser (repo, email) {
  return repo.User.get(email)
}

module.exports = {
  createUser,
  getUser
}
