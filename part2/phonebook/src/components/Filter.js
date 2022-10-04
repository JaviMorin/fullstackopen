import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => {

    return (
        <>
          filter shown with<input
                            value={newFilter}
                            onChange={handleFilterChange}
                            />
        </>
      )
}

export default Filter