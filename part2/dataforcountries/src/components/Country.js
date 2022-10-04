import React from 'react'
import Weather from './Weather'

const Country = ({countriesToShow,weather}) => {
    return (
        <>
          {countriesToShow.length===1  ? countriesToShow?.map(country =>  <div key={country.name.common}>
                                                                          <h2>{country.name.common}</h2>
                                                                          <p>{country.capital}</p>
                                                                          <p>{country.population}</p>
                                                                          <h3>languages</h3>
                                                                          <ul>
                                                                          {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
                                                                          </ul>
                                                                          {Object.keys(country.flags).filter(key => key === 'png').map(key => <img key={key} src={country.flags[key]} alt='flag'></img>)}
                                                                          <Weather country={country} weather={weather}/>
                                                                          </div>):''}
        </>
      )
}

export default Country