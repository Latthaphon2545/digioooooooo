const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterWaleltTypeModel = require("./masterWalletTypeModel");

const walletLimitModel = sequelize.define("WP_WALLET_LIMIT", {
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
  walletTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  limitBalance: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: false,
  },
});

walletLimitModel.hasOne(masterWaleltTypeModel, {
  as: "type",
  foreignKey: "id",
  sourceKey: "walletTypeId",
});

module.exports = walletLimitModel;
