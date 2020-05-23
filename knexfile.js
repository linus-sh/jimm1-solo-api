// Update with your config settings.
const config = require("./database/config");

module.exports = {
  client: "pg",
  connection: config.db.connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directry: "./database/migrations",
  },
};
