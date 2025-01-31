const RatingBadge = ({ rating }) => (
  <div
    style={{
      position: "absolute",
      top: 10,
      right: 10,
      width: 30,
      height: 30,
      borderRadius: "50%",
      border: "2px solid #E9D100",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      zIndex: 1,
      fontSize: 12,
      fontWeight: "bold",
      lineHeight: 22,
    }}>
    {rating?.toFixed(1) || "0.0"}
  </div>
)

export default RatingBadge
