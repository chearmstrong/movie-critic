const { API } = require('../config')()
const needle = require('needle')
const R = require('ramda')

const { apiKey, baseUrl, imageBaseUrl } = API.TMDB

const getMoviePoster = async id => {
  const url = `${baseUrl}/movie/${id}/images?api_key=${apiKey}&language=en`
  const response = await needle('get', url).catch(() => null) // JSON === true not needed
  const filePath = R.path(['body', 'posters', 0, 'file_path'], response)

  return filePath ? `${imageBaseUrl}/w500${filePath}` : null
}

module.exports = { getMoviePoster }
