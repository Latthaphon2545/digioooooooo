const sequelize = require("../helpers/sequelize");

exports.createSqlTransaction = () => async (req, res, next) => {
  req.t = await sequelize.transaction();
  next();
};

exports.commitSqlTransaction = () => async (req, res, next) => {
  const t = req.t;
  await t.commit();
  next();
};

exports.handleSqlTransactionFailed = () => async (err, req, res, next) => {
  const t = req.t;
  if (t) await t.rollback();
  next(err);
};
