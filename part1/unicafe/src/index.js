import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const Button = (props) => {
  const {text, value, method} = props
  const increaseByOne = () => method(value + 1)

  return(
    <button onClick={increaseByOne}>{text}</button>
  )
}

const Statistic = (props) => {
  const {text, value} = props
  let retorno;

  if (text === "positive")
    retorno = <tr><th>{text}</th><th>{value}%</th></tr>
  else
    retorno = <tr><th>{text}</th><th>{value}</th></tr>

  return(
    retorno
  )
}

const Statistics = (props) => {

  const {good, bad, neutral} = props
  let retorno;

  if(good>0 || bad>0 || neutral>0)
    retorno =<>
              <h1>statics</h1>
              <table>
              <tbody>
              <Statistic text="good" value ={good} />
              <Statistic text="neutral" value ={neutral} />
              <Statistic text="bad" value ={bad} />
              <Statistic text="all" value ={good+neutral+bad} />
              <Statistic text="average" value ={((good*1)+(neutral*0)+(bad*(-1)))/((good+neutral+bad)>0?(good+neutral+bad):1)} />
              <Statistic text="positive" value ={(good/((good+neutral+bad)>0?(good+neutral+bad):1))*100} />
              </tbody>
              </table>
            </>
  else
    retorno =<>
              <h1>statics</h1>
              <p>No feedback given</p>
            </>

  return (retorno)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" value ={good} method = {setGood}/>
      <Button text="neutral" value ={neutral} method = {setNeutral}/>
      <Button text="bad" value ={bad} method = {setBad}/>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
