import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'

const blog = {
  title: 'FSO rocks',
  author: 'University of Helsinki',
  url: 'http://fullstackopen.com',
  likes: 7,
  user: { username: 'root', name: 'Super User' },
}

test('renders title and author but no url/likes by default', () => {
  render(<Blog blog={blog} like={() => {}} />)

  const compact = screen.getByText('FSO rocks University of Helsinki')
  expect(compact).toBeDefined()

  const details = screen.getByText('likes 7').parentElement
  expect(details).toHaveStyle('display: none')
})

test('url and likes are shown after clicking view', async () => {
  const user = userEvent.setup()
  render(<Blog blog={blog} like={() => {}} />)

  await user.click(screen.getByText('view'))
  const details = screen.getByText('likes 7').parentElement
  expect(details).not.toHaveStyle('display: none')
})

test('clicking like twice calls event handler twice', async () => {
  const mockLike = vi.fn()
  const user = userEvent.setup()
  render(<Blog blog={blog} like={mockLike} />)

  await user.click(screen.getByText('view'))
  const likeBtn = screen.getByText('like')
  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(mockLike.mock.calls).toHaveLength(2)
}) 