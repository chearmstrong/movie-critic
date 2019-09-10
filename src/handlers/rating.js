const R = require('ramda');
const Trakt = require('../managers/Trakt');
const states = require('../constants/states');
const { rating: responseStrings } = require('../resources/responseStrings');
const { INTENT_REQUEST } = require('../constants/request-types');
const { RATING_INTENT } = require('../constants/intent-types');

const trakt = new Trakt();

const { high, med, low } = R.prop('additional', responseStrings);
const getAddn = R.cond([
	[R.lte(R.__, 5), R.always(low)],
	[R.lte(R.__, 7), R.always(med)],
	[R.T, R.always(high)]
]);

module.exports = {
	canHandle: ({ requestEnvelope }) => (
		requestEnvelope.request.type === INTENT_REQUEST &&
		requestEnvelope.request.intent.name === RATING_INTENT
	),
	handle: async ({ responseBuilder, requestEnvelope, attributesManager }) => { // eslint-disable-line space-before-function-paren
		const movieName = R.path(['request', 'intent', 'slots', 'MovieName', 'value'], requestEnvelope);
		const movie = await trakt.getMovie(movieName);
		const attributes = {};

		if (movie) {
			attributes.currentIntent = RATING_INTENT;
			attributes.state = states.INPROGRESS;

			await attributesManager.setSessionAttributes(attributes);

			const { rating: ratingRaw, votes } = movie;
			const rating = Math.round(ratingRaw, 1);
			const additional = getAddn(rating);
			const response = `${responseStrings.found(votes, movieName, rating, additional)}`;

			if (movie.poster) {
				return responseBuilder
					.withStandardCard(`${movie.title} [${rating}/10]`, movie.overview || 'No overview available.', movie.poster)
					.speak(response).getResponse();
			}

			return responseBuilder
				.withSimpleCard(`${movie.title} [${rating}/10]`, movie.overview || 'No overview available.')
				.speak(response).getResponse();
		}

		return responseBuilder
			.speak(responseStrings.notFound)
			.getResponse();
	}
};
