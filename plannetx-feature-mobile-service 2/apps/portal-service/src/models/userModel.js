const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const masterBankModel = require("./masterBankModel");
const masterUserSubTypeModel = require("./masterUserSubTypeModel");
const masterUserTypeModel = require("./masterUserTypeModel");
const partnerModel = require("./partnerModel");
const walletModel = require("./walletModel");

const userModel = sequelize.define("WP_USER", {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  uid: {
    type: DataTypes.STRING(21),
    allowNull: false,
    unique: true,
  },
  partnerId: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
  },
  userTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  userSubTypeId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  firstnameEN: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastnameEN: {
    type: DataTypes.STRING(100),
  },
  firstnameTH: {
    type: DataTypes.STRING(100),
  },
  lastnameTH: {
    type: DataTypes.STRING(100),
  },
  phoneNo: {
    type: DataTypes.STRING(10),
  },
  email: {
    type: DataTypes.STRING(40),
  },
  taxId: {
    type: DataTypes.STRING(13),
  },
  citizenId: {
    type: DataTypes.STRING(13),
  },
  passport: {
    type: DataTypes.STRING(20),
  },
  birthdate: {
    type: DataTypes.DATE(),
  },
  gender: {
    type: DataTypes.ENUM("FEMALE", "MALE"),
  },
  bankId: {
    type: DataTypes.INTEGER(11),
  },
  bankBranch: {
    type: DataTypes.STRING(255),
  },
  bankAccountNumber: {
    type: DataTypes.STRING(15),
  },
  bankAccountName: {
    type: DataTypes.STRING(100),
  },
  status: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
});

userModel.hasOne(partnerModel, {
  as: "partner",
  foreignKey: "id",
  sourceKey: "partnerId",
});
userModel.hasOne(masterBankModel, {
  as: "bank",
  foreignKey: "id",
  sourceKey: "bankId",
});
userModel.hasOne(masterUserTypeModel, {
  as: "type",
  foreignKey: "id",
  sourceKey: "userTypeId",
});
userModel.hasOne(masterUserSubTypeModel, {
  as: "subType",
  foreignKey: "id",
  sourceKey: "userSubTypeId",
});
userModel.hasMany(walletModel, {
  as: "wallets",
  foreignKey: "userId",
  sourceKey: "id",
});

module.exports = userModel;
