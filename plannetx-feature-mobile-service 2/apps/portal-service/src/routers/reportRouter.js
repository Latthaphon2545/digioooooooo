const express = require("express");
const { validate } = require("express-validation");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster");

const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");
const reportController = require("../controllers/reportController");

const s3 = require("../helpers/s3");

const reportValidation = require("../validations/reportValidation");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

const router = express.Router();

router.get(
  "/",
  validate(reportValidation.findReports),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.REPORT,
    portalPermissionActionMaster.LIST
  ),
  reportController.findReports(),
  (req, res, next) => {
    const timezone = req.partner ? req.partner.timezone : TIMEZONE;
    const dateFormat = req.partner ? req.partner.dateFormat : DATEFORMAT;
    req.response = {
      res_code: "0000",
      res_desc: "",
      total: req.total,
      reports: req.reports.map((report) => ({
        id: report.id,
        partner_id: report.partner.id,
        partner_name: report.partner.name,
        type: report.type.name,
        sub_type: report.subType.name,
        date: report.date,
        name: report.name,
        key: report.key,
        created_at: dayjs.utc(report.createdAt).tz(timezone).format(dateFormat),
      })),
    };
    res.json(req.response);
    next();
  }
);

router.get(
  "/:id",
  validate(reportValidation.findReport),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.REPORT,
    portalPermissionActionMaster.EXPORT
  ),
  reportController.findReport(),
  (req, res, next) => {
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: req.report.key,
    };
    s3.headObject(params, (err, data) => {
      if (err) next(err);
      else {
        const stream = s3.getObject(params).createReadStream();
        stream.on("error", (err) => next(err));

        res.set("Content-Length", data.ContentLength);
        res.set("Last-Modified", data.LastModified);
        res.set("ETag", data.ETag);

        stream.on("end", () => next());
        stream.pipe(res);
      }
    });
  }
);

module.exports = router;
