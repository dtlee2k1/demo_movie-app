import axios, { AxiosInstance } from 'axios'

class Http {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: `https://www.omdbapi.com/`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  public getInstance(): AxiosInstance {
    return this.instance
  }
}

const http = new Http().getInstance()

export default http
