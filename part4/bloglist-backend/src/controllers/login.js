const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const pwOk = user ? await bcrypt.compare(password, user.passwordHash) : false

  if (!pwOk) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET || 'secret',
    { expiresIn: 60 * 60 }
  )

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter 