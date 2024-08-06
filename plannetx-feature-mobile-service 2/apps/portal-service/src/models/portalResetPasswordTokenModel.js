const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/sequelize");

const portalModel = require("./portalModel");

const portalResetPasswordToken = sequelize.define(
  "WP_PORTAL_RESET_PASSWORD_TOKEN",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    portalId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    expiredAt: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  }
);

portalResetPasswordToken.hasOne(portalModel, {
  as: "portal",
  foreignKey: "id",
  sourceKey: "portalId",
});

module.exports = portalResetPasswordToken;
