const _ = require("lodash");
const models = require("../../models");
const { Audit } = models;
const { parsedModelToObject, parseAuditModel } = require("./helpers");

const fs = require('fs');
const path = require('path');
const { sequelize, Sequelize } = require(__dirname + "/../../db/sequelize");
const log = require(__dirname + "/../../utils/log");
const asyncForEach = require(__dirname + "/../../utils/asyncForEach");
const { Op } = Sequelize;

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

async function createOne(table, form) {
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

  const updatedOne = await findOneByPK(table, { id });
  return updatedOne;
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

async function audit(UserId, table, model, status) {
  const auditData = { data: model.id, UserId, status };
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

async function createAudit(table, { data, UserId, status}) {
  const form = {
    table,
    data,
    status,
    UserId,
  };  
  const created = await Audit.create(form);
  const model = await Audit.findByPk(created.id, { include: [{ all: true }] });
  const parsed = parseAuditModel(model);

  return parsed;
}

async function patchAuthorToModels(table, models) {
  const dataIds = models.map(model => model.id);
  const auditDatalist = await Audit.findAll({
    where: {
      table,
      data: {
        [Op.in]: dataIds,
      },
    },
    order: [
      ["createdAt", "DESC"], // we only need to take the latest author update
    ],
    include: [{ all: true }]
  })
    .catch(err => {
      const message = `[patch-author]: ${table}`;
      log.error(message);
      log.error(err.message);
      log.error(err);
      models.forEach(model => {
        model[author] = "";
      })
    })
  const auditDatalistGrouped = _.groupBy(auditDatalist, (item) => item.data);
  const auditDatalistGroupedMapped = _.mapValues(auditDatalistGrouped, (val) => parseAuditModel(val[0]));

  models.forEach(model => {
    const author = _.get(auditDatalistGroupedMapped[model.id], "author", "annonymous");
    model["author"] = author;
  })
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
  patchAuthorToModels,
}