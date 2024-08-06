const Sequelize = require("sequelize");

const reportError = require("../constants/errors/reportError");

const portalTypeMaster = require("../constants/masters/portalTypeMaster");
const reportSubTypeMaster = require("../constants/masters/reportSubTypeMaster");
const reportTypeMaster = require("../constants/masters/reportTypeMaster");

const { ServiceError } = require("../helpers/error");

const masterReportSubTypeModel = require("../models/masterReportSubTypeModel");
const masterReportTypeModel = require("../models/masterReportTypeModel");
const partnerModel = require("../models/partnerModel");
const reportModel = require("../models/reportModel");

const Op = Sequelize.Op;

exports.findReports = () => (req, res, next) => {
  const user = req.user;

  const { "x-partner-id": partnerID } = req.headers;
  const {
    start_date: startDate,
    end_date: endDate,
    type,
    sub_type: subType,
    limit,
    offset,
  } = req.query;

  const query = {
    include: [
      {
        model: partnerModel,
        as: "partner",
        required: true,
      },
      {
        model: masterReportTypeModel,
        as: "type",
        required: true,
      },
      {
        model: masterReportSubTypeModel,
        as: "subType",
        required: true,
      },
    ],
    where: {},
    limit: limit ? Number(limit) : 10,
    offset: offset ? Number(offset) : 0,
    order: [
      ["createdAt", "DESC"],
      ["reportTypeId", "ASC"],
    ],
  };

  if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
    if (partnerID) {
      query.where.partnerId = partnerID;
    }
  } else {
    query.where.partnerId = user.partnerId;
  }

  if (startDate && endDate)
    query.where.date = { [Op.between]: [startDate, endDate] };
  if (type) query.where.reportTypeId = reportTypeMaster[type].id;
  if (subType) query.where.reportSubTypeId = reportSubTypeMaster[subType].id;

  reportModel
    .findAndCountAll(query)
    .then(({ count, rows }) => {
      req.total = count;
      req.reports = rows;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findReport = () => (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  const query = {
    attributes: ["key"],
    include: [
      {
        model: masterReportTypeModel,
        as: "type",
        required: true,
      },
    ],
    where: { id },
  };

  if (user.portalTypeId !== portalTypeMaster.DIGIO.id) {
    query.where.partnerId = user.partnerId;
  }

  reportModel
    .findOne(query)
    .then((report) => {
      if (!report) {
        throw new ServiceError(reportError.ERR_REPORT_NOT_FOUND);
      } else {
        req.report = report;
      }
    })
    .then(() => next())
    .catch((err) => next(err));
};
