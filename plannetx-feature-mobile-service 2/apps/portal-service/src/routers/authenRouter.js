const express = require("express");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const authenController = require("../controllers/authenController");
const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");

const passport = require("../helpers/passport");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { failWithError: true }),
  partnerController.findPartner(),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
    };
    res.json(req.response);
    next();
  }
);

router.get("/logout", (req, res, next) => {
  req.response = {
    res_code: "0000",
    res_desc: "",
  };
  req.logout();
  res.json(req.response);
  next();
});

router.get(
  "/profile",
  partnerController.findPartner(),
  partnerController.findPartnerLogo("horizontal"),
  portalController.findPortalPermissions(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;
    req.response = {
      res_code: "0000",
      res_desc: "",
      id: req.user.id,
      partner_id: req.partner ? req.partner.id : null,
      partner_logo: req.partner ? req.partner.logo : null,
      partner_name: req.partner ? req.partner.name : null,
      partner_theme: req.partner ? req.partner.theme : "default",
      type: req.user.type.name,
      sub_type: req.user.subType.name,
      firstname_en: req.user.firstnameEN,
      lastname_en: req.user.lastnameEN,
      firstname_th: req.user.firstnameTH,
      lastname_th: req.user.lastnameTH,
      email: req.user.email,
      recent_login: req.user.recentLogin
        ? dayjs.utc(req.user.recentLogin).tz(timezone).format(dateFormat)
        : null,
      last_login: req.user.lastLogin
        ? dayjs.utc(req.user.lastLogin).tz(timezone).format(dateFormat)
        : null,
      permissions: req.permissions,
    };
    res.json(req.response);
    next();
  }
);

router.post(
  "/forgot",
  authenController.findPortal(),
  authenController.sendResetPasswordToken(),
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
  "/reset-password",
  authenController.findResetPasswordToken(),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
      username: req.portal.username,
    };
    res.json(req.response);
    next();
  }
);

router.post(
  "/reset-password",
  authenController.findResetPasswordToken(),
  authenController.resetPassword(),
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
