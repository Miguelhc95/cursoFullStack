import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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
  

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h1>Log in to application</h1>
      </div>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      
      <NotificationError message={messageError} />
      <NotificationCorrect message={messageCorrect} />
    </form>
  )
}

const BlogForm = ({ setBlogs, token }) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [messageError, setMessageError] = useState(null)
  const [messageCorrect, setMessageCorrect] = useState(null)
  const [formVisible, setFormVisible] = useState(false); // Estado para controlar la visibilidad del formulario

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
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
          <button type="button" onClick={toggleFormVisibility}>Cancel</button>
        </form>
      )}
    </div>
  )
}

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