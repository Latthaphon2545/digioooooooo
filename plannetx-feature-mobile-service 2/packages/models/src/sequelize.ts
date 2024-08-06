import { Sequelize, Dialect } from 'sequelize'

export const sequelize = new Sequelize(
  process.env.DB!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT as Dialect,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    },
    ssl: true,
    dialectOptions: {
       ssl: {
          require: true
       }
     },
    logging: undefined,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 60000
    }
  }
)
