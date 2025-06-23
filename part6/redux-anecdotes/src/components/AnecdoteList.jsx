import { useSelector } from 'react-redux'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, voteAnecdote } from '../requests'
import { useNotification } from '../NotificationContext'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const notify = useNotification()

  const { data: anecdotes = [] } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
  })

  const filter = useSelector((state) => state.filter)

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id === updated.id ? updated : a))
      )
    },
  })

  const handleVote = (anec) => {
    voteMutation.mutate(anec)
    notify(`you voted '${anec.content}'`, 5)
  }

  const shown = (() => {
    const normalized = filter.trim().toLowerCase()
    return normalized
      ? anecdotes.filter((a) => a.content.toLowerCase().includes(normalized))
      : anecdotes
  })().sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {shown.map((anecdote) => (
        <div key={anecdote.id} style={{ marginBottom: 8 }}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)} style={{ marginLeft: 8 }}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList 