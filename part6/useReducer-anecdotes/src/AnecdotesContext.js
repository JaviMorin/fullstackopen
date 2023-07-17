import { createContext, useReducer } from 'react'

const anecdotesReducer = (state, action) => {
  switch (action.type) {
    case "vote":
        return action.message
    case "add":
          return action.message
    case "error":
            return action.message
    default:
        return null
  }
}

const AnecdotesContext = createContext()

export const AnecdotesContextProvider = (props) => {
  const [anecdotesState, anecdotesDispatch] = useReducer(anecdotesReducer, null)

  return (
    <AnecdotesContext.Provider value={[anecdotesState, anecdotesDispatch] }>
      {props.children}
    </AnecdotesContext.Provider>
  )
}

export default AnecdotesContext