import { getStarColor } from "../../utils/index"

import "./styles.css"

const RatingBadge = ({ rating }) => (
  <div className="rating-badge" style={{ border: `2px solid ${getStarColor(rating)}` }}>
    {rating?.toFixed(1) || "0.0"}
  </div>
)

export default RatingBadge
