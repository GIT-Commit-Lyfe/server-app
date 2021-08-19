const _ = require("lodash");
const models = require("../../models");
const { parsedModelToObject } = require("./helpers");

const fs = require('fs');
const path = require('path');
const { sequelize, Sequelize } = require(__dirname + "/../../db/sequelize");
const log = require(__dirname + "/../../utils/log");
const asyncForEach = require(__dirname + "/../../utils/asyncForEach");

async function demigrate(model) {
  const migrationsPath = __dirname + "/../../migrations";
  const migrationFiles = fs.readdirSync(migrationsPath);

  if (model) {
    log.info(`Model defined. Processing demigration (model:${model}) single file...`);
  } else {
    log.info("Processing demigration files...");
  }
  await asyncForEach(migrationFiles, async (file) => {
    if (!file.includes("create")) {
      return;
    }

    const modelFile = file.replace(".js", "").split("-").slice(2).join("-");

    if (model && modelFile !== model) {
      return;
    }
    log.info("Demigrating -> " + file);
    const migration = require(path.join(migrationsPath, file));
    try {
      await migration.down(sequelize.queryInterface, Sequelize);
      log.info("Demigration done! " + file);
    } catch(error) {
      log.warn("Failed demigrating -> " + file);
    }
    log.info("All done!");
  });
}

async function findAll(table) {
  const list = await models[table].findAll({ include: [{ all: true }] });
  const parsed = _.map(list, (model) => parsedModelToObject(table, model));

  return parsed;
}

async function findOneByPK(table, { id }) {
  const model = await models[table].findByPk(id, { include: [{ all: true }] });
  const parsed = parsedModelToObject(table, model);

  return parsed;
}

async function createOne(table, form) {
  const created = await models[table].create(form, { include: [{ all: true }] });
  const parsed = await findOneByPK(table, { id: created.id });

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

async function deleteMultipleByPK(table, { id }) {
  const ids = id.split(",");
  const { Op } = Sequelize;
  const deletedOnes = await sequelize.queryInterface.bulkDelete(table, {id: {[Op.in]: ids}}, {})

  return deletedOnes;
}

module.exports = {
  findAll,
  findOneByPK,
  createOne,
  updateOneByPK,
  deleteOneByPK,
  deleteMultipleByPK,
  demigrate,
}