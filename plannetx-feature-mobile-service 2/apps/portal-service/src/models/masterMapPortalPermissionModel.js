const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterPortalPermissionModel = require("./masterPortalPermissionModel");

const masterMapPortalPermissionModel = sequelize.define(
  "WP_MASTER_MAP_PORTAL_PERMISSION",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    portalTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    portalSubTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    portalPermissionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    list: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
    detail: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
    create: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
    edit: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
    delete: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
    export: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
  }
);

masterMapPortalPermissionModel.hasOne(masterPortalPermissionModel, {
  as: "permission",
  foreignKey: "id",
  sourceKey: "portalPermissionId",
});

module.exports = masterMapPortalPermissionModel;
