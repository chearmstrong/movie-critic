// TODO: Remove Class

const { API } = require('../config')();
const needle = require('needle');
const { getMoviePoster } = require('./Tmdb');

// Any errors that are thrown will be picked up by the error handler.

module.exports = class Trakt {
	constructor() {
		this.clientId = API.TRAKT.clientId;
		this.baseUrl = API.TRAKT.baseUrl;
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				'trakt-api-version': '2',
				'trakt-api-key': this.clientId
			}
		};
		this.movieLimit = API.TRAKT.movieLimit;
		this.movieRatingsRange = API.TRAKT.movieRatingsRange;
	}

	async getMovie(query) {
		const { body: movies } = await needle('get', `${this.baseUrl}/search/movie`, { query }, this.options);
		const movie = movies.length ? await this.getMovieDetailed(movies[0].movie.ids.slug) : null;

		return movie;
	}

	async getMovieDetailed(id) {
		const { body: movie } = await needle('get', `${this.baseUrl}/movies/${id}`, { extended: 'full' }, this.options);

		movie.poster = await getMoviePoster(movie.ids.tmdb);

		return movie;
	}

	async getRecommendedMovie(genre) {
		const trending = await this.getTrendingMovies({ genres: genre });
		const index = (Math.floor(Math.random() * trending.length) + 1) - 1;
		const movie = await this.getMovieDetailed(trending[index].movie.ids.slug);

		return movie;
	}

	async getTrendingMovies({ genres, page = 1, limit = this.movieLimit, ratings = this.movieRatingsRange }) {
		const { body: trending } = await needle('get', `${this.baseUrl}/movies/trending`, { genres, page, limit, ratings }, this.options);

		return trending;
	}
};
