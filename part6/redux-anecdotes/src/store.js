import reducer from './reducers/anecdoteReducer'
import filter from './reducers/filterReducer'
import messageReducer from './reducers/messageReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    message: messageReducer,
    filter: filter
  }
})

export default store