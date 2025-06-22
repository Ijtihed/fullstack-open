import { test, expect } from '@playwright/test'
import { resetDB, createUser, loginUI, createBlogUI } from './helpers.js'

test.beforeEach(async ({ page, request }) => {
  await resetDB(request)
  await createUser(request, {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
  })
  await page.goto('/')
})

test('Login form is shown', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'log in' })).toBeVisible()
})

test.describe('Login', () => {
  test('succeeds with correct creds', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('mluukkai logged in')).toBeVisible()
  })

  test('fails with wrong creds', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()
    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('wrong credentials')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
  })
})

test('Logged user can create a blog', async ({ page }) => {
  await loginUI(page, 'mluukkai', 'salainen')
  await createBlogUI(page, { title: 'Playwright e2e', author: 'Test', url: 'http://pw.dev' })
})

test('User can like a blog', async ({ page }) => {
  await loginUI(page, 'mluukkai', 'salainen')
  await createBlogUI(page, { title: 'Like me', author: 'A', url: 'x' })
  const likeRow = page.locator('.blog', { hasText: 'Like me A' })
  await likeRow.getByRole('button', { name: 'view' }).click()
  const likeBtn = likeRow.getByRole('button', { name: 'like' })
  await likeBtn.click()
  await expect(page.getByText('likes 1')).toBeVisible()
})

test('Creator can delete blog', async ({ page }) => {
  await loginUI(page, 'mluukkai', 'salainen')
  await createBlogUI(page, { title: 'Delete me', author: 'A', url: 'x' })
  const delRow = page.locator('.blog', { hasText: 'Delete me A' })
  await delRow.getByRole('button', { name: 'view' }).click()
  page.once('dialog', dialog => dialog.accept())
  await delRow.getByRole('button', { name: 'remove' }).click()
  await expect(page.locator('.blog', { hasText: 'Delete me A' })).toHaveCount(0)
})

test('Delete button only for creator', async ({ page, request, browser }) => {
  await loginUI(page, 'mluukkai', 'salainen')
  await createBlogUI(page, { title: 'Owner only', author: 'A', url: 'x' })
  await page.context().clearCookies()
  await createUser(request, { name: 'Other User', username: 'other', password: 'password' })
  const page2 = await browser.newPage()
  await page2.goto('/')
  await loginUI(page2, 'other', 'password')
  const ownerRow = page2.locator('.blog', { hasText: 'Owner only A' })
  await ownerRow.getByRole('button', { name: 'view' }).click()
  await expect(ownerRow.getByRole('button', { name: 'remove' })).toBeHidden()
})

test('Blogs ordered by likes', async ({ page }) => {
  await loginUI(page, 'mluukkai', 'salainen')
  await createBlogUI(page, { title: 'First', author: 'A', url: 'x' })
  await createBlogUI(page, { title: 'Second', author: 'A', url: 'x' })
  const secondRow = page.locator('.blog', { hasText: 'Second A' })
  await secondRow.getByRole('button', { name: 'view' }).click()
  const like2 = secondRow.getByRole('button', { name: 'like' })
  await like2.click()
  await like2.click()
  await page.reload()
  const firstBlogTitle = await page.locator('.blog').first().textContent()
  expect(firstBlogTitle).toContain('Second')
}) 