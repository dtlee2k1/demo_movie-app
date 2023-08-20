import React from 'react'
import { WatchedMovie } from '../../types/movie.type'
import WatchedItem from '../WatchedItem'

interface PropsType {
  watched: WatchedMovie[]
  handleDeleteWatched: (id: string) => void
}

export default function WatchedList(props: PropsType) {
  const { watched, handleDeleteWatched } = props

  return (
    <ul className='list '>
      {watched.map((movie) => (
        <WatchedItem key={movie.imdbID} movie={movie} handleDeleteWatched={handleDeleteWatched} />
      ))}
    </ul>
  )
}
