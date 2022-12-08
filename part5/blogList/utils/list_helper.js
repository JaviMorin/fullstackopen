const dummy = (blog) => {
    if(Array.isArray(blog))
        return 1
  }

const totalLikes = (blog) => {
    const reducer = (sum, blog) => {
      return sum + blog.likes
    }
  
    return blog.reduce(reducer, 0)
  }

const favoriteBlog = (blog) => {
    const reducer2 = (max, blog) => {
      return max.likes === undefined || blog.likes > max.likes ? blog : max
    }
  
    return blog.reduce(reducer2, {})
  }

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }

