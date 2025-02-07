import { useState, useEffect, useCallback, useRef } from "react"
import { Spin, Tabs, Layout } from "antd"
import debounce from "lodash.debounce"

import useOnlineStatus from "../../hooks/useOnlineStatus"
import MoviesApi from "../../services/api.js"
import SearchBar from "../../components/SearchBar/SearchBar.jsx"
import MovieList from "../../components/MovieList/MovieList.jsx"
import StatusAlerts from "../../components/StatusAlerts/StatusAlerts.jsx"
import PaginationControl from "../../components/PaginationControl/PaginationControl.jsx"
import { API_KEY, BASE_URL, IMAGE_BASE_URL, fallbackSVG } from "../../constants"
import { GenresProvider } from "../../context/GenresContext"

const { Content } = Layout

const moviesApi = new MoviesApi(API_KEY, BASE_URL)

const App = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("return")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const isOnline = useOnlineStatus()
  const [ratedMovies, setRatedMovies] = useState([])
  const [activeTab, setActiveTab] = useState("search")
  const [itemsPerPage] = useState(20)

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

        const moviesWithRatings = moviesResponse.results.map((movie) => ({
          ...movie,
          rating: getRatingFromStorage(movie.id),
        }))

        setMovies(moviesWithRatings)
        setTotalResults(query === "return" ? 100 : moviesResponse.total_results)
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

  const getRatingFromStorage = (movieId) => {
    const ratedMoviesFromStorage = JSON.parse(localStorage.getItem("ratedMovies")) || {}
    return ratedMoviesFromStorage[movieId]?.rating || null
  }

  const debouncedLoadMovies = useRef(
    debounce((query, page) => {
      loadMovies(query, page)
    }, 500),
  ).current

  const handlePageChange = (page) => {
    setCurrentPage(page)
    debouncedLoadMovies(searchQuery, page)
  }

  const handleRatedPageChange = (page) => {
    setCurrentPage(page)
  }

  const loadRatedMovies = useCallback(() => {
    const ratedMoviesFromStorage = JSON.parse(localStorage.getItem("ratedMovies")) || {}
    const ratedMoviesArray = Object.values(ratedMoviesFromStorage)
    setRatedMovies(ratedMoviesArray)
  }, [])

  const getCurrentRatedMovies = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return ratedMovies.slice(startIndex, startIndex + itemsPerPage)
  }

  const handleRateMovie = (movieId, rating) => {
    const movieToRate = movies.find((movie) => movie.id === movieId)

    if (movieToRate) {
      const ratedMoviesFromStorage = JSON.parse(localStorage.getItem("ratedMovies")) || {}

      if (rating === 0) {
        // Удаляем фильм из localStorage, если рейтинг 0
        delete ratedMoviesFromStorage[movieId]
        localStorage.setItem("ratedMovies", JSON.stringify(ratedMoviesFromStorage))

        // Обновляем состояние ratedMovies
        const updatedRatedMovies = ratedMovies.filter((movie) => movie.id !== movieId)
        setRatedMovies(updatedRatedMovies)
      } else {
        // Обновляем рейтинг фильма в localStorage
        ratedMoviesFromStorage[movieId] = {
          ...movieToRate,
          rating: rating,
        }
        localStorage.setItem("ratedMovies", JSON.stringify(ratedMoviesFromStorage))

        // Обновляем состояние ratedMovies
        const updatedRatedMovies = ratedMovies.map((movie) =>
          movie.id === movieId ? { ...movie, rating } : movie,
        )
        setRatedMovies(updatedRatedMovies)
      }

      // Обновляем состояние movies
      const updatedMovies = movies.map((movie) =>
        movie.id === movieId ? { ...movie, rating } : movie,
      )
      setMovies(updatedMovies)
    }
  }

  const handleTabChange = (key) => {
    setCurrentPage(1)
    setActiveTab(key)
    if (key === "search") {
      debouncedLoadMovies(searchQuery, 1)
    }
    if (key === "rated") {
      loadRatedMovies()
    }
  }

  const handleSearchChange = (e) => {
    const newQuery = e.target.value
    setSearchQuery(newQuery)
    setCurrentPage(1)
    debouncedLoadMovies(newQuery, 1)
  }

  useEffect(() => {
    if (activeTab === "search") {
      debouncedLoadMovies(searchQuery, currentPage)
    }
  }, [searchQuery, currentPage, activeTab, debouncedLoadMovies])

  return (
    <GenresProvider>
      <Layout className="layout">
        <Content className="content">
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "20px 32px 20px",
              backgroundColor: "#FFFFFF",
              marginBottom: 20,
            }}>
            <StatusAlerts
              isOnline={isOnline}
              error={error}
              searchQuery={searchQuery}
              movies={movies}
              loading={loading}
              activeTab={activeTab}
            />

            <Tabs
              className="tabs"
              size="large"
              centered
              activeKey={activeTab}
              onChange={handleTabChange}
              // destroyInactiveTabPane={true}
              items={[
                {
                  key: "search",
                  label: "Search",
                  children: (
                    <Spin spinning={loading} tip="Loading movies..." size="small">
                      <SearchBar value={searchQuery} onChange={handleSearchChange} />
                      <MovieList
                        movies={movies}
                        currentPage={currentPage}
                        searchQuery={searchQuery}
                        fallbackSVG={fallbackSVG}
                        imageBaseUrl={IMAGE_BASE_URL}
                        onRate={handleRateMovie}
                      />
                      <PaginationControl
                        currentPage={currentPage}
                        totalItems={totalResults}
                        onChange={handlePageChange}
                      />
                    </Spin>
                  ),
                },
                {
                  key: "rated",
                  label: "Rated",
                  children: (
                    <Spin spinning={loading} tip="Loading rated movies..." size="small">
                      <MovieList
                        movies={getCurrentRatedMovies()}
                        currentPage={currentPage}
                        fallbackSVG={fallbackSVG}
                        imageBaseUrl={IMAGE_BASE_URL}
                        onRate={handleRateMovie}
                      />
                      <PaginationControl
                        currentPage={currentPage}
                        totalItems={ratedMovies.length}
                        onChange={handleRatedPageChange}
                      />
                    </Spin>
                  ),
                },
              ]}
            />
          </div>
        </Content>
      </Layout>
    </GenresProvider>
  )
}

export default App
