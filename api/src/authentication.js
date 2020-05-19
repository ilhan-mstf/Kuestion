const jwt = require('jsonwebtoken')
const APP_SECRET = 'Arise, arise, Riders of Théoden! ... Ride now, ride now! Ride to Gondor!'

function getEmail (context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { email } = jwt.verify(token, APP_SECRET)
    return email
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getEmail
}
