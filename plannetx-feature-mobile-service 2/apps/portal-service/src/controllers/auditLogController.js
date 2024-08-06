const Sequelize = require("sequelize");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const portalTypeMaster = require("../constants/masters/portalTypeMaster");

const auditLogModel = require("../models/auditLogModel");
const partnerModel = require("../models/partnerModel");

const TIMEZONE = process.env.TIMEZONE;

const Op = Sequelize.Op;

exports.createSuccessAuditLog = () => (req, res, next) => {
  const audit = req.audit;

  if (!audit) {
    next();
  } else {
    const auditLog = { ...audit };
    auditLogModel
      .create(auditLog)
      .then(() => next())
      .catch((err) => next(err));
  }
};

exports.createFailureAuditLog = () => (err, req, res, next) => {
  console.error(err);
  const audit = req.audit;

  if (!audit) {
    next(err);
  } else {
    const auditLog = {
      ...audit,
      detail: JSON.stringify(err.toJSON ? err.toJSON() : err.message),
    };
    auditLogModel
      .create(auditLog)
      .then(() => next(err))
      .catch((err) => next(err));
  }
};

exports.findAuditLogs = () => (req, res, next) => {
  const partner = req.partner;
  const user = req.user;

  const { "x-partner-id": partnerID } = req.headers;
  const {
    menu,
    q,
    start_date: startDate,
    end_date: endDate,
    limit,
    offset,
  } = req.query;

  const timezone = partner ? partner.timezone : TIMEZONE;

  const query = {
    include: [
      {
        model: partnerModel,
        as: "partner",
        required: false,
      },
    ],
    where: {},
    limit: limit ? Number(limit) : 10,
    offset: offset ? Number(offset) : 0,
    order: [["createdAt", "DESC"]],
  };

  if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
    if (partnerID) {
      query.where.partnerId = partnerID;
    }
  } else {
    query.where.partnerId = user.partnerId;
  }

  if (menu) query.where.menu = menu;
  if (q) {
    query.where[Op.or] = [
      { sourceId: q },
      { destinationId: q },
      { sourceName: { [Op.like]: `%${q}%` } },
      { destinationName: { [Op.like]: `%${q}%` } },
    ];
  }
  if (startDate && endDate) {
    query.where.updatedAt = {
      [Op.between]: [
        dayjs.tz(startDate, timezone).startOf("day").utc().format(),
        dayjs.tz(endDate, timezone).endOf("day").utc().format(),
      ],
    };
  }

  auditLogModel
    .findAndCountAll(query)
    .then(({ count, rows }) => {
      req.total = count;
      req.auditLogs = rows;
    })
    .then(() => next())
    .catch((err) => next(err));
};
