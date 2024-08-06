const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const partnerModel = sequelize.define("WP_PARTNER_CREDENTIAL", {
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
  apiId: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  apiKey: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
});

module.exports = partnerModel;
