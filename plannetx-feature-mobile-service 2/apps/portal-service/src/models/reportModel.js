const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterReportSubTypeModel = require("./masterReportSubTypeModel");
const masterReportTypeModel = require("./masterReportTypeModel");
const partnerModel = require("./partnerModel");

const reportModel = sequelize.define("WP_REPORT", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  partnerId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  reportTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  reportSubTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY(),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

reportModel.hasOne(partnerModel, {
  as: "partner",
  foreignKey: "id",
  sourceKey: "partnerId",
});
reportModel.hasOne(masterReportTypeModel, {
  as: "type",
  foreignKey: "id",
  sourceKey: "reportTypeId",
});
reportModel.hasOne(masterReportSubTypeModel, {
  as: "subType",
  foreignKey: "id",
  sourceKey: "reportSubTypeId",
});

module.exports = reportModel;
