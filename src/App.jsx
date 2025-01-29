import { useState, useEffect } from "react"
import { List, Card, Image, Typography, Spin, Alert } from "antd"
import { format } from "date-fns"

import { truncateText } from "./utils/index.js"
import MoviesApi from "./services/api.js"
import useOnlineStatus from "./hooks/useOnlineStatus"

const { Title, Paragraph } = Typography

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL

const moviesApi = new MoviesApi(API_KEY, BASE_URL)

const App = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [genres, setGenres] = useState([])
  const isOnline = useOnlineStatus()

  const loadMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const moviesData = await moviesApi.fetchMovies()
      const genresData = await moviesApi.fetchGenres()
      setMovies(moviesData)
      setGenres(genresData.genres)
    } catch (error) {
      setError(error.message)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOnline) {
      loadMovies()
    }
  }, [isOnline])

  const fallbackSVG = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2UwZTBlMCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiPgogICAgTm8gUG9zdGVyCiAgPC90ZXh0Pgo8L3N2Zz4=`

  const renderGenres = (genreIds) => {
    const items = []

    if (genreIds?.length > 0) {
      genreIds.forEach((id) => {
        const genre = genres.find((g) => g.id === id)

        if (genre) {
          items.push(
            <span
              key={id}
              style={{
                background: "#fafafa",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                padding: "0px 8px",
                whiteSpace: "nowrap",
              }}>
              {genre.name}
            </span>,
          )
        }
      })
    }

    if (items.length === 0) {
      items.push(
        <span
          key="na"
          style={{
            background: "#fafafa",
            border: "1px solid #d9d9d9",
            borderRadius: "2px",
            padding: "0px 8px",
            whiteSpace: "nowrap",
          }}>
          N/A
        </span>,
      )
    }

    return items
  }

  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      {!isOnline && (
        <Alert
          message="No Internet Connection"
          description="Please check your network settings."
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      <Spin spinning={loading} tip="Loading movies..." size="large">
        {movies.length === 0 && !loading ? (
          <Alert
            message="No movies found"
            description="Try searching for another title"
            type="info"
            showIcon
          />
        ) : (
          <List
            grid={{
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            dataSource={movies}
            renderItem={(movie) => (
              <List.Item>
                <Card hoverable style={{ width: "100%", overflow: "hidden" }}>
                  <div style={{ display: "flex", minHeight: 280 }}>
                    <div style={{ width: 200, height: 280, flexShrink: 0 }}>
                      <Image
                        alt={movie.title}
                        src={
                          movie.poster_path
                            ? `${IMAGE_BASE_URL}/w500${movie.poster_path}`
                            : fallbackSVG
                        }
                        style={{
                          width: "180px",
                          height: "280px",
                          objectFit: "cover",
                          fontSize: "20px",
                        }}
                        preview={false}
                        onError={(e) => {
                          e.target.src = fallbackSVG
                        }}
                      />
                    </div>

                    <div
                      style={{
                        flexGrow: 1,
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "280px",
                      }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 16,
                        }}>
                        <Title level={4} style={{ margin: 0, flex: 1 }}>
                          {movie.title}
                        </Title>
                      </div>

                      <div style={{ marginBottom: 8, color: "#827E7E" }}>
                        {movie.release_date
                          ? format(new Date(movie.release_date), "MMM dd, yyyy")
                          : "N/A"}
                      </div>

                      <div
                        style={{
                          marginBottom: 8,
                          color: "#827E7E",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          alignItems: "center",
                        }}>
                        {renderGenres(movie.genre_ids)}
                      </div>

                      <Paragraph
                        style={{
                          flex: 1,
                          marginBottom: 16,
                          color: "#000",
                          lineHeight: 1.6,
                        }}>
                        {truncateText(movie.overview, 180)}
                      </Paragraph>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Spin>
    </div>
  )
}

export default App
