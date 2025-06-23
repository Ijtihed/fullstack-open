import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => (await axios.get(baseUrl)).data

export const createNew = async (content) => (
  await axios.post(baseUrl, { content, votes: 0 })
).data

export const voteAnecdote = async (anecdote) => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 }
  return (await axios.put(`${baseUrl}/${anecdote.id}`, updated)).data
} 