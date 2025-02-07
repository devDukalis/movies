export const truncateText = (text, maxLength = 100) => {
  if (!text) return ""

  if (maxLength <= 3) {
    return text.length > maxLength ? ".".repeat(maxLength) : text
  }

  if (text.length <= maxLength) {
    return text
  }

  const truncated = text.substr(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(" ")

  if (lastSpace !== -1) {
    return truncated.substr(0, lastSpace) + "..."
  } else {
    return truncated + "..."
  }
}

export const getStarColor = (rating) => {
  if (rating <= 3) return "#E90000"
  if (rating <= 5) return "#E97E00"
  if (rating <= 7) return "#E9D100"
  return "#66E900"
}
