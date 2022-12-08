import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      url: newUrl,
      author: newAuthor
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm