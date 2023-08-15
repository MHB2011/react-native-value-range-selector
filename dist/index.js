
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-native-value-range-selector.cjs.production.min.js')
} else {
  module.exports = require('./react-native-value-range-selector.cjs.development.js')
}
