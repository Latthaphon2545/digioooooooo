const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterReportTypeModel = sequelize.define("WP_MASTER_REPORT_TYPE", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

module.exports = masterReportTypeModel;
