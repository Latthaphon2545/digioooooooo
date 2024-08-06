const express = require("express");
const { validate } = require("express-validation");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster");

const inportalController = require("../controllers/inportalController");
const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");

const inportalValidation = require("../validations/inportalValidation");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;

const router = express.Router();

router.post(
  "/",
  validate(inportalValidation.createInportal),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INPORTAL,
    portalPermissionActionMaster.CREATE
  ),
  inportalController.createInportal(),
  inportalController.sendActivateEmail(),
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
  validate(inportalValidation.findInportals),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INPORTAL,
    portalPermissionActionMaster.LIST
  ),
  inportalController.findInportals(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;
    req.response = {
      res_code: "0000",
      res_desc: "",
      total: req.total,
      inportals: req.inportals.map((inportal) => ({
        id: inportal.id,
        partner_id: inportal.partner ? inportal.partner.id : null,
        partner_name: inportal.partner ? inportal.partner.name : null,
        type: inportal.type.name,
        sub_type: inportal.subType.name,
        firstname_en: inportal.firstnameEN,
        lastname_en: inportal.lastnameEN,
        firstname_th: inportal.firstnameTH,
        lastname_th: inportal.lastnameTH,
        username: inportal.username,
        status: inportal.status,
        recent_login: inportal.recentLogin
          ? dayjs.utc(inportal.recentLogin).tz(timezone).format(dateFormat)
          : null,
        last_login: inportal.lastLogin
          ? dayjs.utc(inportal.lastLogin).tz(timezone).format(dateFormat)
          : null,
      })),
    };
    res.json(req.response);
    next();
  }
);

router.get(
  "/:id",
  validate(inportalValidation.findInportal),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INPORTAL,
    portalPermissionActionMaster.DETAIL
  ),
  inportalController.findInportal(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;
    req.response = {
      res_code: "0000",
      res_desc: "",
      id: req.inportal.id,
      type: req.inportal.type.name,
      sub_type: req.inportal.subType.name,
      firstname_en: req.inportal.firstnameEN,
      lastname_en: req.inportal.lastnameEN,
      firstname_th: req.inportal.firstnameTH,
      lastname_th: req.inportal.lastnameTH,
      username: req.inportal.username,
      email: req.inportal.email,
      phone_no: req.inportal.phoneNo,
      status: req.inportal.status,
      recent_login: req.inportal.recentLogin
        ? dayjs.utc(req.inportal.recentLogin).tz(timezone).format(dateFormat)
        : null,
      last_login: req.inportal.lastLogin
        ? dayjs.utc(req.inportal.lastLogin).tz(timezone).format(dateFormat)
        : null,
      created_at: dayjs
        .utc(req.inportal.createdAt)
        .tz(timezone)
        .format(dateFormat),
      updated_at: dayjs
        .utc(req.inportal.updatedAt)
        .tz(timezone)
        .format(dateFormat),
    };
    res.json(req.response);
    next();
  }
);

router.patch(
  "/:id",
  validate(inportalValidation.updateInportal),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INPORTAL,
    portalPermissionActionMaster.EDIT
  ),
  inportalController.findInportal(),
  inportalController.updateInportal(),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
    };
    res.json(req.response);
    next();
  }
);

router.post(
  "/:id/resend-activate",
  validate(inportalValidation.resendActivateEmail),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INPORTAL,
    portalPermissionActionMaster.EDIT
  ),
  inportalController.findInportal(),
  inportalController.sendActivateEmail(),
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
