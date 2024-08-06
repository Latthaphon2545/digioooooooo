const express = require("express");
const { validate } = require("express-validation");

const portalPermissionActionMaster = require("../constants/masters/portalPermissionActionMaster");
const portalPermissionMaster = require("../constants/masters/portalPermissionMaster");

const inuserController = require("../controllers/inuserController");
const partnerController = require("../controllers/partnerController");
const portalController = require("../controllers/portalController");
const transactionServiceController = require("../controllers/transactionServiceController");

const adjustmentValidation = require("../validations/adjustmentValidation");

const router = express.Router();

router.post(
  "/inquiry",
  validate(adjustmentValidation.inquiryAdjustment),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.ADJUSTMENT,
    portalPermissionActionMaster.CREATE
  ),
  inuserController.findInuser("payer", "body", "payer"),
  inuserController.findInuser("payee", "body", "payee"),
  transactionServiceController.inquiryAdjustment(),
  (req, res, next) => {
    req.response = {
      res_code: "0000",
      res_desc: "",
      balance_before: req.balanceBefore,
      balance_after: req.balanceAfter,
      order_id: req.transaction.orderId,
      reference_no: req.transaction.referenceNo,
      payer_name: req.transaction.payerName,
      payee_name: req.transaction.payeeName,
      total: req.transaction.total,
      currency: req.transaction.currency,
      remark: req.transaction.remark,
    };
    res.json(req.response);
    next();
  }
);

router.post(
  "/confirm",
  validate(adjustmentValidation.confirmAdjustment),
  partnerController.findPartner(),
  portalController.findPortalPermissions(),
  portalController.validatePortalPermission(
    portalPermissionMaster.ADJUSTMENT,
    portalPermissionActionMaster.CREATE
  ),
  transactionServiceController.confirmAdjustment(),
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
