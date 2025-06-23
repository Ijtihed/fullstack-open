import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const initialUser = () => {
  const stored = window.localStorage.getItem('loggedBlogappUser')
  return stored ? JSON.parse(stored) : null
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, null, initialUser)
  return <AuthContext.Provider value={[user, dispatch]}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const [user, dispatch] = useContext(AuthContext)

  const setUser = userObj => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userObj))
    dispatch({ type: 'SET', payload: userObj })
  }

  const clearUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({ type: 'CLEAR' })
  }

  return { user, setUser, clearUser }
} 