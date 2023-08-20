import React, { useState, useEffect } from 'react'
import StarRating from '../StarRating'
import http from '../../utils/http'
import { KEY } from '../../constants/keyApi'
import { Movie, MovieDetails, WatchedMovie } from '../../types/movie.type'
import Loader from '../Loader'

interface PropTypes {
  selectedMovie: Movie
  watched: WatchedMovie[]
  handleCloseMovie: () => void
  handleAddWatched: (movie: WatchedMovie) => void
}

const initialState = {
  Title: '',
  Year: '',
  Poster: '',
  Runtime: '',
  imdbRating: '',
  Plot: '',
  Released: '',
  Actors: '',
  Director: '',
  Genre: ''
}

export default function MovieDetail(props: PropTypes) {
  const { selectedMovie, watched, handleCloseMovie, handleAddWatched } = props

  const [userRating, setUserRating] = useState<number>(0)
  const [movie, setMovie] = useState<MovieDetails>(initialState)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedMovie.imdbID)
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedMovie.imdbID)
    ?.userRating

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie

  // Fetch movie details data
  useEffect(() => {
    const controller = new AbortController()

    const getMovieDetails = async () => {
      try {
        setIsLoading(true)
        const data = await http.get(`?apikey=${KEY}&i=${selectedMovie.imdbID}`, {
          signal: controller.signal
        })
        setMovie(data.data)
      } catch (error) {
        // console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getMovieDetails()

    return () => {
      controller.abort()
    }
  }, [selectedMovie.imdbID])

  // Changing page title
  useEffect(() => {
    if (title) document.title = `Movie | ${title}`

    return () => {
      document.title = 'usePopcorn'
    }
  }, [title])

  // Keydown Escape handler
  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code === 'Escape') handleCloseMovie()
    }
    document.addEventListener('keydown', callback)

    return () => document.removeEventListener('keydown', callback)
  }, [handleCloseMovie])

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedMovie.imdbID,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: Number(runtime.split(' ').at(0)) || 0,
      imdbRating: Number(imdbRating),
      userRating
    }
    handleAddWatched(newWatchedMovie)
  }

  return (
    <div className='details'>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <header>
            <button onClick={() => handleCloseMovie()} className='btn-back'>
              ←
            </button>
            <img src={poster} alt={`Poster of ${title} movie`}></img>
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} • {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {!isWatched && (
                <>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                  {Boolean(userRating) && (
                    <button onClick={handleAdd} className='btn-add'>
                      + Add to list
                    </button>
                  )}
                </>
              )}
              {isWatched && (
                <p>
                  You've already rated this movie with {watchedUserRating}
                  <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>{actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  )
}
