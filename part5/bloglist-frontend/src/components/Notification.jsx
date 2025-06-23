import { useNotification } from '../contexts/NotificationContext'

const Notification = () => {
  const { notification } = useNotification()

  if (notification === null) {
    return null
  }

  const style = {
    border: '1px solid',
    padding: 10,
    marginBottom: 10,
    color: 'red'
  }

  return (
    <div style={style} className="error">
      {notification}
    </div>
  )
}

export default Notification 