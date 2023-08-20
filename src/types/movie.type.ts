export interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export interface WatchedMovie extends Movie {
  runtime: number
  imdbRating: number
  userRating: number
}

export interface MovieDetails {
  Title: string
  Year: string
  Poster: string
  Runtime: string
  imdbRating: string
  Plot: string
  Released: string
  Actors: string
  Director: string
  Genre: string
}
