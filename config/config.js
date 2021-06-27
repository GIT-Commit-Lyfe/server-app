const { PGUSERNAME, PGPASSWORD, PGDB, PGHOST, PGPORT } = process.env;

const config = {
  username: PGUSERNAME,
  password: PGPASSWORD,
  database: PGDB,
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres"
}

module.exports = {
  development: config,
  test: config,
  production: config
}
