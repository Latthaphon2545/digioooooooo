const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterTransactionSubTypeModel = require("./masterTransactionSubTypeModel");
const masterTransactionTypeModel = require("./masterTransactionTypeModel");

const transactionFeeModel = sequelize.define("WP_TRANSACTION_FEE", {
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
  },
  start: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: false,
    defaultValue: 0,
  },
  end: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: false,
    defaultValue: 0,
  },
  fee: {
    type: DataTypes.DECIMAL(19, 4),
    allowNull: false,
    defaultValue: 0,
  },
});

transactionFeeModel.hasOne(masterTransactionTypeModel, {
  as: "type",
  foreignKey: "id",
  sourceKey: "transactionTypeId",
});
transactionFeeModel.hasOne(masterTransactionSubTypeModel, {
  as: "subType",
  foreignKey: "id",
  sourceKey: "transactionSubTypeId",
});

module.exports = transactionFeeModel;
