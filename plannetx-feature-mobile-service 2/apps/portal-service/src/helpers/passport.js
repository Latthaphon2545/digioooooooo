const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

dayjs.extend(require("dayjs/plugin/utc"));

const httpError = require("../constants/errors/httpError");
const portalError = require("../constants/errors/portalError");

const auditLogMenuMaster = require("../constants/masters/auditLogMenuMaster");
const portalStatusMaster = require("../constants/masters/portalStatusMaster");

const redis = require("../helpers/redis");
const { HttpError, ServiceError } = require("../helpers/error");

const masterPortalSubTypeModel = require("../models/masterPortalSubTypeModel");
const masterPortalTypeModel = require("../models/masterPortalTypeModel");
const portalModel = require("../models/portalModel");

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      console.log(username);
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
        where: { username },
      };
      try {
        const portal = await portalModel.findOne(query);
        console.log(portal.dataValues);
        if (!portal) {
          throw new ServiceError(portalError.ERR_PORTAL_NOT_FOUND);
        } else {
          switch (portal.status) {
            case portalStatusMaster.UNVERIFIED:
              throw new ServiceError(portalError.ERR_PORTAL_UNVERIFIED);
            case portalStatusMaster.SUSPENDED:
              throw new ServiceError(portalError.ERR_PORTAL_SUSPENDED);
          }

          if (!bcrypt.compareSync(password, portal.password)) {
            throw new ServiceError(portalError.ERR_PORTAL_INCORRECT_PASSWORD);
          } else {
            redis.set(`wpusr:${portal.id}`, req.sessionID);
            await portal.update({
              recentLogin: dayjs.utc().format(),
              lastLogin: portal.recentLogin,
            });
            done(null, portal);
          }
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((req, portal, done) => {
  console.log(portal);
  req.audit = {
    partnerId: portal.partnerId,
    menu: auditLogMenuMaster.AUTHEN,
    action: "LOGIN",
    sourceType: "PORTAL",
    sourceId: portal.id,
    sourceName: `${portal.firstnameEN} ${portal.lastnameEN}`,
  };
  done(null, portal.id);
});

passport.deserializeUser((req, id, done) => {
  redis.get(`wpusr:${id}`, async (err, reply) => {
    if (err) done(err);
    else {
      console.log(reply);
      console.log("sessionID sessionID sessionID", req.sessionID);
      console.log(reply);
      if (reply !== req.sessionID) {
        req.logout();
        done(new HttpError(httpError.ERR_HTTP_401));
      } else {
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
        try {
          const portal = await portalModel.findOne(query);
          if (!portal) {
            throw new ServiceError(portalError.ERR_USER_NOT_FOUND);
          } else {
            switch (portal.status) {
              case portalStatusMaster.UNVERIFIED:
                throw new ServiceError(portalError.ERR_PORTAL_UNVERIFIED);
              case portalStatusMaster.SUSPENDED:
                throw new ServiceError(portalError.ERR_PORTAL_SUSPENDED);
            }
            done(null, portal);
          }
        } catch (err) {
          req.session.destroy(() => done(err));
        }
      }
    }
  });
});

module.exports = passport;
