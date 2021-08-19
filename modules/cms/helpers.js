const _ = require("lodash");
const validator = require("../../middleware/fileValidator/validator.json");

function parsedModelToObject(table, model) {
  if (!model) {
    return null;
  }

  const parsed = Object.assign({}, _.pick(model, ["id", ...validator[table], "createdAt", "updatedAt"]));
  
  const populatedFields = _.filter(validator[table], (item) => /Id/.test(item));
  const mappedpopulatedFields = _.map(populatedFields, (item) => item.replace(/Id/, ""));
  mappedpopulatedFields.forEach(item => {
    parsed[item] = _.get(model, `[${item}].name`, "");
  })
  return parsed;
}

module.exports = {
  parsedModelToObject,
}