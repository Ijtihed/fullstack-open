/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, '')
  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const [, dispatch] = useContext(NotificationContext)
  return (msg, sec = 5) => {
    dispatch({ type: 'SET', payload: msg })
    setTimeout(() => dispatch({ type: 'CLEAR' }), sec * 1000)
  }
}

export default NotificationContext 