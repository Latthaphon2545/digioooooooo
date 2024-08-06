const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const branchModel = sequelize.define("WP_BRANCH", {
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
  nameEN: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  nameTH: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  billerId: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

module.exports = branchModel;
