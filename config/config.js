const { PGUSERNAME, PGPASSWORD, PGDB, PGHOST, PGPORT } = process.env;

module.exports = {
  development: {
    username: PGUSERNAME,
    password: PGPASSWORD,
    database: PGDB,
    host: PGHOST,
    port: PGPORT,
    dialect: "postgres"
  },
  test: {
    username: PGUSERNAME,
    password: PGPASSWORD,
    database: PGDB,
    host: PGHOST,
    port: PGPORT,
    dialect: "postgres"
  },
  production: {
    username: PGUSERNAME,
    password: PGPASSWORD,
    database: PGDB,
    host: PGHOST,
    port: PGPORT,
    dialect: "postgres"
  }
}
