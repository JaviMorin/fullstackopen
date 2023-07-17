import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
name: 'anecdotes',
initialState: [],
reducers: {
  giveVote(state, action){
    const anecdoteVoted = action.payload
    return state.map(anecdote =>
      anecdote.id !== anecdoteVoted.id ? anecdote : action.payload
    ).sort((a, b) => b.votes - a.votes)
  },
  appendAnecdote(state, action) {
    state.push(action.payload)
  },
  setAnecdotes(state, action) {
      return action.payload
    }
},
})

export const { appendAnecdote, giveVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const voteAnecdote = await anecdoteService.vote(id)
    dispatch(giveVote(voteAnecdote))
  }
}

export default anecdoteSlice.reducer