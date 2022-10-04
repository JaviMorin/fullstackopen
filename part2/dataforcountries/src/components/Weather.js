import React from 'react'

const Weather = ({country, weather}) => {
    if(Object.keys(weather).length !== 0)
        return (
            <>
            <h2>Weather in {country.capital}</h2>
            <p><b>temperature:</b>{weather.current.temperature}</p>
            <p><img src={weather.current.weather_icons[0]} alt='flag'></img></p>
            <p><b>wind:</b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </>
        )      
}

export default Weather