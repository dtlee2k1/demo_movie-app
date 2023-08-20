import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import SearchInput from './components/SearchInput'
import NumResults from './components/NumResults'
import MovieList from './components/MovieList'
import WatchedSummary from './components/WatchedSummary'
import WatchedList from './components/WatchedList'
import MovieBox from './components/MovieBox'
import http from './utils/http'
import Loader from './components/Loader'
import { FetchError } from './utils/utils'
import ErrorMessage from './components/ErrorMessage'
import { Movie, WatchedMovie } from './types/movie.type'
import MovieDetail from './components/MovieDetails'
import { KEY } from './constants/keyApi'
import { useLocalStorageState, useMovies } from './utils/customHook'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [watched, setWatched] = useLocalStorageState<WatchedMovie[]>([], 'watched')

  const [query, setQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  // Custom Hook  for fetching movies data
  // const { movies, isLoading, error } = useMovies(query)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500) // 500ms - thời gian chờ trước khi fetch dữ liệu
    return () => {
      clearTimeout(timerId)
    }
  }, [query])

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError('')

        const data = await http.get(`?apikey=${KEY}&s=${debouncedQuery}`, {
          signal: controller.signal
        })

        http.interceptors.response.use(
          (response) => {
            return response
          },
          (error) => {
            if (error.code !== 'ERR_CANCELED')
              throw new FetchError('Something went wrong with fetching movies')
          }
        )

        if (data.data.Response === 'False') throw new Error('Movie not found')

        setMovies(data.data.Search)
      } catch (error) {
        if (error instanceof FetchError) {
          setError(error.message)
        } else {
          setError((error as Error).message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (debouncedQuery.length < 3) {
      setMovies([])
      setError('')
      return
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [debouncedQuery])

  const handleSelectMovie = (id: string) => {
    const foundMovie = movies.find((movie) => movie.imdbID === id)
    if (foundMovie) setSelectedMovie(foundMovie)
  }

  const handleCloseMovie = () => {
    setSelectedMovie(null)
  }

  const handleAddWatched = (movie: WatchedMovie) => {
    setWatched((watched) => [...watched, movie])
    setSelectedMovie(null)
  }

  const handleDeleteWatched = (id: string) => {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id))
  }

  return (
    <>
      <Navbar>
        <SearchInput query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <MovieBox>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              selectedMovie={selectedMovie}
              handleSelectMovie={handleSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </MovieBox>
        <MovieBox>
          {selectedMovie && (
            <MovieDetail
              key={selectedMovie.imdbID}
              selectedMovie={selectedMovie}
              watched={watched}
              handleCloseMovie={handleCloseMovie}
              handleAddWatched={handleAddWatched}
            />
          )}
          {!selectedMovie && (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} handleDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </MovieBox>
      </Main>
    </>
  )
}

export default App
