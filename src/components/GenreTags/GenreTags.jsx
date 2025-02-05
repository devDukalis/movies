import { useContext } from "react"

import { GenresContext } from "../../context/GenresContext"

const GenreTags = ({ genreIds }) => {
  const { genres } = useContext(GenresContext)

  return (
    <div
      style={{
        marginBottom: 8,
        color: "#827E7E",
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        alignItems: "center",
      }}>
      {genreIds?.map((id) => {
        const genre = genres.find((g) => g.id === id)
        return (
          <span
            key={id || "na"}
            style={{
              background: "#fafafa",
              border: "1px solid #d9d9d9",
              borderRadius: "2px",
              padding: "0px 8px",
              whiteSpace: "nowrap",
            }}>
            {genre?.name || "N/A"}
          </span>
        )
      })}
    </div>
  )
}

export default GenreTags
