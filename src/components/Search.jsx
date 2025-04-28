import React from 'react'

const Search = ({search,setSearch}) => {
  return (
    <div className='search'>
      <div>
        <img src="search.svg" alt="search" />
        <input 
            type="text"
            placeholder='What are you looking for ?'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
         />
      </div>
    </div>
  )
}

export default Search
