import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent} from '@testing-library/react'
import Blog from './Blog'

test('show title and author but not show url and likes', () => {
    const blog = {
        author: 'Prueba autor',
        title: 'Prueba título',
        url: 'Prueba url',
        likes: 7
      }

  const component = render(
    <Blog blog={blog}/>
  )

  const div = component.container.querySelector('.title')
  expect(div).toHaveTextContent(
    'Prueba título'
  )
  const div2 = component.container.querySelector('.author')
  expect(div2).toHaveTextContent(
    'Prueba autor'
  )
  const div3 = component.container.querySelector('.url')
  expect(div3).toBeNull()

  const div4 = component.container.querySelector('.likes')
  expect(div4).toBeNull()

})

test('show title, author, url and likes if press view button', () => {
    const blog = {
        author: 'Prueba autor',
        title: 'Prueba título',
        url: 'Prueba url',
        likes: 7
      }

  const component = render(
    <Blog blog={blog}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.title')
  expect(div).toHaveTextContent(
    'Prueba título'
  )
  const div2 = component.container.querySelector('.author')
  expect(div2).toHaveTextContent(
    'Prueba autor'
  )
  const div3 = component.container.querySelector('.url')
  expect(div3).toHaveTextContent(
    'Prueba url'
  )

  const div4 = component.container.querySelector('.likes')
  expect(div4).toHaveTextContent(
    7
  )

})

test('click twice in likes button', () => {
  const blog = {
      author: 'Prueba autor',
      title: 'Prueba título',
      url: 'Prueba url',
      likes: 7
    }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} increaseLikes={mockHandler}/>
  )
  
  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)
  const buttonLikes = component.getByText('like')
  fireEvent.click(buttonLikes)
  fireEvent.click(buttonLikes)

  expect(mockHandler.mock.calls).toHaveLength(2)

})