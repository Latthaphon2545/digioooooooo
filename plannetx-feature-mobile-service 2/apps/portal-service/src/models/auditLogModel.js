const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const partnerModel = require("./partnerModel");

const auditLogModel = sequelize.define("WP_AUDIT_LOG", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  partnerId: {
    type: DataTypes.INTEGER(11),
  },
  menu: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  sourceType: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  sourceId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  sourceName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  destinationType: {
    type: DataTypes.STRING(45),
  },
  destinationId: {
    type: DataTypes.INTEGER(11),
  },
  destinationName: {
    type: DataTypes.STRING(100),
  },
  detail: {
    type: DataTypes.TEXT("long"),
  },
});

auditLogModel.hasOne(partnerModel, {
  as: "partner",
  foreignKey: "id",
  sourceKey: "partnerId",
});

module.exports = auditLogModel;
