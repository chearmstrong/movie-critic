const Alexa = require('ask-sdk');
const Helpers = require('./Helpers');
const { SERVICE } = require('./config')();
const { handlers, errorHandlers } = require('./handlers');
const { requestInterceptors, responseInterceptors } = require('./interceptors');

const TABLE_NAME = `${SERVICE}-${Helpers.getStage()}`;

module.exports.handler = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

	return Alexa.SkillBuilders.standard()
		.addRequestHandlers(...handlers)
		.addRequestInterceptors(...requestInterceptors)
		.addResponseInterceptors(...responseInterceptors)
		.addErrorHandlers(...errorHandlers)
		.withTableName(TABLE_NAME)
		.withDynamoDbClient()
		.lambda()(event, context, callback);
};
