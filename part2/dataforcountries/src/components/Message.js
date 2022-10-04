import React from 'react'

const Message = ({countriesToShow}) => {
    return (
        <>
          {countriesToShow.length>10 ? <p>Too many matches, specify another filter</p> : ''}
        </>
      )
}

export default Message