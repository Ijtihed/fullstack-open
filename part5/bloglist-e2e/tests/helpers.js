import { expect } from '@playwright/test'

export const resetDB = async (request) =>
  request.post('/api/testing/reset')

export const createUser = async (request, user) =>
  request.post('/api/users', { data: user })

export const loginUI = async (page, username, password) => {
  await page.getByRole('button', { name: 'log in' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
  await expect(page.getByText(`${username} logged in`)).toBeVisible()
}

export const createBlogUI = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  const row = page.locator('.blog', { hasText: `${title} ${author}` })
  await expect(row).toBeVisible()
} 