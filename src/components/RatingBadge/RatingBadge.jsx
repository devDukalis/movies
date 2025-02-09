import "./styles.css"

const RatingBadge = ({ rating }) => (
  <div className="rating-badge">{rating?.toFixed(1) || "0.0"}</div>
)

export default RatingBadge
