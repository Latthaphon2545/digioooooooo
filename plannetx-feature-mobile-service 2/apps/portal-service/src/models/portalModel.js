const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterPortalTypeModel = require("./masterPortalTypeModel");
const masterPortalSubTypeModel = require("./masterPortalSubTypeModel");
const partnerModel = require("./partnerModel");

const portalModel = sequelize.define("WP_PORTAL", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  partnerId: {
    type: DataTypes.INTEGER(11),
  },
  portalTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  portalSubTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  firstnameEN: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastnameEN: {
    type: DataTypes.STRING(100),
  },
  firstnameTH: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastnameTH: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phoneNo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
  },
  status: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  recentLogin: {
    type: DataTypes.DATE(),
  },
  lastLogin: {
    type: DataTypes.DATE(),
  },
});

portalModel.hasOne(masterPortalTypeModel, {
  as: "type",
  foreignKey: "id",
  sourceKey: "portalTypeId",
});
portalModel.hasOne(masterPortalSubTypeModel, {
  as: "subType",
  foreignKey: "id",
  sourceKey: "portalSubTypeId",
});
portalModel.hasOne(partnerModel, {
  as: "partner",
  foreignKey: "id",
  sourceKey: "partnerId",
});

module.exports = portalModel;
