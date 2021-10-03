// endpoint -> multer single -> 
const fileValidator = require('../../middleware/fileValidator');
const multer = require('../../middleware/multer');
const { sequelize } = require('../../db/sequelize');
const log = require('../../utils/log');

module.exports = {
  'seed': [
    multer.single('file'),
    fileValidator,
    async (req, res, next) => {
      await sequelize.queryInterface.bulkInsert(routeId + `${routeId[routeId.length-1] === "s" ? "e" : ""}s`, req.seedJSON);
      log.info(`${req.seedJSON.length} data seeded to ${routeId}`);
      
      const message = `data seeded!`
      res.status(200).json({ message });
    }
  ]
}