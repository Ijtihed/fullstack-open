const Blog = require('../src/models/blog')

const initialBlogs = [
  { title: 'HTML is easy', author: 'Jane', url: 'http://a.com', likes: 5 },
  { title: 'JS is fun', author: 'John', url: 'http://b.com', likes: 10 },
]

const blogsInDb = async () => (await Blog.find()).map(b => b.toJSON())

module.exports = { initialBlogs, blogsInDb } 