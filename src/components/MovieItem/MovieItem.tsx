import React from 'react'
import { Movie } from '../../types/movie.type'

interface PropsType {
  movie: Movie
  selectedMovie: Movie | null
  handleSelectMovie: (id: string) => void
}

export default function MovieItem(props: PropsType) {
  const { movie, selectedMovie, handleSelectMovie } = props

  return (
    <li
      className={selectedMovie?.imdbID === movie.imdbID ? 'active' : ''}
      onClick={() => handleSelectMovie(movie.imdbID)}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}
