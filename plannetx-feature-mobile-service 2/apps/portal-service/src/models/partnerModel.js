const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const transactionConfigModel = require("./transactionConfigModel");
const transactionFeeModel = require("./transactionFeeModel");
const transactionLimitModel = require("./transactionLimitModel");
const walletLimitModel = require("./walletLimitModel");

const partnerModel = sequelize.define("WP_PARTNER", {
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
  theme: {
    type: DataTypes.STRING(45),
    allowNull: false,
    defaultValue: "default",
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: "THB",
  },
  timezone: {
    type: DataTypes.STRING(45),
    allowNull: false,
    defaultValue: "Asia/Bangkok",
  },
  dateFormat: {
    type: DataTypes.STRING(45),
    allowNull: false,
    defaultValue: "YYYY-MM-DD HH:mm:ss",
  },
  status: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
});

partnerModel.hasMany(transactionConfigModel, {
  as: "transactionConfigs",
  foreignKey: "partnerId",
  sourceKey: "id",
});
partnerModel.hasMany(transactionFeeModel, {
  as: "transactionFees",
  foreignKey: "partnerId",
  sourceKey: "id",
});
partnerModel.hasMany(transactionLimitModel, {
  as: "transactionLimites",
  foreignKey: "partnerId",
  sourceKey: "id",
});
partnerModel.hasMany(walletLimitModel, {
  as: "walletLimites",
  foreignKey: "partnerId",
  sourceKey: "id",
});

module.exports = partnerModel;
