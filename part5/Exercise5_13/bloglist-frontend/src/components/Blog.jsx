import React, { useState } from 'react';
import blogService from './../services/blogs';

const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };


  const functionLikes = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      await blogService.putBlog(blog.id, updatedBlog);
    } catch (exception) {
      console.error('Modify error:', exception);
    }
  };

  const removeBlog = async () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id)); 
        console.log('Blog deleted successfully');
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
          <div>
            <p>{blog.author}</p>
            <p>
              {blog.likes} <button onClick={functionLikes}>like</button>
            </p>
            <p>{blog.url}</p>
            <button onClick={removeBlog}>remove</button>
          </div>
      </div>
    </div>
  );
};

export default Blog
