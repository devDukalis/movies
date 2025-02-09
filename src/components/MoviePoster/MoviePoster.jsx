import { Image, Spin } from "antd"
import { useState } from "react"

import { IMAGE_BASE_URL } from "../../constants"

import "./styles.css"

const MoviePoster = ({ posterPath, title, fallbackSVG }) => {
  const [imageLoading, setImageLoading] = useState(false)

  return (
    <div className="movie-poster-wrapper">
      <Image
        className="movie-poster"
        alt={title}
        src={posterPath ? `${IMAGE_BASE_URL}/w500${posterPath}` : fallbackSVG}
        preview={false}
        onLoad={() => setImageLoading(false)}
        onError={(e) => {
          e.target.src = fallbackSVG
          setImageLoading(false)
        }}
        onLoadStart={() => setImageLoading(true)}
      />

      {imageLoading && (
        <div className="spin-wrapper">
          <Spin size="small" />
        </div>
      )}
    </div>
  )
}

export default MoviePoster
