import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, like, handleLike, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5
  }

  const detailsStyle = {
    display: showDetails ? '' : 'none',
  }

  const onLike = like || handleLike

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      <div className="blogDetails" style={detailsStyle}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={onLike}>like</button>
        </div>
        <div>{blog.user && blog.user.name}</div>
        {user && blog.user && user.username === blog.user.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
  like: PropTypes.func,
  handleLike: PropTypes.func,
  handleRemove: PropTypes.func
}

export default Blog