const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (_req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  res.json(users)
})

// get single user
usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('blogs', { title: 1, author: 1, url: 1 })
  if (!user) return res.status(404).end()
  res.json(user)
})

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  // basic field checks
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' })
  }
  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: 'username and password must be ≥3 chars' })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter 