const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const log = require(__dirname + "/../utils/log");

const config = require(__dirname + '/../config/config.js')[env];
const sequelizeInstance = new Sequelize(config.database, config.username, config.password, config);

const sequelize = require(__dirname + "/sequelize");
const migration = require(__dirname + "/migration");

async function init() {
  const DUMMYMODE = process.env.DUMMYMODE;
  if (DUMMYMODE != "1") {
    await sequelize(sequelizeInstance);
    await migration(sequelizeInstance, Sequelize);
  }
  log.info("Server initiation done!");
}

init();
