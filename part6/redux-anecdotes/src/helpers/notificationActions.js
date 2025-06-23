import { setNotification, clearNotification } from '../reducers/notificationReducer'

export const setTimedNotification = (msg, seconds = 5) => (dispatch) => {
  dispatch(setNotification(msg))
  setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000)
} 