const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../src/app')
const Blog = require('../src/models/blog')
const helper = require('./test_helper')

const api = supertest(app)

let token

beforeEach(async () => {
  // reset users and ensure we have a root user
  await helper.resetUsers()

  await Blog.deleteMany()
  await Blog.insertMany(helper.initialBlogs)

  // login to obtain token
  const res = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  token = res.body.token
})

test('blogs are returned as json & correct amount', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(res.body.length, helper.initialBlogs.length)
})

test('identifier field is id', async () => {
  const res = await api.get('/api/blogs')
  assert.ok(res.body[0].id)
  assert.ok(!res.body[0]._id)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async/Await',
    author: 'Ada',
    url: 'http://c.com',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  assert.ok(blogsAtEnd.map((b) => b.title).includes('Async/Await'))
})

test('if likes missing, defaults to 0', async () => {
  const newBlog = { title: 'No likes', author: 'Anon', url: 'http://nolikes.com' }
  const res = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201)
  assert.strictEqual(res.body.likes, 0)
})

test('blog without title is rejected', async () => {
  const bad = { author: 'NoTitle', url: 'http://x.com' }
  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(bad).expect(400)
})

test('blog without url is rejected', async () => {
  const bad = { title: 'NoUrl', author: 'NoUrl' }
  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(bad).expect(400)
})

test('a blog can be deleted', async () => {
  const start = await helper.blogsInDb()
  const id = start[0].id

  await api.delete(`/api/blogs/${id}`).set('Authorization', `Bearer ${token}`).expect(204)

  const end = await helper.blogsInDb()
  assert.strictEqual(end.length, start.length - 1)
})

test('likes can be updated', async () => {
  const [blog] = await helper.blogsInDb()
  const res = await api
    .put(`/api/blogs/${blog.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ likes: blog.likes + 1 })
    .expect(200)
  assert.strictEqual(res.body.likes, blog.likes + 1)
})

test('add blog fails 401 without token', async () => {
  await api.post('/api/blogs').send({ title: 'x', url: 'y' }).expect(401)
})

after(async () => {
  await mongoose.connection.close()
}) 