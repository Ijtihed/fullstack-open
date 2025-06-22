const Blog = require('../src/models/blog')
const User = require('../src/models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  { title: 'HTML is easy', author: 'Jane', url: 'http://a.com', likes: 5 },
  { title: 'JS is fun', author: 'John', url: 'http://b.com', likes: 10 },
]

const blogsInDb = async () => (await Blog.find()).map(b => b.toJSON())

const resetUsers = async () => {
  await User.deleteMany()
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })
  await user.save()
}

module.exports = { initialBlogs, blogsInDb, resetUsers } 