const models = require("../../models");

async function findAll(table) {
  return await models[table].findAll();
}

async function findOneByPK(table, { id }) {
  return await models[table].findOneByPk(id);
}

async function createOne(table, form) {
  return await models[table].create(form);
}

async function updateOneByPK(table, { id, form }) {
  return await models[table].update(form, {
    where: {
      id,
    },
  })
}

async function deleteOneByPK(table, { id }) {
  return await models[table].destroy({
    where: {
      id,
    },
  })
}

module.exports = {
  findAll,
  findOneByPK,
  createOne,
  updateOneByPK,
  deleteOneByPK,
}