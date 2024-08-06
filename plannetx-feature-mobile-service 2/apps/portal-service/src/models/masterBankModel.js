const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterBankModel = sequelize.define("WP_MASTER_BANK", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  shortName: {
    type: DataTypes.STRING(5),
    allowNull: false,
  },
  fullNameTH: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  fullNameEN: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

module.exports = masterBankModel;
