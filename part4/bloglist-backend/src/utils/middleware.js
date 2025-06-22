const logger = require('./logger')

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, _req, res, next) => {
  logger.error(err.message)

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  if (err.name === 'MongoServerError' && err.message.includes('E11000')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }

  next(err)
}

const tokenExtractor = (req, _res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  }
  next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor } 