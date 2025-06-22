const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const decoded = jwt.verify(req.token, process.env.SECRET || 'secret')
  if (!decoded.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decoded.id)

  const blog = new Blog({ ...req.body, user: user._id })
  const savedBlog = await blog.save()

  user.blogs = (user.blogs || []).concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )
  res.json(updatedBlog)
})

module.exports = blogsRouter 