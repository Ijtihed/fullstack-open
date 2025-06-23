import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog