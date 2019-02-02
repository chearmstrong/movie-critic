const Trakt = require('../managers/Trakt');
const states = require('../constants/states');
const responseStrings = require('../resources/responseStrings');
const { INTENT_REQUEST } = require('../constants/request-types');
const { RATING_INTENT } = require('../constants/intent-types');

const trakt = new Trakt();

module.exports = {
	canHandle: ({ requestEnvelope }) => (
		requestEnvelope.request.type === INTENT_REQUEST &&
		requestEnvelope.request.intent.name === RATING_INTENT
	),
	handle: async ({ responseBuilder, requestEnvelope, attributesManager }) => { // eslint-disable-line space-before-function-paren
		const movieName = requestEnvelope.request.intent.slots.MovieName.value;
		const movie = await trakt.getMovie(movieName);
		let response = `${responseStrings.rating.notFound}`;
		const attributes = {};

		if (movie) {
			attributes.currentIntent = RATING_INTENT;
			attributes.currentMovie = movie;
			attributes.state = states.INPROGRESS;

			await attributesManager.setSessionAttributes(attributes);

			const { rating: ratingRaw, votes } = movie;
			const rating = Math.round(ratingRaw, 1);

			let additional = responseStrings.rating.additional.high;

			if (rating > 5 && rating <= 7) {
				additional = responseStrings.rating.additional.med;
			} else if (rating <= 5) {
				additional = responseStrings.rating.additional.low;
			}

			response = `${responseStrings.rating.found(votes, movieName, rating, additional)}`;
		}

		return responseBuilder.speak(response).getResponse();
	}
};
