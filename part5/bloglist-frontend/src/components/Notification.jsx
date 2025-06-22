const Notification = ({ message }) => {
  if (message === null) {
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
      {message}
    </div>
  )
}

export default Notification 