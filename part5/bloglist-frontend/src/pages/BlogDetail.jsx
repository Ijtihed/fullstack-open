import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [comment, setComment] = useState('')
  const { setNotification } = useNotification()

  const { data: blog, isLoading } = useQuery(['blog', id], () => blogService.getById(id), {
    retry: 1,
  })

  const likeMutation = useMutation(() => blogService.updateLikes(id, { ...blog, likes: blog.likes + 1, user: blog.user.id }), {
    onSuccess: updated => {
      queryClient.invalidateQueries(['blogs'])
      queryClient.setQueryData(['blog', id], updated)
    },
    onError: () => {
      setNotification('please log in')
    },
  })

  const commentMutation = useMutation(() => blogService.addComment(id, comment), {
    onSuccess: updated => {
      setComment('')
      queryClient.invalidateQueries(['blogs'])
      queryClient.setQueryData(['blog', id], updated)
    },
    onError: () => setNotification('please log in'),
  })

  const deleteMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      navigate('/')
    },
  })

  if (isLoading) return <div>loading…</div>
  if (!blog) return <div>blog not found</div>

  const canRemove = user && blog.user && user.username === blog.user.username

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}{' '}
        <button onClick={() => likeMutation.mutate()}>like</button>
      </div>
      <div>added by {blog.user && blog.user.name}</div>
      {canRemove && (
        <button
          onClick={() => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
              deleteMutation.mutate(blog.id)
            }
          }}
        >
          remove
        </button>
      )}

      <h3>comments</h3>
      <input value={comment} onChange={e => setComment(e.target.value)} />
      <button disabled={!comment.trim()} onClick={() => commentMutation.mutate()}>add comment</button>
      <ul>
        {(blog.comments || []).map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetail 