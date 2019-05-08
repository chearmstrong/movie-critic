const { help: responseStrings } = require('../resources/responseStrings');
const { INTENT_REQUEST } = require('../constants/request-types');
const { AMAZON_HELP_INTENT } = require('../constants/intent-types');

module.exports = {
	canHandle: ({ requestEnvelope }) => (
		requestEnvelope.request.type === INTENT_REQUEST &&
		requestEnvelope.request.intent.name === AMAZON_HELP_INTENT
	),
	handle: ({ responseBuilder }) => responseBuilder.speak(responseStrings.main)
		.reprompt(responseStrings.reprompt)
		.getResponse()
};
