const express = require("express");
const { validate } = require("express-validation");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster");

const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");
const transactionServiceController = require("../controllers/transactionServiceController");

const transactionValidation = require("../validations/transactionValidation");

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

const router = express.Router();

const s3 = require("../helpers/s3");

router.get(
  "/",
  validate(transactionValidation.findTransactions),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.TRANSACTION,
    portalPermissionActionMaster.LIST
  ),
  transactionServiceController.findTransactions(),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
      total: req.total,
      transactions: req.transactions,
    };
    res.json(req.response);
    next();
  }
);

router.get(
  "/:id",
  validate(transactionValidation.findTransaction),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.TRANSACTION,
    portalPermissionActionMaster.DETAIL
  ),
  transactionServiceController.findTransaction(),
  (req, res, next) => {
    res.json(req.response);
    next();
  }
);

router.get(
  "/:id/inquiry",
  validate(transactionValidation.inquiryTransaction),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.TRANSACTION,
    portalPermissionActionMaster.DETAIL
  ),
  transactionServiceController.inquiryTransaction(),
  (req, res, next) => {
    res.json(req.response);
    next();
  }
);

router.patch(
  "/:id/approve",
  validate(transactionValidation.approveTransaction),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.TRANSACTION,
    portalPermissionActionMaster.EDIT
  ),
  transactionServiceController.approveTransaction(),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
      approval_code: req.transaction.approvalCode,
      approved_at: req.transaction.approvedAt,
    };
    res.json(req.response);
    next();
  }
);

router.patch(
  "/:id/void",
  validate(transactionValidation.voidTransaction),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.TRANSACTION,
    portalPermissionActionMaster.EDIT
  ),
  transactionServiceController.voidTransaction(),
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
  "/settlement/batch",
  validate(transactionValidation.findTransactionSettlementBatches),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.SETTLEMENT,
    portalPermissionActionMaster.LIST
  ),
  transactionServiceController.findTransactionSettlementBatches(),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
      total: req.total,
      batches: req.batches,
    };
    res.json(req.response);
    next();
  }
);

router.get(
  "/settlement/batch/:id",
  validate(transactionValidation.findTransactionSettlementBatch),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.SETTLEMENT,
    portalPermissionActionMaster.EXPORT
  ),
  transactionServiceController.findTransactionSettlementBatch(),
  (req, res, next) => {
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: req.batch.key,
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

router.patch(
  "/settlement/batch/:id/settled",
  validate(transactionValidation.settledTransactionSettlementBatch),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.SETTLEMENT,
    portalPermissionActionMaster.EDIT
  ),
  transactionServiceController.settleTransactionSettlementBatch(),
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
