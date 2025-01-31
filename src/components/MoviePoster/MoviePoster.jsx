import { Image, Spin } from "antd"
import { useState } from "react"

import { IMAGE_BASE_URL } from "../../constants"

const MoviePoster = ({ posterPath, title, fallbackSVG }) => {
  const [imageLoading, setImageLoading] = useState(false)

  return (
    <div style={{ flexShrink: 0, borderRight: "1px solid #E0E0E0" }}>
      <Image
        alt={title}
        src={posterPath ? `${IMAGE_BASE_URL}/w500${posterPath}` : fallbackSVG}
        style={{
          width: "180px",
          height: "280px",
          objectFit: "cover",
        }}
        preview={false}
        onLoad={() => setImageLoading(false)}
        onError={(e) => {
          e.target.src = fallbackSVG
          setImageLoading(false)
        }}
        onLoadStart={() => setImageLoading(true)}
      />

      {imageLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}>
          <Spin size="small" />
        </div>
      )}
    </div>
  )
}

export default MoviePoster
