const { nanoid } = require("nanoid");

const partnerError = require("../constants/errors/partnerError");

const auditLogMenuMaster = require("../constants/masters/auditLogMenuMaster");

const diff = require("../helpers/diff");
const { ServiceError } = require("../helpers/error");

const partnerCredentialModel = require("../models/partnerCredentialModel");

exports.generateApiIdAndApiKey = () => (req, res, next) => {
  req.apiId = nanoid(32);
  req.apiKey = nanoid(64);
  next();
};

exports.findPartnerCredential = () => (req, res, next) => {
  const partner = req.partner;

  const query = {
    where: {
      partnerId: partner.id,
    },
  };
  partnerCredentialModel
    .findOne(query)
    .then((partnerCredential) => {
      if (!partnerCredential) {
        throw new ServiceError(partnerError.ERR_PARTNER_CREDENTIAL_NOT_FOUND);
      } else {
        req.partnerCredential = partnerCredential;
      }
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.updatePartnerCredential = () => (req, res, next) => {
  const partner = req.partner;
  const partnerCredential = req.partnerCredential;

  const user = req.user;

  const update = {
    apiId: req.apiId,
    apiKey: req.apiKey,
  };

  req.audit = {
    partnerId: user.partnerId,
    menu: auditLogMenuMaster.CREDENTIAL,
    action: "UPDATE",
    sourceType: "PORTAL",
    sourceId: user.id,
    sourceName: `${user.firstnameEN} ${user.lastnameEN}`,
    destinationType: "PARTNER",
    destinationId: partner.id,
    destinationName: partner.name,
    detail: JSON.stringify(diff.diffJson(partnerCredential, update)),
  };

  partnerCredential
    .update(update)
    .then(() => next())
    .catch((err) => next(err));
};
