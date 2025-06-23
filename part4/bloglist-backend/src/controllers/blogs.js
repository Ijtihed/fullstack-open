const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', { username: 1, name: 1 })
  if (!blog) {
    return res.status(404).end()
  }
  res.json(blog)
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
  const decoded = jwt.verify(req.token, process.env.SECRET || 'secret')
  if (!decoded.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const decoded = jwt.verify(req.token, process.env.SECRET || 'secret')
  if (!decoded.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const { likes } = req.body
  let updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context: 'query' }
  )
  updatedBlog = await updatedBlog.populate('user', { username: 1, name: 1 })
  res.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const decoded = jwt.verify(req.token, process.env.SECRET || 'secret')
  if (!decoded.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(req.params.id)
  blog.comments = (blog.comments || []).concat(req.body.comment)
  const saved = await blog.save()
  const populated = await saved.populate('user', { username: 1, name: 1 })
  res.json(populated)
})

module.exports = blogsRouter 