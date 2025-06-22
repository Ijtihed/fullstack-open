const logger = require('./logger')

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, _req, res, next) => {
  logger.error(err.message)

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

module.exports = { unknownEndpoint, errorHandler } 