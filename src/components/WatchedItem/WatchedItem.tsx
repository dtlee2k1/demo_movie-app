import React from 'react'
import { WatchedMovie } from '../../types/movie.type'

interface PropsType {
  movie: WatchedMovie
  handleDeleteWatched: (id: string) => void
}

export default function WatchedItem(props: PropsType) {
  const { movie, handleDeleteWatched } = props

  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button onClick={() => handleDeleteWatched(movie.imdbID)} className='btn-delete'>
        X
      </button>
    </li>
  )
}
