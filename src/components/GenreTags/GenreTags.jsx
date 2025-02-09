import { useContext } from "react"

import { GenresContext } from "../../context/GenresContext"

import "./styles.css"

const GenreTags = ({ genreIds }) => {
  const { genres } = useContext(GenresContext)

  return (
    <div className="genres-wrapper">
      {genreIds?.map((id) => {
        const genre = genres.find((g) => g.id === id)
        return (
          <span className="genre" key={id || "na"}>
            {genre?.name || "N/A"}
          </span>
        )
      })}
    </div>
  )
}

export default GenreTags
