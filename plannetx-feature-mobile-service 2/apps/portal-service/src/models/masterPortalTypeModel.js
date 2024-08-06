const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterPortalTypeModel = sequelize.define("WP_MASTER_PORTAL_TYPE", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

module.exports = masterPortalTypeModel;
