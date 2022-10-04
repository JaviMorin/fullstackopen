import React from 'react'

const Countries = ({countriesToShow, handleOnClick}) => {
    return (
        <>
          {countriesToShow.length<=10 & countriesToShow.length>1 ? countriesToShow?.map(country => <p key={country.name.common}>{country.name.common}<button key={country.name.common} onClick={handleOnClick} value={country.name.common}>show</button></p>) : ''}
        </>
      )
}

export default Countries