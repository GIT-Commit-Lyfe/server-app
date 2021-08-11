const { PGUSERNAME, PGPASSWORD, PGDB, PGHOST, PGPORT, NODE_ENV } = process.env;

const config = {
  username: PGUSERNAME,
  password: PGPASSWORD,
  database: PGDB,
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
  dialectOptions: {
    encrypt: true,
    requestTimeout: 120000,
  },
  logging: NODE_ENV === "development"
}

module.exports = {
  development: config,
  test: config,
  production: config
}
