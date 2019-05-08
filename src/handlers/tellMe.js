const Trakt = require('../managers/Trakt');
const states = require('../constants/states');
const responseStrings = require('../resources/responseStrings');
const { INTENT_REQUEST } = require('../constants/request-types');
const { TELL_ME_INTENT } = require('../constants/intent-types');

const trakt = new Trakt();

module.exports = {
	canHandle: ({ requestEnvelope }) => (
		requestEnvelope.request.type === INTENT_REQUEST &&
		requestEnvelope.request.intent.name === TELL_ME_INTENT
	),
	handle: async ({ responseBuilder, requestEnvelope, attributesManager }) => { // eslint-disable-line space-before-function-paren
		const movieName = requestEnvelope.request.intent.slots.MovieName.value;
		const movie = await trakt.getMovie(movieName);
		const attributes = {};

		if (movie) {
			attributes.currentIntent = TELL_ME_INTENT;
			attributes.currentMovie = movie;
			attributes.state = states.INPROGRESS;

			await attributesManager.setSessionAttributes(attributes);

			const { rating: ratingRaw, overview } = movie;
			const rating = Math.round(ratingRaw, 1);

			let additional = responseStrings.tellMe.additional.high;

			if (rating > 5 && rating <= 7) {
				additional = responseStrings.tellMe.additional.med;
			} else if (rating <= 5) {
				additional = responseStrings.tellMe.additional.low;
			}

			const response = `${responseStrings.tellMe.found(overview, movieName, additional)}`;

			return responseBuilder
				.withSimpleCard(`${movie.title} [${rating}/10]`, movie.overview || 'No overview available.')
				.speak(response)
				.getResponse();
		}

		// Not found
		return responseBuilder
			.speak(responseStrings.tellMe.notFound)
			.getResponse();
	}
};
