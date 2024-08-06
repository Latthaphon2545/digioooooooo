const express = require("express");
const { validate } = require("express-validation");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster");

const inpartnerController = require("../controllers/inpartnerController");
const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");

const inpartnerValidation = require("../validations/inpartnerValidation");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;

const router = express.Router();

router.get(
  "/",
  validate(inpartnerValidation.findInpartners),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INPARTNER,
    portalPermissionActionMaster.LIST
  ),
  inpartnerController.findInpartners(),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
      total: req.total,
      inpartners: req.inpartners.map((inpartner) => ({
        id: inpartner.id,
        name: inpartner.name,
        currency: inpartner.currency,
        timezone: inpartner.timezone,
        date_format: inpartner.dateFormat,
        status: inpartner.status,
        created_at: dayjs
          .utc(inpartner.createdAt)
          .tz(TIMEZONE)
          .format(DATEFORMAT),
        updated_at: dayjs
          .utc(inpartner.updatedAt)
          .tz(TIMEZONE)
          .format(DATEFORMAT),
      })),
    };
    res.json(req.response);
    next();
  }
);

router.get(
  "/:id",
  validate(inpartnerValidation.findInpartner),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INPARTNER,
    portalPermissionActionMaster.LIST
  ),
  inpartnerController.findInpartner(),
  inpartnerController.findInparterLogo("vertical"),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
      id: req.inpartner.id,
      logo: req.inpartner.logo,
      name: req.inpartner.name,
      theme: req.inpartner.theme,
      currency: req.inpartner.currency,
      timezone: req.inpartner.timezone,
      date_format: req.inpartner.dateFormat,
      status: req.inpartner.status,
      transaction_configs: req.inpartner.transactionConfigs.map(
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
      transaction_fees: req.inpartner.transactionFees.map((transactionFee) => ({
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
      transaction_limites: req.inpartner.transactionLimites.map(
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
      wallet_limites: req.inpartner.walletLimites.map((walletLimit) => ({
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
        .utc(req.inpartner.createdAt)
        .tz(TIMEZONE)
        .format(DATEFORMAT),
      updated_at: dayjs
        .utc(req.inpartner.updatedAt)
        .tz(TIMEZONE)
        .format(DATEFORMAT),
    };
    res.json(req.response);
    next();
  }
);

module.exports = router;
