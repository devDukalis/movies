import { useContext } from "react"
import { Card, Typography, Rate } from "antd"
import { format } from "date-fns"

import { GenresContext } from "../..//context/GenresContext"
import RatingBadge from "../../components/RatingBadge/RatingBadge"
import MoviePoster from "../../components/MoviePoster/MoviePoster"
import GenreTags from "../../components/GenreTags/GenreTags"
import { truncateText, getStarColor } from "../../utils/index"

const { Title, Paragraph } = Typography

const MovieCard = ({ movie, fallbackSVG, onRate }) => {
  const genres = useContext(GenresContext)
  const rating = movie.rating || 0

  const handleRateChange = (value) => {
    onRate(movie.id, value)
  }

  return (
    <Card
      style={{
        width: "100%",
        height: 280,
        overflow: "hidden",
        borderRadius: 0,
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      styles={{
        body: { padding: 0 },
      }}>
      <div style={{ display: "flex", height: 280, position: "relative", overflow: "hidden" }}>
        <RatingBadge rating={movie.vote_average} />

        <MoviePoster posterPath={movie.poster_path} title={movie.title} fallbackSVG={fallbackSVG} />

        <div
          style={{
            flexGrow: 1,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            paddingLeft: 20,
            paddingRight: 20,
            marginBottom: 20,
            overflow: "hidden",
          }}>
          <Title
            level={4}
            style={{
              margin: 0,
              paddingTop: 10,
              paddingRight: 30,
              textWrap: "balance",
            }}>
            {movie.title}
          </Title>

          <div style={{ marginBottom: 8, color: "#827E7E" }}>
            {movie.release_date ? format(new Date(movie.release_date), "MMM dd, yyyy") : "N/A"}
          </div>

          <GenreTags genreIds={movie.genre_ids} genres={genres} />

          <Paragraph
            style={{
              flex: 1,
              color: "#000",
              lineHeight: 1.6,
            }}>
            {truncateText(movie.overview, 80)}
          </Paragraph>

          <Rate
            value={rating}
            onChange={handleRateChange}
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
