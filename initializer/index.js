const log = require(__dirname + "/../utils/log");

const sequelize = require(__dirname + "/sequelize");
const migration = require(__dirname + "/migration");

async function init() {
  const DUMMYMODE = process.env.DUMMYMODE;
  if (DUMMYMODE != "1") {
    await sequelize();
    await migration();
  }
  log.info("Server initialized successfully!");
}

init();
