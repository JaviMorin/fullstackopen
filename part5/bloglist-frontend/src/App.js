import React,{ useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload()
  }

  const handleUsernameChanged = ({ target }) => setUsername(target.value)

  const handlePasswordChanged = ({ target }) => setPassword(target.value)

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog '${blogObject.title}' by '${blogObject.author}' added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const increaseLikes = id => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = {
      user: (blog.user && blog.user.id ? blog.user.id : null),
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(() => {
        setMessage(
          `The blog with title '${blog.title}' was already removed from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  const remove = id => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
      .catch(() => {
        setMessage(
          'There was an error'
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      <div>
        { user.name } is logged in
        <button onClick={handleLogout}>
            logout
        </button>
      </div>
      <br/>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} increaseLikes={() => increaseLikes(blog.id)} remove={() => remove(blog.id)}/>
      )}
    </div>
  )

  return (
    <>
      <Notification message={message} />
      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username} handleUsernameChanged={handleUsernameChanged} password={password} handlePasswordChanged={handlePasswordChanged} /> :
        blogsForm()
      }
    </>
  )
}

export default App
