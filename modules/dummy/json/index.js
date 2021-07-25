const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const json = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(file => {
    const data = require(path.join(__dirname, file));
    json[file.replace(".json", "")] = data;
  });

module.exports = json;