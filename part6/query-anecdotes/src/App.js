import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery(
    'anecdotes', getAnecdotes, 
    {
      retry: false
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  else if ( result.error ) {
    return <div>anecdote service not available due to problems in server</div>
  }
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {result.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
