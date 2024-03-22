import React, { useState } from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [formVisible, setFormVisible] = useState(false); 

  const visibleBlog = () => {
    setFormVisible(!formVisible)
  }

  const functionLikes = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      await blogService.putBlog(blog.id, updatedBlog);
    } catch (exception) {
      console.error("Modify error:", exception);
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}<button onClick={visibleBlog}>show</button>
        {formVisible && (<div>
          <p>
            {blog.author}
          </p> 
          <p>
            {blog.likes} 
            <button onClick={functionLikes}>like</button>
          </p> 
          <p>
            {blog.url}
          </p> 
          <p>
            {blog.user.username}
          </p>
          <button onClick={visibleBlog}>hide</button>
        </div>
        )}
      </div>
  </div>
)}

export default Blog