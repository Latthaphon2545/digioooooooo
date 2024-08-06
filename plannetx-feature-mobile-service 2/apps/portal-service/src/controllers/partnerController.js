const partnerError = require("../constants/errors/partnerError.json");

const partnerStatusMaster = require("../constants/masters/partnerStatusMaster");
const auditLogMenuMaster = require("../constants/masters/auditLogMenuMaster");
const portalTypeMaster = require("../constants/masters/portalTypeMaster");

const diff = require("../helpers/diff");
const s3 = require("../helpers/s3");
const { ServiceError } = require("../helpers/error");

const masterTransactionSubTypeModel = require("../models/masterTransactionSubTypeModel");
const masterTransactionTypeModel = require("../models/masterTransactionTypeModel");
const masterWalletTypeModel = require("../models/masterWalletTypeModel");
const partnerModel = require("../models/partnerModel");
const transactionConfigModel = require("../models/transactionConfigModel");
const transactionFeeModel = require("../models/transactionFeeModel");
const transactionLimitModel = require("../models/transactionLimitModel");
const walletLimitModel = require("../models/walletLimitModel");

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

exports.findPartner = (includes) => (req, res, next) => {
  const user = req.user;
  if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
    next();
  } else {
    const query = {
      include: [],
      where: { id: user.partnerId },
    };

    if (includes) {
      includes.forEach((include) => {
        switch (include) {
          case "transactionConfigs":
            query.include.push({
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
            });
            break;
          case "transactionFees":
            query.include.push({
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
            });
            break;
          case "transactionLimites":
            query.include.push({
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
            });
            break;
          case "walletLimites":
            query.include.push({
              model: walletLimitModel,
              as: "walletLimites",
              include: [
                {
                  model: masterWalletTypeModel,
                  as: "type",
                  required: true,
                },
              ],
              required: false,
            });
        }
      });
    }

    partnerModel
      .findOne({ where: query, raw: true })
      .then((partner) => {
        const test = partner.toJSON();
        console.log("test", test);
        if (!partner) {
          throw new ServiceError(partnerError.ERR_PARTNER_NOT_FOUND);
        } else {
          if (partner.status !== partnerStatusMaster.ACTIVATED) {
            throw new ServiceError(partnerError.ERR_PARTNER_NOT_ACTIVATE);
          } else {
            req.partner = partner;
          }
        }
      })
      .then(() => next())
      .catch((err) => next(err));
  }
};

exports.findPartnerLogo = (variation) => (req, res, next) => {
  const partner = req.partner;

  if (!partner) {
    next();
  } else {
    let key;
    switch (variation) {
      case "horizontal":
        key = `${partner.name}/logo-horizontal.png`;
        break;
      case "vertical":
        key = `${partner.name}/logo-vertical.png`;
        break;
    }
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: key,
    };

    s3.headObject(params, (err, metadata) => {
      if (err) {
        console.error(err);
        req.partner.logo = null;
        next();
      } else {
        s3.getSignedUrl("getObject", params, (err, url) => {
          if (err) {
            console.error(err);
            req.partner.logo = null;
            next();
          } else {
            req.partner.logo = url;
            next();
          }
        });
      }
    });
  }
};

exports.updatePartner = () => (req, res, next) => {
  const partner = req.partner;
  const user = req.user;

  const update = {};

  req.audit = {
    partnerId: user.partnerId,
    menu: auditLogMenuMaster.PARTNER,
    action: "UPDATE",
    sourceType: "PORTAL",
    sourceId: user.id,
    sourceName: `${user.firstnameEN} ${user.lastnameEN}`,
    destinationType: "PARTNER",
    destinationId: partner.id,
    destinationName: partner.name,
    detail: JSON.stringify(diff.diffJson(partner, update)),
  };

  partner
    .update(update)
    .then(() => {
      req.partner = {
        ...partner,
        ...update,
      };
    })
    .then(() => next())
    .catch((err) => next(err));
};
