const express = require("express");
const { validate } = require("express-validation");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster.json");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster.json");
const userTypeMaster = require("../constants/masters/userTypeMaster.json");
const walletTypeMaster = require("../constants/masters/walletTypeMaster.json");

const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");
const inmerchantController = require("../controllers/inmerchantController");
const sequelizeTransactionController = require("../controllers/sequelizeTransactionController");
const inuserController = require("../controllers/inuserController");
const walletController = require("../controllers/walletController");

const inmerchantValidation = require("../validations/inmerchantValidation");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;

const router = express.Router();

router.post(
  "/",
  validate(inmerchantValidation.createInmerchant),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INMERCHANT,
    portalPermissionActionMaster.CREATE
  ),
  sequelizeTransactionController.createSqlTransaction(),
  inuserController.createInuser(userTypeMaster.MERCHANT),
  walletController.createWallet(walletTypeMaster.MERCHANT),
  inmerchantController.createInmerchant(),
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
  validate(inmerchantValidation.findInmerchants),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INMERCHANT,
    portalPermissionActionMaster.LIST
  ),
  inmerchantController.findInmerchants(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;

    req.response = {
      res_code: "0000",
      res_desc: "",
      total: req.total,
      inagents: req.inmerchants.map((inagent) => ({
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
  validate(inmerchantValidation.findInmerchant),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INMERCHANT,
    portalPermissionActionMaster.DETAIL
  ),
  inmerchantController.findInmerchant(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;

    req.response = {
      res_code: "0000",
      res_desc: "",
      inmerchant: {
        id: req.inmerchant.id,
        partner_id: req.inmerchant.partner ? req.inmerchant.partner.id : null,
        partner_name: req.inmerchant.partner
          ? req.inmerchant.partner.name
          : null,
        branch_id: req.inmerchant.branch.id,
        branch_name_en: req.inmerchant.branch.nameEN,
        branch_name_th: req.inmerchant.branch.nameTH,
        mid: req.inmerchant.mid,
        username: req.inmerchant.user.username,
        sub_type: req.inmerchant.user.subType.name,
        firstname_en: req.inmerchant.user.firstnameEN,
        lastname_en: req.inmerchant.user.lastnameEN,
        firstname_th: req.inmerchant.user.firstnameTH,
        lastname_th: req.inmerchant.user.lastnameTH,
        tax_id: req.inmerchant.user.taxId,
        citizen_id: req.inmerchant.user.citizenId,
        passport: req.inmerchant.user.passport,
        phone_no: req.inmerchant.user.phoneNo,
        email: req.inmerchant.user.email,
        wallets: req.inmerchant.user.wallets.map((wallet) => ({
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
        settle_time: req.inmerchant.settleTime.slice(0, -3),
        settle_to_agent_id: req.inmerchant.agent.id,
        settle_to_agent_firstname_en: req.inmerchant.agent.user.firstnameEN,
        settle_to_agent_lastname_en: req.inmerchant.agent.user.lastnameEN,
        settle_to_agent_firstname_th: req.inmerchant.agent.user.firstnameTH,
        settle_to_agent_lastname_th: req.inmerchant.agent.user.lastnameTH,
        status: req.inmerchant.status,
        created_at: dayjs
          .utc(req.inmerchant.createdAt)
          .tz(timezone)
          .format(dateFormat),
        updated_at: dayjs
          .utc(req.inmerchant.updatedAt)
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
  validate(inmerchantValidation.updateInmerchant),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INMERCHANT,
    portalPermissionActionMaster.DETAIL
  ),
  inmerchantController.findInmerchant(),
  sequelizeTransactionController.createSqlTransaction(),
  inmerchantController.updateInmerchant(),
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
