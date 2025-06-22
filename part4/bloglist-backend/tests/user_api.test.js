const supertest = require('supertest')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const app = require('../src/app')
const api = supertest(app)
const helper = require('./test_helper')
const mongoose = require('mongoose')

describe('user creation', () => {
  beforeEach(async () => {
    await helper.resetUsers()
  })

  test('fails if username taken', async () => {
    const bad = { username: 'root', name: 'dup', password: 'pwd' }
    const res = await api.post('/api/users').send(bad).expect(400)
    assert.ok(res.body.error.includes('unique'))
  })

  test('fails if pw too short', async () => {
    const bad = { username: 'new', name: 'x', password: 'pw' }
    await api.post('/api/users').send(bad).expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
}) 