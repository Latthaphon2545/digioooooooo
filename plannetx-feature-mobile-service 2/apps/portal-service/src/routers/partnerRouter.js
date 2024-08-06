const express = require("express");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster");

const partnerCredentialController = require("../controllers/partnerCredentialController");
const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;

const router = express.Router();

router.get(
  "/",
  partnerController.findPartner([
    "transactionConfigs",
    "transactionFees",
    "transactionLimites",
    "walletLimites",
  ]),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.PARTNER,
    portalPermissionActionMaster.DETAIL
  ),
  partnerController.findPartnerLogo("vertical"),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
      id: req.partner.id,
      logo: req.partner.logo,
      name: req.partner.name,
      currency: req.partner.currency,
      timezone: req.partner.timezone,
      date_format: req.partner.dateFormat,
      status: req.partner.status,
      transaction_configs: req.partner.transactionConfigs.map(
        (transactionConfig) => ({
          type: transactionConfig.type.name,
          sub_type: transactionConfig.subType.name,
          is_holding: transactionConfig.isHolding,
          created_at: dayjs
            .utc(transactionConfig.createdAt)
            .tz(TIMEZONE)
            .format(DATEFORMAT),
          updated_at: dayjs
            .utc(transactionConfig.updatedAt)
            .tz(TIMEZONE)
            .format(DATEFORMAT),
        })
      ),
      transaction_fees: req.partner.transactionFees.map((transactionFee) => ({
        type: transactionFee.type.name,
        sub_type: transactionFee.subType.name,
        start: Number(transactionFee.start),
        end: Number(transactionFee.end),
        fee: Number(transactionFee.fee),
        created_at: dayjs
          .utc(transactionFee.createdAt)
          .tz(TIMEZONE)
          .format(DATEFORMAT),
        updated_at: dayjs
          .utc(transactionFee.updatedAt)
          .tz(TIMEZONE)
          .format(DATEFORMAT),
      })),
      transaction_limites: req.partner.transactionLimites.map(
        (transactionLimit) => ({
          type: transactionLimit.type.name,
          sub_type: transactionLimit.subType.name,
          limit_per_transaction: transactionLimit.limitPerTransaction,
          limit_per_day: transactionLimit.limitPerDay,
          created_at: dayjs
            .utc(transactionLimit.createdAt)
            .tz(TIMEZONE)
            .format(DATEFORMAT),
          updated_at: dayjs
            .utc(transactionLimit.updatedAt)
            .tz(TIMEZONE)
            .format(DATEFORMAT),
        })
      ),
      wallet_limites: req.partner.walletLimites.map((walletLimit) => ({
        type: walletLimit.type.name,
        limit_balance: walletLimit.limitBalance,
        created_at: dayjs
          .utc(walletLimit.createdAt)
          .tz(TIMEZONE)
          .format(DATEFORMAT),
        updated_at: dayjs
          .utc(walletLimit.updatedAt)
          .tz(TIMEZONE)
          .format(DATEFORMAT),
      })),
      created_at: dayjs
        .utc(req.partner.createdAt)
        .tz(TIMEZONE)
        .format(DATEFORMAT),
      updated_at: dayjs
        .utc(req.partner.updatedAt)
        .tz(TIMEZONE)
        .format(DATEFORMAT),
    };
    res.json(req.response);
    next();
  }
);

router.get(
  "/credential",
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.CREDENTIAL,
    portalPermissionActionMaster.DETAIL
  ),
  partnerCredentialController.findPartnerCredential(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;
    req.response = {
      res_code: "0000",
      res_desc: "",
      api_id: req.partnerCredential.apiId,
      api_key: req.partnerCredential.apiKey,
      updated_at: dayjs
        .utc(req.partnerCredential.updated_at)
        .tz(timezone)
        .format(dateFormat),
    };
    res.json(req.response);
    next();
  }
);

router.patch(
  "/credential",
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.CREDENTIAL,
    portalPermissionActionMaster.EDIT
  ),
  partnerCredentialController.findPartnerCredential(),
  partnerCredentialController.generateApiIdAndApiKey(),
  partnerCredentialController.updatePartnerCredential(),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
    };
    res.json(req.response);
    next();
  }
);

module.exports = router;
