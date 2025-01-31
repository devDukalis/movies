import { Card, Typography } from "antd"
import { format } from "date-fns"

import RatingBadge from "../../components/RatingBadge/RatingBadge"
import MoviePoster from "../../components/MoviePoster/MoviePoster"
import GenreTags from "../../components/GenreTags/GenreTags"
import { truncateText } from "../../utils/index"

const { Title, Paragraph } = Typography

const MovieCard = ({ movie, genres, fallbackSVG }) => (
  <Card
    style={{
      width: "100%",
      overflow: "hidden",
      borderRadius: 0,
      boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
    }}
    styles={{
      body: { padding: 0 },
    }}>
    <div style={{ display: "flex", minHeight: 280, position: "relative" }}>
      <RatingBadge rating={movie.vote_average} />

      <MoviePoster posterPath={movie.poster_path} title={movie.title} fallbackSVG={fallbackSVG} />

      <div
        style={{
          flexGrow: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxHeight: "280px",
          padding: "0 20px",
        }}>
        <Title level={4} style={{ margin: 0, paddingTop: 10, paddingBottom: 10 }}>
          {movie.title}
        </Title>

        <div style={{ marginBottom: 8, color: "#827E7E" }}>
          {movie.release_date ? format(new Date(movie.release_date), "MMM dd, yyyy") : "N/A"}
        </div>

        <GenreTags genreIds={movie.genre_ids} genres={genres} />

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
)

export default MovieCard
