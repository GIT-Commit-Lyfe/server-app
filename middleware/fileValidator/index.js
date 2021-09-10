const _ = require("lodash");
const { sequelize } = require('../../db/sequelize');
const Papa = require('papaparse');
const log = require('../../utils/log')

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
  if (!req.file) {
    const message = "[seeding]:no available csv file";
    log.error(message);
    res.status(404).json({ message });
    return;
  }
  const csv = req.file.buffer.toString().replace("﻿", ""); // dapet dari req.file (multer.single)
  try {
    const result = await Papa.parse(csv, { header: true })
    const rawJSON = result.data;
    const isEmpty = _.isEmpty(rawJSON);
    
    if (isEmpty) {
      const message = "[seeding]:data empty";
      log.error(message);
      res.status(400).json({ message });
      return;
    }
  
    const fields = _.get(result, "meta.fields", []);
    const validated = _.isEqual(fields, data);
    
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

    await sequelize.queryInterface.bulkInsert(routeId + `${routeId[routeId.length-1] === "s" ? "e" : ""}s`, seedJSON);
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