// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      database: "dev_status_check",
      user: process.env.PG_USER,
      port: process.env.PG_PORT,
      password: process.env.PG_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
