import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const Anecdote = (props) => {
  const {anecdotes, selected} = props

  return(
    <>
    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[selected]}</p>
    </>
  )
}

const Button = (props) => {
  const {method} = props
  const calculateRandomNumber = () => method(Math.round(Math.random() * (5)))

  return(
    <>
    <button onClick={calculateRandomNumber}>next anecdote</button>
    </>
  )
}

const Vote = (props) => {
  const {points, setPoint, selected} = props
  const copy = [...points]
  copy[selected] += 1
  const calculateVote = () => setPoint(copy)

  return(
    <>
    <p>has {points[selected]} votes</p>
    <button onClick={calculateVote}>vote</button>
    </>
  )
}

const MaxVote = (props) => {
  const {anecdotes, points} = props
  const max = Math.max(...points)
  const indexMax = points.indexOf(max)

  return(
    <>
    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[indexMax]}</p>
    <p>has {points[indexMax]} votes</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(Array(6).fill(0))

  return (
    <div>
      <Anecdote anecdotes={props.anecdotes}  selected={selected}/>
      <Vote points={points} setPoint={setPoint} selected={selected}/>
      <Button method = {setSelected}/>
      <MaxVote anecdotes={props.anecdotes} points={points}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App anecdotes={anecdotes} />);