// Update with your config settings.
const config = require("./config");

module.exports = {
  client: "pg",
  connection: config.db.connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
