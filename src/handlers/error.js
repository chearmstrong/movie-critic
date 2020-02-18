const { error } = require('../resources/responseStrings')

module.exports = {
  canHandle: () => true,
  handle: ({ responseBuilder }, err) => {
    console.error('[error]', err)
    return responseBuilder.speak(error).getResponse()
  }
}
