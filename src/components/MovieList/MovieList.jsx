import { List } from "antd"

import MovieCard from "../../components/MovieCard/MovieCard"
import useMediaQuery from "../../hooks/useMediaQuery.js"

const MovieList = ({ movies, fallbackSVG, onRate }) => {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1119px)")
  const isDesktop = useMediaQuery("(min-width: 1120px)")

  const gutter = isMobile ? [16, 16] : isTablet ? [24, 24] : isDesktop ? [32, 32] : [8, 8]

  return (
    <List
      grid={{
        gutter: gutter,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 3,
      }}
      dataSource={movies}
      renderItem={(movie) => (
        <List.Item style={{ margin: 0 }} className="movie-list-item">
          <MovieCard movie={movie} fallbackSVG={fallbackSVG} onRate={onRate} />
        </List.Item>
      )}
    />
  )
}

export default MovieList
