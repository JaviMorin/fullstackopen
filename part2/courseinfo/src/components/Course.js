import React from 'react'

const Header = (props) => {
    return (
      <>
        <h1>{props.course.name}</h1>
      </>
    )
}

const Content = (props) => {
  const parts = props.parts
  return (
    <>
      {parts.map(parts => <Part key={parts.id} part={parts.name} exercises={parts.exercises}/>)}
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  const exercises = props.parts.map(parts => parts.exercises)
  const sum = exercises.reduce((previousValue, currentValue) => previousValue + currentValue);
  return (
    <>
      <b>total of {sum} exercises</b>
    </>
  )
}

const Course = (props) => {
    return (
        <div>
          <Header course={props.course} />
          <Content parts={props.course.parts} />
          <Total parts={props.course.parts} />
        </div>
      )
}

export default Course