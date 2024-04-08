import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'

const NotificationError = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
    </div>
  );

  
};

NotificationError.propTypes = {
    message: PropTypes.string,
};

const NotificationCorrect = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="correct">
      {message}
    </div>
  );
};

NotificationCorrect.propTypes = {
  message: PropTypes.string,
};

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [messageError, setMessageError] = useState(null)
  const [messageCorrect, setMessageCorrect] = useState(null)
  

  const handleLogin = async (event) => {
    event.preventDefault()
  
    console.log("Handling login...")
    
    try {
      const user = await loginService.login({
        username, password,
      })
      
      console.log("User logged in:", user)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error("Login error:", exception)
      setMessageError('Wrong credentials')
      setTimeout(() => {
        setMessageError(null)
      }, 5000)
    }
  }

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }
  

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h1>Log in to application</h1>
      </div>
      <div>
        username
        <input
          type="text"
          id = "username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id = "password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id = "logButton" type="submit">login</button>
      
      <NotificationError message={messageError} />
      <NotificationCorrect message={messageCorrect} />
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

const BlogForm = ({ setBlogs, token }) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [messageError, setMessageError] = useState(null)
  const [messageCorrect, setMessageCorrect] = useState(null)
  const [formVisible, setFormVisible] = useState(false); 

  blogService.setToken(token);

  const handleCreate = async (event) => {
    event.preventDefault()
  
    console.log("Handling create blog...")
    
    try {
      const blog = {title, author, url}
      
      await blogService.postBlog(blog, token)
      
      console.log("New Blog created:", blog)
      setMessageCorrect("A new Blog " + blog.title + " was added!")
      setTimeout(() => {
        setMessageCorrect(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (exception) {
      console.error("Create error:", exception)
      setMessageError('Wrong data')
      setTimeout(() => {
        setMessageError(null)
      }, 5000)
    }
  }

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible); 
  }

  return (
    <div>
      <button onClick={toggleFormVisibility}>Add blog</button>
      {formVisible && ( 
        <form onSubmit={handleCreate}>
          <div>
            <h1>Create New Blog</h1>
            <NotificationError message={messageError} />
            <NotificationCorrect message={messageCorrect} />
          </div>
          <div>
            title
            <input
              id = "titleBlog"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder='title'
            />
          </div>
          <div>
            author
            <input
              id = "authorBlog"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder='author'
            />
          </div>
          <div>
            url
            <input
              id = "urlBlog"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              placeholder='url'
            />
          </div>
          <button type="submit">create</button>
          <button type="button" onClick={toggleFormVisibility}>Cancel</button>
        </form>
      )}
    </div>
  )
}

BlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null); 
  const [messageError, setMessageError] = useState(null)
  const [messageCorrect, setMessageCorrect] = useState(null)

  useEffect(() => {
    console.log("Fetching blogs...")
    blogService.getAll().then(blogs => {
      console.log("Blogs fetched:", blogs)
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs)
    })  
  }, [token])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setToken(null)
  }

  console.log("Rendering App component...")

  return (
    <div>
      
      <NotificationError message={messageError} />
      <NotificationCorrect message={messageCorrect} />
      
      {user === null ?
        <LoginForm setUser={setUser} /> :
        <div>
          {user.username} logged in <button onClick={handleLogout}>Logout</button>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <BlogForm setBlogs={setBlogs} token={token}/>
          
        </div>
      }
    </div>
  )
}

export default App