const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
let token =''

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jnieve',
      name: 'Jon Nieve',
      password: 'kinginthenorth',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Tyrion',
      password: 'lanister',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if do not pass username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root2',
      name: 'Tyrion',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `password` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if do not pass username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Tyrion',
      password: 'lanister',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username length is less than three', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Tyrion',
      password: 'lanister',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `username`')
    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username length is less than three', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root3',
      name: 'Tyrion',
      password: 'la',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Path `password`')
    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = helper.initialBlogs
  .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())

  let response = await api
  .post('/api/login')
  .send({ username: 'root', password: 'sekret' })

  token = response.body.token

  await Promise.all(promiseArray)
  console.log('done')

})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

test('a blog do not contain an id attribute', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]
  
    expect(blogToView.id).toBeDefined();
  })

test('a valid blog can be added ', async () => {
    const newBlog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Canonical string reduction'
    )
  })

  test('likes is zero for default', async () => {
    const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const blogCreated = blogsAtEnd.find(n => n.title==newBlog.title)
    expect(blogCreated.likes).toEqual(0)
  })

  test('title and url missed', async () => {
    const newBlog = {
      _id: "5a422ba71b54a676234d17fb",
      author: "Robert C. Martin",
      likes: 0,
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  })

  test('authorization error 401 if no token', async () => {
    const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  
  })

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('testing put', () => {
  test('put new value to likes', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToPut = blogsAtStart[0]

    const updatedBlog = {
      likes: 10,
    }

    await api
      .put(`/api/blogs/${blogToPut.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const blogToPutAtEnd = blogsAtEnd[0]
    expect(blogToPutAtEnd.likes).toEqual(10)
  })
})

afterAll(() => {
    mongoose.connection.close()
    }) 