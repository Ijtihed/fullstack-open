const _ = require('lodash')

const dummy = () => 1

const totalLikes = blogs => blogs.reduce((sum, b) => sum + (b.likes || 0), 0)

const favoriteBlog = blogs =>
  blogs.reduce((fav, b) => (b.likes > (fav.likes || 0) ? b : fav), {})

const mostBlogs = blogs => {
  if (!blogs.length) return {}
  const grouped = _.countBy(blogs, 'author')
  const [author, blogsN] = Object.entries(grouped)
    .reduce((a, b) => (b[1] > a[1] ? b : a))
  return { author, blogs: blogsN }
}

const mostLikes = blogs => {
  if (!blogs.length) return {}
  const likesByAuthor = blogs.reduce((acc, b) => {
    acc[b.author] = (acc[b.author] || 0) + (b.likes || 0)
    return acc
  }, {})
  const [author, likes] = Object.entries(likesByAuthor)
    .reduce((a, b) => (b[1] > a[1] ? b : a))
  return { author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
} 