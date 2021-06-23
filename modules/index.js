const boutiqueMap = require('./boutiques/endpointMap')
const testMap = require('./test/endpointMap')

module.exports = {
  ...boutiqueMap,
  ...testMap
}