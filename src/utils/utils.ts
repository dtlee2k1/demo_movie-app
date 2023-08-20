import axios, { AxiosError } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export class FetchError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'FetchError'
  }
}
