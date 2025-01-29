class MoviesApi {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  async fetchMovies(query = "return", page = 1) {
    const url = new URL(`${this.baseUrl}/search/movie`)

    url.search = new URLSearchParams({
      api_key: this.apiKey,
      query,
      page,
      language: "en-US",
    })

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data.results
  }

  async fetchGenres() {
    const url = new URL(`${this.baseUrl}/genre/movie/list`)

    url.search = new URLSearchParams({
      api_key: this.apiKey,
      language: "en-US",
    })

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

export default MoviesApi
