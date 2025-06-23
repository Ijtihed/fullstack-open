import { setNotification, clearNotification } from '../reducers/notificationReducer'

export const showNotification = (msg, seconds = 5) => (dispatch) => {
  dispatch(setNotification(msg))
  setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000)
} 