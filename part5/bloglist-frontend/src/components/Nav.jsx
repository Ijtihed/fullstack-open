import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Nav = () => {
  const { user, clearUser } = useAuth()

  const linkStyle = {
    padding: 5,
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <Link style={linkStyle} to="/">
        blogs
      </Link>
      <Link style={linkStyle} to="/users">
        users
      </Link>
      {user ? (
        <>
          <em>{user.name} logged in</em>{' '}
          <button onClick={clearUser}>logout</button>
        </>
      ) : null}
    </div>
  )
}

export default Nav 