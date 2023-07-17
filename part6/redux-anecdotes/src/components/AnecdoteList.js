import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/messageReducer";

const AnecdoteList = () =>{
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        const anecdoteVoted = anecdotes.find( anec => anec.id===id)
        dispatch(setNotification(`you voted '${anecdoteVoted.content}'`, 5))
    }

    const anecdotes = useSelector(({ filter, anecdotes }) => {
      return anecdotes.filter(anecdotes => anecdotes.content.includes(filter))
    })

    return (
       <>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )}
       </> 
    )
}

export default AnecdoteList