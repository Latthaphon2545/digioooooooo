const express = require("express");
const { validate } = require("express-validation");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster");

const partnerController = require("../controllers/partnerController");
const auditLogController = require("../controllers/auditLogController");
const portalController = require("../controllers/portalController");

const auditLogValidation = require("../validations/auditLogValidation");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;

const router = express.Router();

router.get(
  "/",
  validate(auditLogValidation.findAuditLogs),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.AUDIT_LOG,
    portalPermissionActionMaster.LIST
  ),
  auditLogController.findAuditLogs(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;

    req.response = {
      res_code: "0000",
      res_desc: "",
      total: req.total,
      audit_logs: req.auditLogs.map((auditLog) => ({
        partner_id: auditLog.partner ? auditLog.partner.id : null,
        partner_name: auditLog.partner ? auditLog.partner.name : null,
        menu: auditLog.menu,
        action: auditLog.action,
        source_type: auditLog.sourceType,
        source_id: auditLog.sourceId,
        source_name: auditLog.sourceName,
        destination_type: auditLog.destinationType,
        destination_id: auditLog.destinationId,
        destination_name: auditLog.destinationName,
        detail: auditLog.detail,
        created_at: dayjs
          .utc(auditLog.createdAt)
          .tz(timezone)
          .format(dateFormat),
      })),
    };
    res.json(req.response);
    next();
  }
);

module.exports = router;
