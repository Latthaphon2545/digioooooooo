const express = require("express");
const { validate } = require("express-validation");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster");

const inuserController = require("../controllers/inuserController");
const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");

const inuserValidation = require("../validations/inuserValidation");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;

const router = express.Router();

router.get(
  "/",
  validate(inuserValidation.findInusers),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INUSER,
    portalPermissionActionMaster.LIST
  ),
  inuserController.findInusers(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;
    req.response = {
      res_code: "0000",
      res_desc: "",
      total: req.total,
      inusers: req.inusers.map((inuser) => ({
        id: inuser.id,
        uid: inuser.uid,
        partner_id: inuser.partner ? inuser.partner.id : null,
        partner_name: inuser.partner ? inuser.partner.name : null,
        type: inuser.type.name,
        sub_type: inuser.subType.name,
        firstname_en: inuser.firstnameEN,
        lastname_en: inuser.lastnameEN,
        firstname_th: inuser.firstnameTH,
        lastname_th: inuser.lastnameTH,
        status: inuser.status,
        created_at: dayjs.utc(inuser.createdAt).tz(timezone).format(dateFormat),
        updated_at: dayjs.utc(inuser.updatedAt).tz(timezone).format(dateFormat),
      })),
    };
    res.json(req.response);
    next();
  }
);

router.get(
  "/:id",
  validate(inuserValidation.findInuser),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INUSER,
    portalPermissionActionMaster.DETAIL
  ),
  inuserController.findInuser("id", "param"),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;
    req.response = {
      res_code: "0000",
      res_desc: "",
      id: req.inuser.id,
      uid: req.inuser.uid,
      type: req.inuser.type.name,
      sub_type: req.inuser.subType.name,
      firstname_en: req.inuser.firstnameEN,
      lastname_en: req.inuser.lastnameEN,
      firstname_th: req.inuser.firstnameTH,
      lastname_th: req.inuser.lastnameTH,
      phone_no: req.inuser.phoneNo,
      email: req.inuser.email,
      tax_id: req.inuser.taxId,
      citizen_id: req.inuser.citizenId,
      passport: req.inuser.passport,
      birthdate: req.inuser.birthdate,
      gender: req.inuser.gender,
      bank: req.inuser.bank ? req.inuser.bank.shortName : null,
      bank_branch: req.inuser.bankBranch,
      bank_account_number: req.inuser.bankAccountNumber,
      bank_account_name: req.inuser.bankAccountName,
      wallets: req.inuser.wallets.map((wallet) => ({
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
      status: req.inuser.status,
      created_at: dayjs
        .utc(req.inuser.createdAt)
        .tz(timezone)
        .format(dateFormat),
      updated_at: dayjs
        .utc(req.inuser.updatedAt)
        .tz(timezone)
        .format(dateFormat),
    };
    res.json(req.response);
    next();
  }
);

router.patch(
  "/:id",
  validate(inuserValidation.updateInuser),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INUSER,
    portalPermissionActionMaster.EDIT
  ),
  inuserController.findInuser("id", "param"),
  inuserController.updateInuser(),
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
