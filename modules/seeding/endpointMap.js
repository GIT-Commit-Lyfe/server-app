// endpoint -> multer single -> 
const fileValidator = require('../../middleware/fileValidator');
const multer = require('../../middleware/multer');
const { sequelize } = require('../../db/sequelize');
const log = require('../../utils/log');
const models = require("../../models");
const { audit, auditStatus } = require("../cms/controller");
const { authenticate } = require("../auth/middleware");
const asyncForEach = require('../../utils/asyncForEach');

module.exports = {
  'seed': [
    ...authenticate,
    multer.single('file'),
    fileValidator,
    async (req, res, next) => {
      const { routeId } = req.params;
      const status = await sequelize.queryInterface.bulkInsert(routeId + `${routeId[routeId.length-1] === "s" ? "e" : ""}s`, req.seedJSON);
      log.info(`${req.seedJSON.length} data seeded to ${routeId}`);
      log.info("Status:");
      log.info(status);
      
      const justSeeded = await models[routeId].findAll({
        where: {
          createdAt: req.seedingTime,
        },
        include: [{ all: true }]
      });

      await asyncForEach(justSeeded, async (seeded) => {
        await audit(req.userDetails.id, routeId, seeded, auditStatus.SEEDED);
      })

      const message = `data seeded!`
      res.status(200).json({ message });
    }
  ]
}