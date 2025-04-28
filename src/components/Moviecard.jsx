import React from 'react'

const Moviecard = ( {movie : 
    {
        Title,
        imdbRating,
        Poster,
        Year,
        Language
    }
}) => {
  return (
    <div className='movie-card'>
      <img className='h-100'
        src={Poster ? 
        Poster : '/no-movie.png'}
        alt="Title" 
      />
      
      <div className="mt-4">
        <h3>{Title}</h3>

        <div className="content">
            <div className="rating">
                <img src="star.svg" alt="Star Icon" />
                <p>{imdbRating? imdbRating : 'N/A'}</p>
            </div>
            <span></span>
                <p className='lang'>{ Language}</p>
                <p className='year'>{Year ?Year:'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default Moviecard
