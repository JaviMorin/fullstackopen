import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => {

    return (
        <>
          find countries<input
                            value={newFilter}
                            onChange={handleFilterChange}
                            />
        </>
      )
}

export default Filter