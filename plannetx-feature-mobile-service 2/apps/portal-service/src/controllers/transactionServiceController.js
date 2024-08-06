const axios = require("axios");
const { nanoid } = require("nanoid");

const auditLogMenuMaster = require("../constants/masters/auditLogMenuMaster");
const portalTypeMaster = require("../constants/masters/portalTypeMaster");
const userProxyMaster = require("../constants/masters/userProxyMaster");

const { ServiceError } = require("../helpers/error");

const TIMEZONE = process.env.TIMEZONE;
const DATEFORMAT = process.env.DATEFORMAT;
const SERVICE_TRANSACTION = process.env.SERVICE_TRANSACTION;

const instance = axios.create({
  baseURL: SERVICE_TRANSACTION,
  timeout: 30000,
});

instance.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response && err.response.status === 400) {
      const transactionServiceError = {
        status: 400,
        resCode: err.response.data.res_code,
        resDesc: err.response.data.res_desc,
      };
      return Promise.reject(new ServiceError(transactionServiceError));
    } else {
      return Promise.reject(err);
    }
  }
);

exports.findTransactions = () => (req, res, next) => {
  // const requestId = req.requestId
  // const partner = req.partner
  // const user = req.user

  // instance.request({
  //   method: 'GET',
  //   url: '/transaction',
  //   params: req.query,
  //   headers: {
  //     'x-request-id': requestId,
  //     'x-partner-id': partner ? partner.id : req.headers['x-partner-id'],
  //     'x-timezone': partner ? partner.timezone : TIMEZONE,
  //     'x-date-format': partner ? partner.dateFormat : DATEFORMAT,
  //     'x-email': user.email
  //   }
  // })
  //   .then(({ data }) => {
  //     req.total = data.total
  //     req.transactions = data.transactions
  //   })
  //   .then(() => next())
  //   .catch((err) => next(err))
  req.total = 0;
  req.transactions = [];
  next();
};

exports.findTransaction = () => (req, res, next) => {
  const requestId = req.requestId;
  const partner = req.partner;

  const id = req.params.id;

  const partnerId = partner ? partner.id : "";
  const timezone = partner ? partner.timezone : TIMEZONE;
  const dateFormat = partner ? partner.dateFormat : DATEFORMAT;

  instance
    .request({
      method: "GET",
      url: `/transaction/${id}`,
      headers: {
        "x-request-id": requestId,
        "x-partner-id": partnerId,
        "x-timezone": timezone,
        "x-date-format": dateFormat,
      },
    })
    .then(({ data }) => {
      req.response = data;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.inquiryTransaction = () => (req, res, next) => {
  const requestId = req.requestId;
  const partner = req.partner;

  const id = req.params.id;

  const partnerId = partner ? partner.id : req.headers["x-partner-id"];

  instance
    .request({
      method: "GET",
      url: `/transaction/${id}/inquiry`,
      headers: {
        "x-request-id": requestId,
        "x-partner-id": partnerId,
      },
    })
    .then(({ data }) => {
      req.response = data;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.approveTransaction = () => (req, res, next) => {
  const requestId = req.requestId;
  const partner = req.partner;

  const id = req.params.id;

  const partnerId = partner ? partner.id : req.headers["x-partner-id"];
  const timezone = partner ? partner.timezone : TIMEZONE;
  const dateFormat = partner ? partner.dateFormat : DATEFORMAT;

  instance
    .request({
      method: "PATCH",
      url: `/transaction/${id}/approve`,
      headers: {
        "x-request-id": requestId,
        "x-partner-id": partnerId,
        "x-timezone": timezone,
        "x-date-format": dateFormat,
      },
    })
    .then(({ data }) => {
      req.transaction = {
        approvalCode: data.approval_code,
        approvedAt: data.approved_at,
      };
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.voidTransaction = () => (req, res, next) => {
  const requestId = req.requestId;
  const partner = req.partner;
  const user = req.user;

  const id = req.params.id;
  const reason = req.body.reason;

  const partnerId = partner ? partner.id : req.headers["x-partner-id"];
  const timezone = partner ? partner.timezone : TIMEZONE;
  const dateFormat = partner ? partner.dateFormat : DATEFORMAT;

  instance
    .request({
      method: "PATCH",
      url: `/transaction/${id}/void`,
      headers: {
        "x-request-id": requestId,
        "x-partner-id": partnerId,
        "x-timezone": timezone,
        "x-date-format": dateFormat,
      },
      data: {
        operator_id: user.id,
        operator_name: `${user.firstnameEN} ${user.lastnameEN}`,
        reason,
      },
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.inquiryAdjustment = () => (req, res, next) => {
  const requestId = req.requestId;
  const user = req.user;
  const partner = req.partner;
  const payer = req.payer;
  const payee = req.payee;

  const { amount, remark } = req.body;

  let partnerId;
  if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
    partnerId = req.body.partner_id;
  } else {
    partnerId = partner.id;
  }

  instance
    .request({
      method: "POST",
      url: "/adjustment/inquiry",
      headers: {
        "x-request-id": requestId,
        "x-partner-id": partnerId,
      },
      data: {
        order_id: nanoid(),
        payer_proxy_type: userProxyMaster.WALLETID,
        payer_proxy_value: payer.wallets[0].walletId,
        payee_proxy_type: userProxyMaster.WALLETID,
        payee_proxy_value: payee.wallets[0].walletId,
        amount,
        remark,
      },
    })
    .then(({ data }) => {
      req.balanceBefore = data.balance_before;
      req.balanceAfter = data.balance_after;
      req.transaction = {
        orderId: data.order_id,
        referenceNo: data.reference_no,
        payerName: data.payer_name,
        payeeName: data.payee_name,
        total: data.total,
        currency: data.currency,
        remark: data.remark,
      };
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.confirmAdjustment = () => (req, res, next) => {
  const requestId = req.requestId;
  const partner = req.partner;
  const user = req.user;

  const { reference_no: referenceNo } = req.body;

  let partnerId;
  if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
    partnerId = req.body.partner_id;
  } else {
    partnerId = partner.id;
  }

  instance
    .request({
      method: "POST",
      url: "/adjustment/confirm",
      headers: {
        "x-request-id": requestId,
        "x-partner-id": partnerId,
      },
      data: { reference_no: referenceNo },
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findTransactionSettlementBatches = () => (req, res, next) => {
  const requestId = req.requestId;
  const partner = req.partner;

  instance
    .request({
      method: "GET",
      url: "/settlement/batch",
      headers: {
        "x-request-id": requestId,
        "x-partner-id": partner ? partner.id : req.headers["x-partner-id"],
        "x-timezone": partner ? partner.timezone : TIMEZONE,
        "x-date-format": partner ? partner.dateFormat : DATEFORMAT,
      },
      params: req.query,
    })
    .then(({ data }) => {
      req.total = data.total;
      req.batches = data.batches;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findTransactionSettlementBatch = () => (req, res, next) => {
  const requestId = req.requestId;
  const partner = req.partner;
  const user = req.user;

  const id = req.params.id;

  const timezone = partner ? partner.timezone : TIMEZONE;
  const dateFormat = partner ? partner.dateFormat : DATEFORMAT;

  instance
    .request({
      method: "GET",
      url: `/settlement/batch/${id}`,
      headers: {
        "x-request-id": requestId,
        "x-timezone": timezone,
        "x-date-format": dateFormat,
      },
      params: req.query,
    })
    .then(({ data }) => {
      req.batch = data.batch;

      req.audit = {
        partnerId: user.partnerId,
        menu: auditLogMenuMaster.SETTLEMENT,
        action: "PROCEED",
        sourceType: "PORTAL",
        sourceId: user.id,
        sourceName: `${user.firstnameEN} ${user.lastnameEN}`,
        destinationType: "SETTLEMENT",
        destinationId: req.batch.id,
        destinationName: req.batch.batchNo,
      };
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.settleTransactionSettlementBatch = () => (req, res, next) => {
  const requestId = req.requestId;
  const partner = req.partner;
  const user = req.user;

  const id = req.params.id;

  const timezone = partner ? partner.timezone : TIMEZONE;
  const dateFormat = partner ? partner.dateFormat : DATEFORMAT;

  instance
    .request({
      method: "PATCH",
      url: `/settlement/batch/${id}/settle`,
      headers: {
        "x-request-id": requestId,
        "x-timezone": timezone,
        "x-date-format": dateFormat,
      },
      params: req.query,
      data: {
        operator_id: user.id,
        operator_name: `${user.firstnameEN} ${user.lastnameEN}`,
      },
    })
    .then(({ data }) => {
      req.audit = {
        partnerId: user.partnerId,
        menu: auditLogMenuMaster.SETTLEMENT,
        action: "SETTLED",
        sourceType: "PORTAL",
        sourceId: user.id,
        sourceName: `${user.firstnameEN} ${user.lastnameEN}`,
        destinationType: "SETTLEMENT",
        destinationId: data.batch.id,
        destinationName: data.batch.batchNo,
      };
    })
    .then(() => next())
    .catch((err) => next(err));
};
