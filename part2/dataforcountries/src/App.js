import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Message from './components/Message'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {

  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ countriesToShow, setCountriesToShow ] = useState([])
  const [ weather, setWeather ] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    if(countriesToShow.length===1)
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countriesToShow[0].capital}`)
        .then(response => {
          setWeather(response.data)
        })
  }, [newFilter])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setCountriesToShow(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setCountriesToShow(countries.filter(p => (p.name.common.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))))
  }

  const handleOnClick = (event) => {
    setNewFilter(event.target.value)
    setCountriesToShow(countries.filter(p => (p.name.common.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))))
  }

  return (<>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
            <Message countriesToShow={countriesToShow}/>
            <Countries countriesToShow={countriesToShow} handleOnClick={handleOnClick}/>
            <Country countriesToShow={countriesToShow} weather={weather}/>
          </>
        );
}

export default App;
