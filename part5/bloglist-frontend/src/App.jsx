import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Nav from './components/Nav'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'
import BlogDetail from './pages/BlogDetail'
import blogService from './services/blogs'
import loginService from './services/login'
import { useAuth } from './contexts/AuthContext'
import { useNotification } from './contexts/NotificationContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showLogin, setShowLogin] = useState(false)

  const blogFormRef = useRef()

  const { user, setUser, clearUser } = useAuth()
  const { setNotification } = useNotification()

  const queryClient = useQueryClient()

  const { data: blogs = [] } = useQuery(['blogs'], blogService.getAll)

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }
  }, [user])

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      setNotification('blog added')
      blogFormRef.current.toggleVisibility()
    },
    onError: () => {
      setNotification('failed to add blog')
    },
  })

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      setUsername('')
      setPassword('')
      setShowLogin(false)
    } catch {
      setNotification('wrong credentials')
    }
  }

  const handleLogout = () => {
    clearUser()
  }

  const addBlog = blogObject => {
    createBlogMutation.mutate(blogObject)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username" data-testid="username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" data-testid="password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
      <button type="button" onClick={() => setShowLogin(false)}>
        cancel
      </button>
    </form>
  )

  const BlogList = () => (
    <div>
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )

  return (
    <div>
      <Nav />
      <h2>Blog App</h2>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={user === null ? (showLogin ? loginForm() : <button onClick={() => setShowLogin(true)}>log in</button>) : <BlogList />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  )
}

export default App