import { useMutation, useQueryClient  } from 'react-query'
import { createAnecdote } from '../requests'
import  AnecdotesContext from '../AnecdotesContext'
import { useContext } from 'react'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote,{
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () =>{
      anecdotesDispatch({ type: 'error', message: `too short anecdote, must have length 5 or more` })
    }
  })

  const [, anecdotesDispatch] = useContext(AnecdotesContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    anecdotesDispatch({ type: 'add', message: `anecdote '${content}' added` })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
