const express = require("express");
const { validate } = require("express-validation");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster.json");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster.json");
const userTypeMaster = require("../constants/masters/userTypeMaster.json");
const userSubTypeMaster = require("../constants/masters/userSubTypeMaster.json");
const walletTypeMaster = require("../constants/masters/walletTypeMaster.json");

const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");
const sequelizeTransactionController = require("../controllers/sequelizeTransactionController");
const inuserController = require("../controllers/inuserController");
const walletController = require("../controllers/walletController");
const inagentController = require("../controllers/inagentController");

const inagentValidation = require("../validations/inagentValidation");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;

const router = express.Router();

router.post(
  "/",
  validate(inagentValidation.createInagent),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INAGENT,
    portalPermissionActionMaster.CREATE
  ),
  sequelizeTransactionController.createSqlTransaction(),
  inuserController.createInuser(
    userTypeMaster.AGENT,
    userSubTypeMaster.INDIVIDUAL
  ),
  walletController.createWallet(walletTypeMaster.AGENT),
  inagentController.createInagent(),
  sequelizeTransactionController.commitSqlTransaction(),
  sequelizeTransactionController.handleSqlTransactionFailed(),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
    };
    res.json(req.response);
    next();
  }
);

router.get(
  "/",
  validate(inagentValidation.findInagents),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INAGENT,
    portalPermissionActionMaster.LIST
  ),
  inagentController.findInagents(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;

    req.response = {
      res_code: "0000",
      res_desc: "",
      total: req.total,
      inagents: req.inagents.map((inagent) => ({
        id: inagent.id,
        partner_id: inagent.partner ? inagent.partner.id : null,
        partner_name: inagent.partner ? inagent.partner.name : null,
        branch_id: inagent.branch.id,
        branch_name_en: inagent.branch.nameEN,
        branch_name_th: inagent.branch.nameTH,
        username: inagent.user.username,
        firstname_en: inagent.user.firstnameEN,
        lastname_en: inagent.user.lastnameEN,
        firstname_th: inagent.user.firstnameTH,
        lastname_th: inagent.user.lastnameTH,
        status: inagent.status,
        created_at: dayjs
          .utc(inagent.createdAt)
          .tz(timezone)
          .format(dateFormat),
        updated_at: dayjs
          .utc(inagent.updatedAt)
          .tz(timezone)
          .format(dateFormat),
      })),
    };
    res.json(req.response);
    next();
  }
);

router.get(
  "/:id",
  validate(inagentValidation.findInagent),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INAGENT,
    portalPermissionActionMaster.DETAIL
  ),
  inagentController.findInagent(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;

    req.response = {
      res_code: "0000",
      res_desc: "",
      inagent: {
        id: req.inagent.id,
        partner_id: req.inagent.partner ? req.inagent.partner.id : null,
        partner_name: req.inagent.partner ? req.inagent.partner.name : null,
        branch_id: req.inagent.branch.id,
        branch_name_en: req.inagent.branch.nameEN,
        branch_name_th: req.inagent.branch.nameTH,
        username: req.inagent.user.username,
        firstname_en: req.inagent.user.firstnameEN,
        lastname_en: req.inagent.user.lastnameEN,
        firstname_th: req.inagent.user.firstnameTH,
        lastname_th: req.inagent.user.lastnameTH,
        citizen_id: req.inagent.user.citizenId,
        passport: req.inagent.user.passport,
        phone_no: req.inagent.user.phoneNo,
        email: req.inagent.user.email,
        wallets: req.inagent.user.wallets.map((wallet) => ({
          id: wallet.id,
          type: wallet.type.name,
          wallet_id: wallet.walletId,
          balance: Number(wallet.balance),
          hold_balance: Number(wallet.holdBalance),
          currency: wallet.currency,
          is_default: wallet.isDefault,
          status: wallet.status,
          created_at: wallet.createdAt,
          updated_at: wallet.updatedAt,
        })),
        status: req.inagent.status,
        created_at: dayjs
          .utc(req.inagent.createdAt)
          .tz(timezone)
          .format(dateFormat),
        updated_at: dayjs
          .utc(req.inagent.updatedAt)
          .tz(timezone)
          .format(dateFormat),
      },
    };
    res.json(req.response);
    next();
  }
);

router.patch(
  "/:id",
  validate(inagentValidation.updateInagent),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INAGENT,
    portalPermissionActionMaster.DETAIL
  ),
  inagentController.findInagent(),
  sequelizeTransactionController.createSqlTransaction(),
  inagentController.updateInagent(),
  sequelizeTransactionController.commitSqlTransaction(),
  sequelizeTransactionController.handleSqlTransactionFailed(),
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
