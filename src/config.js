const API = {
  TRAKT: {
    baseUrl: 'https://api.trakt.tv/',
    clientId: process.env.TRAKT_CLIENT_ID || null,
    clientSecret: process.env.TRAKT_CLIENT_SECRET || null,
    movieLimit: 50,
    movieRatingsRange: '70-100'
  },
  TMDB: {
    baseUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p',
    apiKey: process.env.TMDB_API_KEY || null
  }
}

const SERVICE = 'movie-critic'

const CONFIG = {
  API,
  SERVICE
}

module.exports = () => Object.freeze(CONFIG)
