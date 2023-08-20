import React from 'react'
import { Movie } from '../../types/movie.type'

interface PropsType {
  movies: Movie[]
}

export default function NumResults(props: PropsType) {
  const { movies } = props
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  )
}
