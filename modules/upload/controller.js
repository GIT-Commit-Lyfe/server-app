const _ = require("lodash");
const { UnusedFile } = require("../../models");
const { sequelize, Sequelize } = require(__dirname + "/../../db/sequelize");
const { Op } = Sequelize;

async function registerFile(payload = {}) {
  const defaultPayload = {
    url: "",
  }
  const registeredFile = await UnusedFile.create({
    ...defaultPayload,
    ...payload,
  })

  return registeredFile;
}

async function getAllURL() {
  const urls = await UnusedFile.findAll();
  const validKeys = ["id", "url", "createdAt", "updatedAt"];
  const mappedUrls = urls.map(item => _.pick(item, validKeys));

  return mappedUrls;
}

async function getAllURLByPK(ids = []) {
  const urls = await UnusedFile.findAll({
    where: {
      [Op.or]: ids,
    },
  });

  const urlObj = {}
  const mappedUrls = urls.map(item => {
    urlObj[item.url] = item.id;
    return item.url;
  });

  return { urls: mappedUrls, urlObj };
}

async function deleteMultipleByPK(ids = []) {
  const deletedOnes = await sequelize.queryInterface.bulkDelete("UnusedFile", {id: {[Op.in]: ids}}, {})

  return deletedOnes;
}

module.exports = {
  registerFile,
  getAllURL,
  getAllURLByPK,
  deleteMultipleByPK,
}