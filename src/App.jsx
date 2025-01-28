import { useState, useEffect } from "react"
import { List, Card, Image, Typography, Spin, Alert } from "antd"
import { format } from "date-fns"

import { truncateText } from "./utils/index.js"

const { Title, Paragraph } = Typography

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

const App = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovies = async (query, page) => {
    try {
      setLoading(true)
      setError(null)

      const url = new URL(`${BASE_URL}/search/movie`)
      url.search = new URLSearchParams({
        api_key: API_KEY,
        query: query || "return",
        page: page || 1,
        language: "en-US",
      })

      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()
      setMovies(data.results)
    } catch (error) {
      setError(error.message)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const fallbackSVG = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2UwZTBlMCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiPgogICAgTm8gUG9zdGVyCiAgPC90ZXh0Pgo8L3N2Zz4=`

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
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
          <>
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
                  <Card
                    hoverable
                    style={{ width: "100%", overflow: "hidden" }}
                    styles={{
                      body: {
                        padding: 0,
                      },
                    }}>
                    <div style={{ display: "flex", minHeight: 280 }}>
                      {/* Постер */}
                      <div style={{ width: 200, height: 280, flexShrink: 0 }}>
                        <Image
                          alt={movie.title}
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : fallbackSVG
                          }
                          style={{
                            width: "180px",
                            height: "280px",
                            objectFit: "cover",
                          }}
                          preview={false}
                          onError={(e) => {
                            e.target.src = fallbackSVG
                          }}
                        />
                      </div>

                      {/* Контент */}
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

                        {/* Дата релиза */}
                        <div style={{ marginBottom: 8, color: "#827E7E" }}>
                          {movie.release_date
                            ? format(new Date(movie.release_date), "MMM dd, yyyy")
                            : "N/A"}
                        </div>

                        {/* Описание */}
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
          </>
        )}
      </Spin>
    </div>
  )
}

export default App
