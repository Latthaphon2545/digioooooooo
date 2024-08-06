const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const partnerModel = require("../models/partnerModel");
const branchModel = require("../models/branchModel");
const userModel = require("../models/userModel");

const agentModel = sequelize.define("WP_AGENT", {
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
  status: {
    type: DataTypes.ENUM("UNVERIFIED", "VERIFIED", "SUSPENDED"),
    allowNull: false,
  },
});

agentModel.hasOne(partnerModel, {
  as: "partner",
  foreignKey: "id",
  sourceKey: "partnerId",
});
agentModel.hasOne(branchModel, {
  as: "branch",
  foreignKey: "id",
  sourceKey: "branchId",
});
agentModel.hasOne(userModel, {
  as: "user",
  foreignKey: "id",
  sourceKey: "userId",
});

module.exports = agentModel;
