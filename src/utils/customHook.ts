import { useEffect, useState } from 'react'
import { Movie, WatchedMovie } from '../types/movie.type'
import http from './http'
import { FetchError } from './utils'
import { KEY } from '../constants/keyApi'

// Custom Hook  for fetching movies data

export const useMovies = function (query: string) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

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

  return { movies, isLoading, error }
}

// Custom Hook persist data into local storage
type UseLocalStorageStateReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export const useLocalStorageState = function <T>(
  initialState: T,
  key: string
): UseLocalStorageStateReturnType<T> {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    if (!storedValue) return initialState
    return JSON.parse(storedValue) as T
  })

  // Set localStorage for value state
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
