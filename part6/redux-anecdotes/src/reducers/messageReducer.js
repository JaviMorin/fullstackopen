import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: 'Test message',
  reducers: {
    configureMessage(state, action) {
      return action.payload
    },
    deleteMessage() {
      return ''
    },
  },
})

export const { configureMessage, deleteMessage } = messageSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(configureMessage(message))
    setTimeout(() => {
        dispatch(deleteMessage())
      }, seconds * 1000)
    }
}

export default messageSlice.reducer