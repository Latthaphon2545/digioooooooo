const path = require("path");

const Sequelize = require("sequelize");
const { nanoid } = require("nanoid");
const ejs = require("ejs");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const inportalError = require("../constants/errors/inportalError");

const auditLogMenuMaster = require("../constants/masters/auditLogMenuMaster");
const portalStatusMaster = require("../constants/masters/portalStatusMaster");
const portalTypeMaster = require("../constants/masters/portalTypeMaster");
const portalSubTypeMaster = require("../constants/masters/portalSubTypeMaster");

const diff = require("../helpers/diff");
const nodemailer = require("../helpers/nodemailer");
const { ServiceError } = require("../helpers/error");

const masterPortalSubTypeModel = require("../models/masterPortalSubTypeModel");
const masterPortalTypeModel = require("../models/masterPortalTypeModel");
const partnerModel = require("../models/partnerModel");
const portalModel = require("../models/portalModel");
const portalResetPasswordTokenModel = require("../models/portalResetPasswordTokenModel");

const PORTAL = process.env.PORTAL;
const EMAIL_FROM = process.env.EMAIL_FROM;

const Op = Sequelize.Op;

exports.findInportals = () => (req, res, next) => {
  const user = req.user;

  const { "x-partner-id": partnerID } = req.headers;
  const { q, sub_type: subType, status, limit, offset } = req.query;

  const query = {
    include: [
      {
        model: partnerModel,
        as: "partner",
        required: false,
      },
      {
        model: masterPortalTypeModel,
        as: "type",
        required: true,
      },
      {
        model: masterPortalSubTypeModel,
        as: "subType",
        required: true,
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

  if (q) {
    query.where[Op.or] = [
      Sequelize.literal(`concat(firstnameTH, ' ', lastnameTH) LIKE '%${q}%'`),
      Sequelize.literal(`concat(firstnameEN, ' ', lastnameEN) LIKE '%${q}%'`),
      { phoneNo: { [Op.like]: `%${q}%` } },
      { email: { [Op.like]: `%${q}%` } },
    ];
  }
  if (subType) query.where.portalSubTypeId = portalSubTypeMaster[subType].id;
  if (status) query.where.status = status;

  portalModel
    .findAndCountAll(query)
    .then(({ count, rows }) => {
      req.total = count;
      req.inportals = rows;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findInportal = () => (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  const query = {
    include: [
      {
        model: masterPortalTypeModel,
        as: "type",
        required: true,
      },
      {
        model: masterPortalSubTypeModel,
        as: "subType",
        required: true,
      },
    ],
    where: { id },
  };

  if (user.portalTypeId !== portalTypeMaster.DIGIO.id) {
    query.where.partnerId = user.partnerId;
  }

  portalModel
    .findOne(query)
    .then((inportal) => {
      req.inportal = inportal;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.createInportal = () => (req, res, next) => {
  const user = req.user;

  const {
    username,
    firstname_th: firstnameTH,
    lastname_th: lastnameTH,
    firstname_en: firstnameEN,
    lastname_en: lastnameEN,
    email,
    phone_no: phoneNo,
    sub_type: subType,
  } = req.body;

  const partnerId = user.partnerId;
  const portalTypeId = user.portalTypeId;
  const portalSubTypeId = portalSubTypeMaster[subType].id;
  const status = portalStatusMaster.UNVERIFIED;

  const inportal = {
    partnerId,
    portalTypeId,
    portalSubTypeId,
    username,
    firstnameTH,
    lastnameTH,
    firstnameEN,
    lastnameEN,
    email,
    phoneNo,
    status,
  };

  portalModel
    .create(inportal)
    .then((inportal) => {
      req.audit = {
        partnerId: user.partnerId,
        menu: auditLogMenuMaster.INPORTAL,
        action: "CREATE",
        sourceType: "PORTAL",
        sourceId: user.id,
        sourceName: `${user.firstnameEN} ${user.lastnameEN}`,
        destinationType: "PORTAL",
        destinationId: inportal.id,
        destinationName: `${inportal.firstnameEN} ${inportal.lastnameEN}`,
      };
      req.inportal = inportal;
    })
    .then(() => next())
    .catch((err) => {
      if (err.errors) {
        const error = err.errors[0];
        if (
          error.type === "unique violation" &&
          error.path === "uq_portal_username"
        ) {
          next(new ServiceError(inportalError.ERR_INPORTAL_USERNAME_DUPLICATE));
        } else if (
          error.type === "unique violation" &&
          error.path === "uq_portal_email"
        ) {
          next(new ServiceError(inportalError.ERR_INPORTAL_EMAIL_DUPLICATE));
        } else {
          next(err);
        }
      } else {
        next(err);
      }
    });
};

exports.sendActivateEmail = () => (req, res, next) => {
  const inportal = req.inportal;

  switch (inportal.status) {
    case portalStatusMaster.VERIFIED:
      return next(
        new ServiceError(inportalError.ERR_INPORTAL_ALREADY_VERIFIRED)
      );
    case portalStatusMaster.SUSPENDED:
      return next(new ServiceError(inportalError.ERR_INPORTAL_SUSPENDED));
  }

  const resetPasswordToken = {
    portalId: inportal.id,
    token: nanoid(64),
    expiredAt: dayjs.utc().add(7, "days").format(),
  };

  portalResetPasswordTokenModel
    .upsert(resetPasswordToken)
    .then(() => {
      return new Promise((resolve, reject) => {
        ejs.renderFile(
          path.join(
            __dirname,
            "..",
            "..",
            "templates",
            "resetPasswordEmail.ejs"
          ),
          {
            logo: `${PORTAL}/logo.png`,
            title: "Activate Account",
            detail: `A new Whalepay staff was created with ${inportal.email}, Please activate your account.`,
            link: `${PORTAL}/reset-password?token=${resetPasswordToken.token}`,
            label: "ACTIVATE",
          },
          (err, str) => {
            if (err) reject(err);
            else resolve(str);
          }
        );
      });
    })
    .then((html) => {
      nodemailer.sendMail({
        from: EMAIL_FROM,
        to: inportal.email,
        subject: "Activate",
        html,
      });
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.updateInportal = () => (req, res, next) => {
  const user = req.user;
  const inportal = req.inportal;

  const {
    sub_type: subType,
    email,
    firstname_en: firstnameEN,
    lastname_en: lastnameEN,
    firstname_th: firstnameTH,
    lastname_th: lastnameTH,
    phone_no: phoneNo,
    status,
  } = req.body;

  if (user.id === inportal.id) {
    next(
      new ServiceError(inportalError.ERR_INPORTAL_UNABLE_TO_UPDATE_YOURSELF)
    );
  } else {
    const update = {};
    if (subType) update.portalSubTypeId = portalSubTypeMaster[subType].id;
    if (firstnameEN) update.firstnameEN = firstnameEN;
    if (lastnameEN) update.lastnameEN = lastnameEN;
    if (firstnameTH) update.firstnameTH = firstnameTH;
    if (lastnameTH) update.lastnameTH = lastnameTH;
    if (phoneNo) update.phoneNo = phoneNo;
    if (email) update.email = email;
    if (status) update.status = status;

    req.audit = {
      partnerId: user.partnerId,
      menu: auditLogMenuMaster.INPORTAL,
      action: "UPDATE",
      sourceType: "PORTAL",
      sourceId: user.id,
      sourceName: `${user.firstnameEN} ${user.lastnameEN}`,
      destinationType: "PORTAL",
      destinationId: inportal.id,
      destinationName: `${inportal.firstnameEN} ${inportal.lastnameEN}`,
      detail: JSON.stringify(diff.diffJson(inportal, update)),
    };

    inportal
      .update(update)
      .then(() => next())
      .catch((err) => next(err));
  }
};
