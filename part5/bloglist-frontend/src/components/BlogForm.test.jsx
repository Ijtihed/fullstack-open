import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BlogForm from './BlogForm'

test('calls onCreate with right fields', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog} />)

  await user.type(screen.getByTestId('title'), 'React patterns')
  await user.type(screen.getByTestId('author'), 'Michael Chan')
  await user.type(screen.getByTestId('url'), 'https://reactpatterns.com')
  await user.click(screen.getByText('create'))

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com',
  })
}) 