import { Movie } from '../../types/movie.type'
import MovieItem from '../MovieItem'

interface PropsType {
  movies: Movie[]
  selectedMovie: Movie | null
  handleSelectMovie: (id: string) => void
}

export default function MovieList(props: PropsType) {
  const { movies, selectedMovie, handleSelectMovie } = props

  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          selectedMovie={selectedMovie}
          handleSelectMovie={handleSelectMovie}
        />
      ))}
    </ul>
  )
}
