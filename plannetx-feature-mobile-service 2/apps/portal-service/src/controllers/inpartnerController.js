const Sequelize = require("sequelize");

const inpartnerError = require("../constants/errors/inpartnerError");

const s3 = require("../helpers/s3");
const { ServiceError } = require("../helpers/error");

const masterTransactionSubTypeModel = require("../models/masterTransactionSubTypeModel");
const masterTransactionTypeModel = require("../models/masterTransactionTypeModel");
const masterWaleltTypeModel = require("../models/masterWalletTypeModel");
const partnerModel = require("../models/partnerModel");
const transactionConfigModel = require("../models/transactionConfigModel");
const transactionFeeModel = require("../models/transactionFeeModel");
const transactionLimitModel = require("../models/transactionLimitModel");
const walletLimitModel = require("../models/walletLimitModel");

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

const Op = Sequelize.Op;

exports.findInpartners = () => (req, res, next) => {
  const { q, status, limit, offset } = req.query;

  const query = {
    where: {},
  };
  if (q) {
    query.where[Op.or] = [{ id: q }, { name: { [Op.like]: `%${q}%` } }];
  }
  if (status) query.where.status = status;
  if (limit) query.limit = Number(limit);
  if (offset) query.offset = Number(offset);

  partnerModel
    .findAndCountAll(query)
    .then(({ count, rows }) => {
      req.total = count;
      req.inpartners = rows;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findInpartner = () => (req, res, next) => {
  const query = {
    include: [
      {
        model: transactionConfigModel,
        as: "transactionConfigs",
        include: [
          {
            model: masterTransactionTypeModel,
            as: "type",
            required: true,
          },
          {
            model: masterTransactionSubTypeModel,
            as: "subType",
            required: true,
          },
        ],
        required: false,
      },
      {
        model: transactionFeeModel,
        as: "transactionFees",
        include: [
          {
            model: masterTransactionTypeModel,
            as: "type",
            required: true,
          },
          {
            model: masterTransactionSubTypeModel,
            as: "subType",
            required: true,
          },
        ],
        required: false,
      },
      {
        model: transactionLimitModel,
        as: "transactionLimites",
        include: [
          {
            model: masterTransactionTypeModel,
            as: "type",
            required: true,
          },
          {
            model: masterTransactionSubTypeModel,
            as: "subType",
            required: true,
          },
        ],
        required: false,
      },
      {
        model: walletLimitModel,
        as: "walletLimites",
        include: [
          {
            model: masterWaleltTypeModel,
            as: "type",
            required: true,
          },
        ],
        required: false,
      },
    ],
    where: {
      id: req.params.id,
    },
  };
  partnerModel
    .findOne(query)
    .then((inpartner) => {
      if (!inpartner) {
        throw new ServiceError(inpartnerError.ERR_INPARTNER_NOT_FOUND);
      } else {
        req.inpartner = inpartner;
      }
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findInparterLogo = (variation) => (req, res, next) => {
  const inpartner = req.inpartner;

  let key;
  switch (variation) {
    case "horizontal":
      key = `${inpartner.name}/logo-horizontal.png`;
      break;
    case "vertical":
      key = `${inpartner.name}/logo-vertical.png`;
      break;
  }
  const params = {
    Bucket: AWS_S3_BUCKET,
    Key: key,
  };
  s3.getSignedUrl("getObject", params, (err, url) => {
    if (err) {
      console.error(err);
      req.inpartner.logo = null;
      next();
    } else {
      req.inpartner.logo = url;
      next();
    }
  });
};
