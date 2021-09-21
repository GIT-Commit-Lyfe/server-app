const fs = require('fs');
const path = require('path');
const { sequelize, Sequelize } = require(__dirname + "/../db/sequelize");
const log = require(__dirname + "/../utils/log");
const asyncForEach = require(__dirname + "/../utils/asyncForEach");

module.exports = async () => {
  log.info("Processing migration files...");
  const migrationsPath = __dirname + "/../migrations";
  
  const migrationFiles = fs.readdirSync(migrationsPath);
  await asyncForEach(migrationFiles, async (file) => {
    log.info("Migrating -> " + file);
    const migration = require(path.join(migrationsPath, file));
    try {
      await migration.up(sequelize.queryInterface, Sequelize);
      log.info("Migration done! " + file);
    } catch(error) {
      log.warn("Failed migrating -> " + file);
      if (error.message) {
        log.warn(error.message);
      }
    }
  });
  log.info("All done!");
}