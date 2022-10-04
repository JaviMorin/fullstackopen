import React from 'react'

const Persons = ({personsToShow,handleClickButton}) => {
    return (
        <>
          {personsToShow?.map(personToShow => <p key={personToShow.name}>{personToShow.name} {personToShow.number} <button name="button" value={personToShow.id} onClick={handleClickButton}>Delete</button></p>)}
        </>
      )
}

export default Persons