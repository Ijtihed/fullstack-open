import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../requests'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()
  const notify = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnec) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnec))
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim().length < 5) {
      notify('anecdote must be at least 5 characters', 5)
      return
    }
    const trimmed = content.trim()
    newAnecdoteMutation.mutate(trimmed)
    notify(`you added '${trimmed}'`, 5)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit" style={{ marginLeft: 8 }}>
        create
      </button>
    </form>
  )
}

export default AnecdoteForm 