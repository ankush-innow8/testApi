const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded.id
    next()
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = auth
