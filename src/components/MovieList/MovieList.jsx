import { List } from "antd"

import MovieCard from "../../components/MovieCard/MovieCard"

const MovieList = ({ movies, genres, currentPage, searchQuery, fallbackSVG }) => (
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
    dataSource={searchQuery ? movies : movies.slice((currentPage - 1) * 20, currentPage * 20)}
    renderItem={(movie) => (
      <List.Item style={{ margin: 0 }}>
        <MovieCard movie={movie} genres={genres} fallbackSVG={fallbackSVG} />
      </List.Item>
    )}
  />
)

export default MovieList
