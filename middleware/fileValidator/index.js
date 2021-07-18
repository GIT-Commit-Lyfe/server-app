const _ = require("lodash");
const { sequelize } = require('../../db/sequelize');
const Papa = require('papaparse');

module.exports = async function (req, res, next) {
  const { routeId } = req.params;
  const data = require('./validator.json')[routeId];
  if (!data) {
    const message = "[seeding]:no available table";
    log.error(message);
    res.status(404).json({ message });
    return;
  }
  // Proses ngambil buffer ke string csv
  if (!req,file) {
    const message = "[seeding]:no available csv file";
    log.error(message);
    res.status(404).json({ message });
    return;
  }
  const csv = req.file.buffer.toString(); // dapet dari req.file (multer.single)
  try {
    const rawJSON = (await Papa.parse(csv, { header: true })).data;
    const isEmpty = _.isEmpty(rawJSON);
    
    if (isEmpty) {
      const message = "[seeding]:data empty";
      log.error(message);
      res.status(400).json({ message });
      return;
    }
  
    const firstRowKeys = Object.keys(rawJSON[0]);
    const validated = _.isEqual(firstRowKeys, data);
    
    if (!validated) {
      const message = "[seeding]:data invalid";
      log.error(message);
      res.status(400).json({ message });
      return;
    }
  
    const seedJSON = rawJSON.map((item) => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await sequelize.queryInterface.bulkInsert(routeId, seedJSON);
    log.info(`${seedJSON.length} data seeded to ${routeId}`);
    next();
  } catch(err) {
    const message = "[seeding]:internal server error";
    log.error(message);
    log.error(err.message);
    log.error(err);
    res.status(500).json({ message });
  }
}

// server/seed/
// multer -> validator -> require
// body { model: 'brand' }
// body { model: 'collection' }
// body { model: '' }
// body { model: 'brand' }
// body { model: 'brand' }