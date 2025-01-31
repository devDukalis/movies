import { useState, useEffect, useCallback, useRef, useDeferredValue } from "react"
import { Spin } from "antd"
import debounce from "lodash.debounce"

import useOnlineStatus from "./hooks/useOnlineStatus"
import MoviesApi from "./services/api.js"
import SearchBar from "./components/SearchBar/SearchBar.jsx"
import MovieList from "./components/MovieList/MovieList.jsx"
import StatusAlerts from "./components/StatusAlerts/StatusAlerts.jsx"
import PaginationControl from "./components/PaginationControl/PaginationControl.jsx"
import { API_KEY, BASE_URL, IMAGE_BASE_URL, fallbackSVG } from "./constants"

const moviesApi = new MoviesApi(API_KEY, BASE_URL)

const App = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [genres, setGenres] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [popularMovies, setPopularMovies] = useState([])
  const [loadingPopular, setLoadingPopular] = useState(false)
  const isOnline = useOnlineStatus()
  const deferredSearchQuery = useDeferredValue(searchQuery)

  const loadPopularMovies = useCallback(async () => {
    try {
      if (!isOnline) {
        setPopularMovies([])
        return
      }

      setLoadingPopular(true)
      setError(null)

      const pages = Array.from({ length: 5 }, (_, i) => i + 1)
      const responses = await Promise.all(
        pages.map((page) => moviesApi.fetchPopularMovies(page).catch(() => ({ results: [] }))),
      )

      const allMovies = responses.flatMap((response) => response.results)
      setPopularMovies(allMovies)
    } catch (error) {
      setError(error.message)
      setPopularMovies([])
    } finally {
      setLoadingPopular(false)
    }
  }, [isOnline])

  const loadMovies = useCallback(
    async (query, page) => {
      try {
        if (!isOnline) {
          setMovies([])
          setTotalResults(0)
          return
        }

        setLoading(true)
        setError(null)

        const moviesResponse = await moviesApi.fetchMovies(query, page)
        setMovies(moviesResponse.results)
        setTotalResults(moviesResponse.total_results)
      } catch (error) {
        setError(error.message)
        setMovies([])
        setTotalResults(0)
      } finally {
        setLoading(false)
      }
    },
    [isOnline],
  )

  const loadGenres = useCallback(async () => {
    try {
      if (!isOnline) {
        setGenres([])
        return
      }

      const genresData = await moviesApi.fetchGenres()
      setGenres(genresData.genres)
    } catch (error) {
      setError(error.message)
      setGenres([])
    }
  }, [isOnline])

  const debouncedLoadMovies = useRef(
    debounce((query) => {
      loadMovies(query, 1)
    }, 500),
  ).current

  useEffect(() => {
    debouncedLoadMovies(deferredSearchQuery)
  }, [debouncedLoadMovies, deferredSearchQuery])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    if (searchQuery) {
      loadMovies(deferredSearchQuery, page)
    }
  }

  useEffect(() => {
    loadPopularMovies()
    loadGenres()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "20px 32px 20px",
        backgroundColor: "#FFFFFF",
        marginBottom: 20,
      }}>
      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
          if (e.target.value === "") setCurrentPage(1)
        }}
      />

      <StatusAlerts
        isOnline={isOnline}
        error={error}
        searchQuery={searchQuery}
        movies={movies}
        popularMovies={popularMovies}
        loading={loading}
        loadingPopular={loadingPopular}
      />

      <Spin spinning={loading || loadingPopular} tip="Loading movies..." size="small">
        <MovieList
          movies={searchQuery ? movies : popularMovies}
          genres={genres}
          currentPage={currentPage}
          searchQuery={searchQuery}
          fallbackSVG={fallbackSVG}
          imageBaseUrl={IMAGE_BASE_URL}
        />

        <PaginationControl
          currentPage={currentPage}
          totalItems={searchQuery ? totalResults : popularMovies.length}
          onChange={handlePageChange}
        />
      </Spin>
    </div>
  )
}

export default App
