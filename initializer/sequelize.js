const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../config/config.js')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const log = require(__dirname + "/../utils/log");

log.info("Authenticating to database...");
sequelize
  .authenticate()
  .then((errors) => {
    if (errors) {
      log.error(errors);
      process.exit(1);
    }
    log.info("DB Connection established!");
  })
  .catch((errors) => {
    log.error("Connection refused!");
    log.error(errors);
    process.exit(1);
  });
