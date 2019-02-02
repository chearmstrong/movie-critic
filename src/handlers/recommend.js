const Trakt = require('../managers/Trakt');
const states = require('../constants/states');
const access = require('safe-access');
const supportedGenres = require('../resources/genres.json');
const responseStrings = require('../resources/responseStrings');
const { INTENT_REQUEST } = require('../constants/request-types');
const { RECOMMEND_INTENT } = require('../constants/intent-types');

const trakt = new Trakt();

module.exports = {
	canHandle: ({ requestEnvelope }) => (
		requestEnvelope.request.type === INTENT_REQUEST &&
		requestEnvelope.request.intent.name === RECOMMEND_INTENT
	),
	handle: async ({ responseBuilder, requestEnvelope, attributesManager }) => { // eslint-disable-line space-before-function-paren
		const genre = access(requestEnvelope, 'request.intent.slots.Genre.value');
		const found = genre ? supportedGenres.find((genreDetails) => genre.toLowerCase() === genreDetails.name) : null;
		const query = found ? found.slug : '';
		const genreName = found ? found.name : null;
		let response = `${responseStrings.rating.notFound}`;
		const attributes = {};

		if (!genre || found) {
			const movie = await trakt.getRecommendedMovie(query);

			if (movie) {
				attributes.currentIntent = RECOMMEND_INTENT;
				attributes.currentMovie = movie;
				attributes.state = states.INPROGRESS;

				await attributesManager.setSessionAttributes(attributes);

				const { title, rating: ratingRaw, tagline, released } = movie;
				const rating = Math.round(ratingRaw, 1);
				const [releaseYear] = released.split('-');

				response = responseStrings.recommend.found(genreName, title, releaseYear, rating, tagline);
			}
		}

		return responseBuilder.speak(response).getResponse();
	}
};
