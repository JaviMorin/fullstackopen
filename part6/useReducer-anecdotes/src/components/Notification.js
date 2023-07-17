import { useContext } from 'react'
import AnecdotesContext  from '../AnecdotesContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [anecdotesState, ] = useContext(AnecdotesContext)
  
  if (anecdotesState===null) return null

  return (
    <div style={style}>
      {anecdotesState}
    </div>
  )
}

export default Notification
