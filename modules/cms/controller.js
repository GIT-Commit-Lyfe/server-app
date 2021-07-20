const _ = require("lodash");
const models = require("../../models");
const { parsedModelToObject } = require("./helpers");

async function findAll(table) {
  const list = await models[table].findAll();
  const parsed = _.map(list, (model) => parsedModelToObject(table, model));

  return parsed;
}

async function findOneByPK(table, { id }) {
  const model = await models[table].findByPk(id);
  const parsed = parsedModelToObject(table, model);

  return parsed;
}

async function createOne(table, form) {
  const created = await models[table].create(form);
  const parsed = parsedModelToObject(table, created);

  return parsed;
}

async function updateOneByPK(table, { id, form }) {
  await models[table].update(form, {
    where: {
      id,
    },
  })

  return await findOneByPK(table, { id });
}

async function deleteOneByPK(table, { id }) {
  const deleted = await findOneByPK(table, { id });
  await models[table].destroy({
    where: {
      id,
    },
  })

  return deleted;
}

module.exports = {
  findAll,
  findOneByPK,
  createOne,
  updateOneByPK,
  deleteOneByPK,
}