const path = require("path");

const dayjs = require("dayjs");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const ejs = require("ejs");

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const httpError = require("../constants/errors/httpError");
const portalError = require("../constants/errors/portalError");

const auditLogMenuMaster = require("../constants/masters/auditLogMenuMaster");
const portalStatusMaster = require("../constants/masters/portalStatusMaster");

const nodemailer = require("../helpers/nodemailer");
const { HttpError, ServiceError } = require("../helpers/error");

const portalModel = require("../models/portalModel");
const portalResetPasswordTokenModel = require("../models/portalResetPasswordTokenModel");

const PORTAL = process.env.PORTAL;
const EMAIL_FROM = process.env.EMAIL_FROM;

exports.authenticate = () => (req, res, next) => {
  const excludeList = [
    "/",
    "/authen/login",
    "/authen/logout",
    "/authen/forgot",
    "/authen/reset-password",
  ];
  console.log(req.path);
  console.log(req.isAuthenticated());
  if (!excludeList.includes(req.path) && !req.isAuthenticated()) {
    next(new HttpError(httpError.ERR_HTTP_401));
  } else {
    next();
  }
};

exports.findPortal = () => (req, res, next) => {
  const { email } = req.body;
  const query = {
    where: { email },
  };
  portalModel
    .findOne(query)
    .then((portal) => {
      if (!portal) {
        throw new ServiceError(portalError.ERR_PORTAL_NOT_FOUND);
      } else {
        req.portal = portal;
      }
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.sendResetPasswordToken = () => (req, res, next) => {
  const portal = req.portal;
  const resetPasswordToken = {
    portalId: portal.id,
    token: nanoid(64),
    expiredAt: dayjs.utc().add(7, "days").format(),
  };

  req.audit = {
    partnerId: portal.partnerId,
    menu: auditLogMenuMaster.AUTHEN,
    action: "FORGOT_PASSWORD",
    sourceType: "PORTAL",
    sourceId: portal.id,
    sourceName: `${portal.firstnameEN} ${portal.lastnameEN}`,
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
            title: "Reset Password",
            detail:
              "You are receiving this email because we received a password request for your account.",
            link: `${PORTAL}/reset-password?token=${resetPasswordToken.token}`,
            label: "RESET PASSWORD",
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
        to: portal.email,
        subject: "Reset Password Email",
        html,
      });
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findResetPasswordToken = () => (req, res, next) => {
  const { token } = req.query;
  const query = {
    include: [
      {
        model: portalModel,
        as: "portal",
        required: true,
      },
    ],
    where: { token },
  };
  portalResetPasswordTokenModel
    .findOne(query)
    .then((portalResetPasswordToken) => {
      if (!portalResetPasswordToken) {
        throw new ServiceError(
          portalError.ERR_PORTAL_RESET_PASSWORD_TOKEN_NOT_FOUND
        );
      } else {
        if (
          dayjs.utc().isAfter(dayjs.utc(portalResetPasswordToken.expiredAt))
        ) {
          throw new ServiceError(
            portalError.ERR_PORTAL_RESET_PASSWORD_TOKEN_EXPIRED
          );
        } else {
          req.portal = portalResetPasswordToken.portal;
        }
      }
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.resetPassword = () => (req, res, next) => {
  const portal = req.portal;
  const { token } = req.query;
  const { password } = req.body;

  switch (portal.status) {
    case portalStatusMaster.SUSPEND:
      return next(new ServiceError(portalError.ERR_PORTAL_SUSPENDED));
  }

  req.audit = {
    partnerId: portal.partnerId,
    menu: auditLogMenuMaster.AUTHEN,
    action: "RESET_PASSWORD",
    sourceType: "PORTAL",
    sourceId: portal.id,
    sourceName: `${portal.firstnameEN} ${portal.lastnameEN}`,
  };

  portal
    .update({
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      status: portalStatusMaster.VERIFIED,
    })
    .then(() => portalResetPasswordTokenModel.destroy({ where: { token } }))
    .then(() => next())
    .catch((err) => next(err));
};
