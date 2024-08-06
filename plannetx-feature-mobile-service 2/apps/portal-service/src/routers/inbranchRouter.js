const express = require("express");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster");

const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");
const inbranchController = require("../controllers/inbranchController");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;

const router = express.Router();

router.get(
  "/",
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.INBRANCH,
    portalPermissionActionMaster.LIST
  ),
  inbranchController.findInbranches(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;

    req.response = {
      res_code: "0000",
      res_desc: "",
      total: req.total,
      inbranches: req.branches.map((inbranch) => ({
        id: inbranch.id,
        name_en: inbranch.nameEN,
        name_th: inbranch.nameTH,
        biller_id: inbranch.billerId,
        created_at: dayjs
          .utc(inbranch.createdAt)
          .tz(timezone)
          .format(dateFormat),
        updated_at: dayjs
          .utc(inbranch.updatedAt)
          .tz(timezone)
          .format(dateFormat),
      })),
    };
    res.json(req.response);
    next();
  }
);

module.exports = router;
