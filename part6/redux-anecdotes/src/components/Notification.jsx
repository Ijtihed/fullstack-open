import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const [message] = useContext(NotificationContext)
  if (!message) return null

  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
  }

  return <div style={style}>{message}</div>
}

export default Notification 