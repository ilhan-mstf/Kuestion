const jwt = require('jsonwebtoken')
const APP_SECRET = 'Arise, arise, Riders of Théoden! ... Ride now, ride now! Ride to Gondor!'

function getAuthorization (context) {
  try {
    const authorization = context.event.headers.Authorization || context.request.get('Authorization')
    return authorization
  } catch (err) {
    return undefined
  }
}

function getEmail (context) {
  const authorization = getAuthorization(context)
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const { email } = jwt.verify(token, APP_SECRET)
    return email
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getEmail,
  getAuthorization
}
