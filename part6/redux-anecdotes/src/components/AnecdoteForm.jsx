import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim()) {
      dispatch(createAnecdote(content.trim()))
      setContent('')
    }
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