const { API } = require('../config')();
const needle = require('needle');
const R = require('ramda');

const { apiKey, baseUrl, imageBaseUrl } = API.TMDB;

const getMoviePoster = async (id) => {
	const options = { json: true };
	const url = `${baseUrl}/movie/${id}/images?api_key=${apiKey}&language=en`;
	const response = await needle('get', url, {}, options).catch(() => null);
	const filePath = R.path(['body', 'posters', 0, 'file_path'], response);

	return filePath ? `${imageBaseUrl}/w300${filePath}` : null;
};

module.exports = { getMoviePoster };
