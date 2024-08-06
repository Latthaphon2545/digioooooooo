const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterWalletTypeModel = require("./masterWalletTypeModel");

const walletModel = sequelize.define("WP_WALLET", {
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
  walletId: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: false,
    defaultValue: 0,
  },
  holdBalance: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: false,
    defaultValue: 0,
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: "THB",
  },
  isDefault: {
    type: DataTypes.BOOLEAN(),
    allowNull: false,
    defaultValue: false,
  },
  status: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
});

walletModel.hasOne(masterWalletTypeModel, {
  as: "type",
  foreignKey: "id",
  sourceKey: "walletTypeId",
});

module.exports = walletModel;
