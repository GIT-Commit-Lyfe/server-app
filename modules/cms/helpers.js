const _ = require("lodash");
const validator = require("../../middleware/fileValidator/validator.json");

function parsedModelToObject(table, model) {
  if (!model) {
    return;
  }
  
  const parsed = Object.assign({}, _.pick(model, ["id", ...validator[table], "createdAt", "updatedAt"]));

  return parsed;
}

module.exports = {
  parsedModelToObject,
}