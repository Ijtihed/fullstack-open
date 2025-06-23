import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const UserDetail = () => {
  const { id } = useParams()
  const { data: user } = useQuery(['users', id], () => userService.getById(id))

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail 