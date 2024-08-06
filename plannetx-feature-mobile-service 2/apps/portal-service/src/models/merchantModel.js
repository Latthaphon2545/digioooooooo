const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const partnerModel = require("../models/partnerModel");
const branchModel = require("../models/branchModel");
const userModel = require("../models/userModel");
const agentModel = require("../models/agentModel");

const merchantModel = sequelize.define("WP_MERCHANT", {
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
  branchId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  mid: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  settleTime: {
    type: DataTypes.TIME(),
    allowNull: false,
  },
  settleToAgentId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("UNVERIFIED", "VERIFIED", "SUSPENDED"),
    allowNull: false,
  },
});

merchantModel.hasOne(partnerModel, {
  as: "partner",
  foreignKey: "id",
  sourceKey: "partnerId",
});
merchantModel.hasOne(branchModel, {
  as: "branch",
  foreignKey: "id",
  sourceKey: "branchId",
});
merchantModel.hasOne(userModel, {
  as: "user",
  foreignKey: "id",
  sourceKey: "userId",
});
merchantModel.hasOne(agentModel, {
  as: "agent",
  foreignKey: "id",
  sourceKey: "settleToAgentId",
});

module.exports = merchantModel;
