const auth = require('./auth')

module.exports = async (req, res, next) => {
  const arr = ['/api', '/api/register', '/api/login']
  if (arr.includes(req.originalUrl)) {
    next()
  } else {
    auth(req, res, next)
  }
}
