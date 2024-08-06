const portalTypeMaster = require("../constants/masters/portalTypeMaster.json");

const branchModel = require("../models/branchModel");

exports.findInbranches = () => (req, res, next) => {
  const user = req.user;
  const { "x-partner-id": partnerID } = req.headers;

  const query = {
    where: {},
  };

  if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
    if (partnerID) {
      query.where.partnerId = partnerID;
    }
  } else {
    query.where.partnerId = user.partnerId;
  }

  branchModel
    .findAndCountAll(query)
    .then(({ count, rows }) => {
      req.total = count;
      req.branches = rows;
    })
    .then(() => next())
    .catch((err) => next(err));
};
