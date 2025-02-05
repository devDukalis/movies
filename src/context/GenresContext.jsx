import { createContext, useState, useEffect, useCallback } from "react"

import MoviesApi from "../services/api"
import { API_KEY, BASE_URL } from "../constants"

const GenresContext = createContext([])

const moviesApi = new MoviesApi(API_KEY, BASE_URL)

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([])
  const [error, setError] = useState(null)

  const loadGenres = useCallback(async () => {
    try {
      const genresData = await moviesApi.fetchGenres()
      setGenres(genresData.genres)
    } catch (error) {
      setError(error.message)
      setGenres([])
    }
  }, [])

  useEffect(() => {
    loadGenres()
  }, [loadGenres])

  return <GenresContext.Provider value={{ genres, error }}>{children}</GenresContext.Provider>
}

export { GenresContext }
