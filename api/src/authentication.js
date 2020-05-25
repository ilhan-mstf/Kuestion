const jwt = require('jsonwebtoken')
const APP_SECRET = 'Arise, arise, Riders of Théoden! ... Ride now, ride now! Ride to Gondor!'

function getEmail (context) {
  //console.log(context)
  const headers = context.request || context.event.headers
  const authorization = headers.authorization || headers.get('Authorization')
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const { email } = jwt.verify(token, APP_SECRET)
    return email
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getEmail
}
