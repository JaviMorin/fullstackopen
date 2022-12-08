import React, { useState } from 'react'

const Blog = ({ blog, increaseLikes, remove }) => {

  const [pusblishForm, setPublishForm] = useState(false)

  const handlePublishForm =() => {
    setPublishForm(!pusblishForm)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButton = {
    backgroundColor: 'ligthblue',
    borderWidth: 1
  }

  return (
    <div style={blogStyle}>
      {pusblishForm === false ?
        <div id="blog">
          <div className="title">{blog.title}</div>
          <div className="author">{blog.author}</div>
          <button id="view" onClick={handlePublishForm}>
            view
          </button>
        </div>
        :<div id="blog">
          <p className="title">{blog.title}
            <button id="hide" onClick={handlePublishForm}>
              hide
            </button>
          </p>
          <p className="url">{blog.url}</p>
          <p id="like" className="likes">{blog.likes}
            <button onClick={increaseLikes}>
              like
            </button>
          </p>
          <p className="author">{blog.author}</p>
          <p>
            <button style={removeButton} onClick={remove}>
              remove
            </button>
          </p>
        </div>}
    </div>
  )}

export default Blog