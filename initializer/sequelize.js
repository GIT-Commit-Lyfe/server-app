const { sequelize } = require(__dirname + "/../db/sequelize");
const log = require(__dirname + "/../utils/log");

module.exports = async () => {
  log.info("Authenticating to database...");
  try {
    const errors = await sequelize.authenticate();
    if (errors) {
      log.error(errors);
      process.exit(1);
    }
    
    log.info("DB Connection established!");
  } catch(errors) {
    log.error("Connection refused!");
    log.error(errors);
    process.exit(1);
  }
}
