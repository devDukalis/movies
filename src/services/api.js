class MoviesApi {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  async fetchMovies(query = "", page = 1) {
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

    return response.json()
  }

  async fetchPopularMovies(page = 1) {
    const url = new URL(`${this.baseUrl}/movie/popular`)

    url.search = new URLSearchParams({
      api_key: this.apiKey,
      page,
      language: "en-US",
    })

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
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

  async createGuestSession() {
    const url = new URL(`${this.baseUrl}/authentication/guest_session/new`)

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

  async fetchRatedMovies(sessionId, page = 1) {
    const url = new URL(`${this.baseUrl}/guest_session/${sessionId}/rated/movies`)

    url.search = new URLSearchParams({
      api_key: this.apiKey,
      language: "en-US",
      page: page,
    })

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json() // Получаем данные об ошибке
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData.status_message}`,
      )
    }

    return response.json()
  }

  async rateMovie(sessionId, movieId, rating) {
    const url = new URL(`${this.baseUrl}/movie/${movieId}/rating`)

    url.search = new URLSearchParams({
      api_key: this.apiKey,
      guest_session_id: sessionId,
      language: "en-US",
    })

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        value: rating,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

export default MoviesApi
