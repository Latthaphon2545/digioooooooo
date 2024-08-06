const Sequelize = require("sequelize");

const winston = require("./winston");

const ENVIRONMENT = process.env.ENVIRONMENT;

const { DB, DB_DIALECT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } =
  process.env;

const sequelize = new Sequelize(DB, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: ENVIRONMENT === "development" ? console.log : undefined,
  define: {
    freezeTableName: true,
    timestamps: true,
  },
  pool: {
    max: 30,
    min: 0,
    idle: 10000,
    acquire: 60000,
  },
});

sequelize
  .authenticate({ logging: false })
  .then(() => {
    winston.info("Database Connecteddd");
  })
  .catch((err) => {
    winston.error("Unable to connect to database", err);
  });

module.exports = sequelize;
