import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { getAll } from './requests'

const App = () => {
  const { isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false,
  })

  if (isLoading) return 'loading data…'
  if (isError) return 'service not available due to problems in server'

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App