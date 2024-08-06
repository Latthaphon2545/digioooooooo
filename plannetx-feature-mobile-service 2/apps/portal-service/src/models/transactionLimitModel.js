const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterTransactionSubTypeModel = require("./masterTransactionSubTypeModel");
const masterTransactionTypeModel = require("./masterTransactionTypeModel");

const transactionLimitModel = sequelize.define("WP_TRANSACTION_LIMIT", {
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
  transactionTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  transactionSubTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: 0,
  },
  limitPerTransaction: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: false,
    defaultValue: 0,
  },
  limitPerDay: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: false,
    defaultValue: 0,
  },
});

transactionLimitModel.hasOne(masterTransactionTypeModel, {
  as: "type",
  foreignKey: "id",
  sourceKey: "transactionTypeId",
});
transactionLimitModel.hasOne(masterTransactionSubTypeModel, {
  as: "subType",
  foreignKey: "id",
  sourceKey: "transactionSubTypeId",
});

module.exports = transactionLimitModel;
