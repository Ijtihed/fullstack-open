const { test, describe } = require('node:test')
const assert = require('node:assert')

const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
} = require('../src/utils/list_helper')

describe('dummy', () => {
  test('returns one', () => {
    assert.strictEqual(dummy([]), 1)
  })
})

describe('total likes', () => {
  const empty = []
  const listWithOne = [{ likes: 5 }]
  const many = [{ likes: 1 }, { likes: 2 }, { likes: 3 }]

  test('of empty list is zero', () =>
    assert.strictEqual(totalLikes(empty), 0))

  test('of one blog equals its likes', () =>
    assert.strictEqual(totalLikes(listWithOne), 5))

  test('of many blogs is the sum', () =>
    assert.strictEqual(totalLikes(many), 6))
})

describe('favorite blog', () => {
  test('of empty list is empty object', () => {
    assert.deepStrictEqual(favoriteBlog([]), {})
  })

  test('with highest likes is returned', () => {
    const blogs = [
      { title: 'a', likes: 1 },
      { title: 'b', likes: 7 },
      { title: 'c', likes: 5 }
    ]
    assert.deepStrictEqual(favoriteBlog(blogs), blogs[1])
  })
})

describe('most blogs', () => {
  const blogs = [
    { author: 'foo' },
    { author: 'bar' },
    { author: 'foo' }
  ]

  test('of empty list is empty object', () => {
    assert.deepStrictEqual(mostBlogs([]), {})
  })

  test('returns author with blog count', () => {
    assert.deepStrictEqual(mostBlogs(blogs), { author: 'foo', blogs: 2 })
  })
})

describe('most likes', () => {
  const blogs = [
    { author: 'foo', likes: 5 },
    { author: 'bar', likes: 10 },
    { author: 'foo', likes: 7 }
  ]

  test('of empty list is empty object', () => {
    assert.deepStrictEqual(mostLikes([]), {})
  })

  test('returns author with total likes', () => {
    assert.deepStrictEqual(mostLikes(blogs), { author: 'foo', likes: 12 })
  })
}) 