import { List } from "antd"

import MovieCard from "../../components/MovieCard/MovieCard"

const MovieList = ({ movies, fallbackSVG, onRate }) => {
  return (
    <List
      grid={{
        gutter: [37, 37],
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      dataSource={movies}
      renderItem={(movie) => (
        <List.Item style={{ margin: 0 }}>
          <MovieCard movie={movie} fallbackSVG={fallbackSVG} onRate={onRate} />
        </List.Item>
      )}
    />
  )
}

export default MovieList
