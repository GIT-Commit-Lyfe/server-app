const _ = require("lodash");
const models, { Audit } = require("../../models");
const { parsedModelToObject, parseAuditModel } = require("./helpers");

const fs = require('fs');
const path = require('path');
const { sequelize, Sequelize } = require(__dirname + "/../../db/sequelize");
const log = require(__dirname + "/../../utils/log");
const asyncForEach = require(__dirname + "/../../utils/asyncForEach");

async function demigrate(model, { raw } = { raw: false }) {
  const migrationsPath = __dirname + "/../../migrations";
  const migrationFiles = fs.readdirSync(migrationsPath);

  if (raw) {
    log.info(`Raw migration defined. Processing demigration ${model} file...`);
  } else if (model) {
    log.info(`Model defined. Processing demigration (model:${model}) single file...`);
  } else {
    log.info("Processing demigration files...");
  }
  await asyncForEach(migrationFiles, async (file) => {
    if (!raw) {
      if (!file.includes("create")) {
        return;
      }

      const modelFile = file.replace(".js", "").split("-").slice(2).join("-");
      if (model && modelFile !== model) {
        return;
      }
    } else {
      const modelFile = file.replace(".js", "");
      if (model !== modelFile) {
        return;
      }
    }
    log.info("Demigrating -> " + file);
    const migration = require(path.join(migrationsPath, file));
    try {
      await migration.down(sequelize.queryInterface, Sequelize);
      log.info("Demigration done! " + file);
    } catch(error) {
      log.warn("Failed demigrating -> " + file);
      if (error.message) {
        log.warn(error.message);
      }
    }
  });
  log.info("All done!");
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

async function createOne(table, form, userId) {
  const created = await models[table].create(form);
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

// AUDIT CONTROLLERS...
const auditStatus = {
  CREATED: "created",
  SEEDED: "seeded",
  UPDATED: "updated",
  DELETED: "deleted",
}

async function audit(userId, table, model, status) {
  const auditData = { data: model.id, userId, status };
  const auditResult = await createAudit(table, auditData)
    .catch(err => {
      const dataStringified = JSON.stringify(auditData, null, 2);
      const message = `[audit]: ${routeId}\n${dataStringified}`;
      log.error(message);
      log.error(err.message);
      log.error(err);
      model["author"] = "";
    });
  model["author"] = auditResult.author;
}

async function createAudit(table, { data, userId, status}) {
  const form = {
    table,
    data,
    status,
    userId,
  };  
  const created = await Audit.create(form);
  const model = await Audit.findByPk(created.id, { include: [{ all: true }] });
  const parsed = parseAuditModel(model);

  return parsed;
}

module.exports = {
  findAll,
  findOneByPK,
  createOne,
  updateOneByPK,
  deleteOneByPK,
  deleteMultipleByPK,
  demigrate,
  audit,
  auditStatus,
}