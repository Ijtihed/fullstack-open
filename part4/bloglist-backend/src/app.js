require('express-async-errors')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// ---------- DB connection ---------------
mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(err => logger.error('error connecting to MongoDB:', err.message))
// ----------------------------------------

// routes
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app 