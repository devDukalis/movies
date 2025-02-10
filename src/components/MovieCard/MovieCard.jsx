import { useContext } from "react"
import { Card, Typography, Rate, Popover } from "antd"
import { format } from "date-fns"

import { GenresContext } from "../..//context/GenresContext"
import RatingBadge from "../../components/RatingBadge/RatingBadge"
import MoviePoster from "../../components/MoviePoster/MoviePoster"
import GenreTags from "../../components/GenreTags/GenreTags"
import { truncateText, getStarColor } from "../../utils/index"

import "./styles.css"

const { Paragraph } = Typography

const MovieCard = ({ movie, fallbackSVG, onRate }) => {
  const genres = useContext(GenresContext)

  const rating = movie.rating || 0

  const handleRateChange = (value) => {
    onRate(movie.id, value)
  }

  const overviewContent = <div style={{ maxWidth: 240 }}>{movie.overview}</div>
  const titleContent = <div style={{ maxWidth: 240 }}>{movie.title}</div>

  return (
    <Card
      className="movie-card"
      styles={{
        body: { padding: 0 },
      }}>
      <div className="movie-card-body-wrapper">
        <RatingBadge rating={movie.vote_average} />

        <MoviePoster posterPath={movie.poster_path} title={movie.title} fallbackSVG={fallbackSVG} />

        <div className="movie-description-wrapper">
          <Popover content={titleContent} title="Movie title" trigger="click">
            <div className="movie-title">{truncateText(movie.title, 50)}</div>
          </Popover>

          <div style={{ marginBottom: 8, color: "#827E7E", fontSize: 12 }}>
            {movie.release_date ? format(new Date(movie.release_date), "MMM dd, yyyy") : "N/A"}
          </div>

          <GenreTags genreIds={movie.genre_ids} genres={genres} />
        </div>

        <div className="movie-overview-wrapper">
          <Popover content={overviewContent} title="Movie overview" trigger="click">
            <Paragraph className="movie-overview">{truncateText(movie.overview, 80)}</Paragraph>
          </Popover>
        </div>

        <div className="movie-rate-wrapper">
          <Rate
            value={rating}
            onChange={handleRateChange}
            className="movie-user-rate"
            style={{ color: getStarColor(rating) }}
            count={10}
            allowHalf
          />
        </div>
      </div>
    </Card>
  )
}

export default MovieCard
