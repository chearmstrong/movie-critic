const R = require('ramda')
const Trakt = require('../managers/Trakt')
const states = require('../constants/states')
const supportedGenres = require('../resources/genres.json')
const { recommend: responseStrings } = require('../resources/responseStrings')
const { INTENT_REQUEST } = require('../constants/request-types')
const { RECOMMEND_INTENT } = require('../constants/intent-types')
// const document = require('../docs/movie-details.json');
// const ytdl = require('ytdl-core');

const trakt = new Trakt()

module.exports = {
  canHandle: ({ requestEnvelope }) =>
    requestEnvelope.request.type === INTENT_REQUEST &&
    requestEnvelope.request.intent.name === RECOMMEND_INTENT,
  handle: async ({ responseBuilder, requestEnvelope, attributesManager }) => {
    // eslint-disable-line space-before-function-paren
    // const supportsAPL = R.hasPath(['context', 'System', 'device', 'supportedInterfaces', 'Alexa.Presentation.APL'], requestEnvelope);
    const genre = R.path(['request', 'intent', 'slots', 'Genre', 'value'], requestEnvelope)
    const found = genre
      ? supportedGenres.find(genreDetails => genre.toLowerCase() === genreDetails.name)
      : null
    const query = found ? found.slug : ''
    const genreName = found ? found.name : null
    const attributes = {}

    if (!genre || found) {
      const movie = await trakt.getRecommendedMovie(query)

      if (movie) {
        attributes.currentIntent = RECOMMEND_INTENT
        attributes.state = states.INPROGRESS

        await attributesManager.setSessionAttributes(attributes)

        const { title, rating: ratingRaw, tagline, year: releaseYear } = movie
        const rating = Math.round(ratingRaw, 1)
        const response = responseStrings.found(genreName, title, releaseYear, rating, tagline)

        // For devices with screens
        // if (supportsAPL) {
        // 	const ytResponse = await ytdl.getInfo(movie.trailer);
        // 	const filtered = ytdl.filterFormats(ytResponse.formats, 'audioandvideo');
        // 	const trailer = R.compose(R.prop('url'), R.head, R.sort(R.descend(R.prop('resolution'))))(filtered);

        // 	if (trailer) {
        // 		return responseBuilder.speak(response)
        // 			.addDirective({
        // 				type: 'Alexa.Presentation.APL.RenderDocument',
        // 				version: '1.0',
        // 				document,
        // 				datasources: {
        // 					currentView: {
        // 						type: 'object',
        // 						properties: {
        // 							title: movie.title,
        // 							trailer: trailer || null,
        // 							tagline: movie.tagline || ''
        // 						}
        // 					}
        // 				}
        // 			})
        // 			.getResponse();
        // 	}
        // }

        // For devices without screens
        if (movie.poster) {
          return responseBuilder
            .withStandardCard(
              `${movie.title} [${rating}/10]`,
              movie.overview || 'No overview available.',
              movie.poster
            )
            .speak(response)
            .getResponse()
        }

        return responseBuilder
          .withSimpleCard(`${movie.title} [${rating}/10]`, movie.overview || 'No overview available.')
          .speak(response)
          .getResponse()
      }
    }

    // Not found
    return responseBuilder.speak(responseStrings.notFound).getResponse()
  }
}
