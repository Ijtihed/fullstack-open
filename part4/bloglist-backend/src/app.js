const express = require('express')
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/blogs', blogsRouter)

module.exports = app 