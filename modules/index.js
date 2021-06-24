const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
let endpointMap = {};

fs
  .readdirSync(__dirname)
  .filter(dir => {
    return (dir.indexOf('.') !== 0) && (dir !== basename) && (dir !== "dummy");
  })
  .forEach(dir => {
    const dirEndpointMap = require(path.join(__dirname, dir, "endpointMap.js"));
    endpointMap = { ...endpointMap, ...dirEndpointMap };
  });

module.exports = endpointMap;