const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterTransactionSubTypeModel = require("./masterTransactionSubTypeModel");
const masterTransactionTypeModel = require("./masterTransactionTypeModel");

const transactionConfigModel = sequelize.define("WP_TRANSACTION_CONFIG", {
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
  isHolding: {
    type: DataTypes.BOOLEAN(),
    allowNull: false,
  },
});

transactionConfigModel.hasOne(masterTransactionTypeModel, {
  as: "type",
  foreignKey: "id",
  sourceKey: "transactionTypeId",
});
transactionConfigModel.hasOne(masterTransactionSubTypeModel, {
  as: "subType",
  foreignKey: "id",
  sourceKey: "transactionSubTypeId",
});

module.exports = transactionConfigModel;
