import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent} from '@testing-library/react'
import BlogForm from './BlogForm'

test('The form calls event handler', () => {
    const mockHandler = jest.fn()

    const component = render(
        <BlogForm createBlog={mockHandler}/>
    )

    const input = component.container.querySelector('#title')
    const form = component.container.querySelector('form')

    fireEvent.change(input, { 
        target: { value: 'testing title' } 
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('testing title')
})