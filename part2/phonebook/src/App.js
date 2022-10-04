import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ personsToShow, setPersonsToShow ] = useState([])
  const [ message, setMessage] = useState(null) 
  const [ errorMessage, setErrorMessage] = useState(null) 

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    const elementoActualizar = persons.find(p => p.name === newName)
    const copia = [...persons]

    if(elementoActualizar === undefined)
    {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setPersonsToShow(personsToShow.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      setMessage(
        `Added '${personObject.name}'`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    else
    {
      elementoActualizar.number = newNumber
      if (window.confirm(`${elementoActualizar.name} is already added to phonebook, replace the old number with a new one?`))
        personService
        .update(elementoActualizar.id, elementoActualizar)
        .then(returnedPerson => {
          setPersons(copia.filter(p => p.name !== newName).concat(returnedPerson))
          setPersonsToShow(copia.filter(p => p.name !== newName).concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Updated '${elementoActualizar.name}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${elementoActualizar.name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(copia.filter(n => n.id !== elementoActualizar.id))
          setPersonsToShow(copia.filter(n => n.id !== elementoActualizar.id))
          setNewName('')
          setNewNumber('')
        })
        
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setPersonsToShow(persons.filter(p => (p.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))))
  }

  const handleClickButton = (event) => {
    const idBorrado = event.target.value
    const copia = [...persons]
    const elementoBorrar = persons.find(p => parseInt(p.id) === parseInt(idBorrado))
    if (window.confirm(`Delete ${elementoBorrar.name}?`))
      personService
        .erase(idBorrado)
        .then(() => {
          setPersons(copia.filter(p => parseInt(p.id) !== parseInt(idBorrado)))
          setPersonsToShow(copia.filter(p => parseInt(p.id) !== parseInt(idBorrado)))
        })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Error errorMessage={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} setNewFilter={setNewFilter} setPersons={setPersons} />
      <h1>add a new</h1>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h1>Numbers</h1>
      <Persons personsToShow={personsToShow} handleClickButton={handleClickButton}/>
    </div>
  )
}

export default App
