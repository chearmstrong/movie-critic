const end = require('./end')
const help = require('./help')
const error = require('./error')
const tellMe = require('./tellMe')
const rating = require('./rating')
const launch = require('./launch')
const recommend = require('./recommend')
const unhandled = require('./unhandled')

module.exports = {
  handlers: [recommend, tellMe, rating, launch, end, help, unhandled],
  errorHandlers: [error]
}
