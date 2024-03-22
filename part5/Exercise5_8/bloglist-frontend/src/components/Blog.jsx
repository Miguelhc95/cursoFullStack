import React, { useState } from 'react';

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

  const functionLikes = () => {
    console.log("liked")
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