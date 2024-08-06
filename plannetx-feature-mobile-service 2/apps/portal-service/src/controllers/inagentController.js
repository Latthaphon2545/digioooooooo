const Sequelize = require("sequelize");

const inagentError = require("../constants/errors/inagentError.json");
const inuserError = require("../constants/errors/inuserError.json");

const auditLogMenuMaster = require("../constants/masters/auditLogMenuMaster.json");
const portalTypeMaster = require("../constants/masters/portalTypeMaster.json");
const agentStatusMaster = require("../constants/masters/agentStatusMaster.json");
const userTypeMaster = require("../constants/masters/userTypeMaster.json");

const { ServiceError } = require("../helpers/error");

const agentModel = require("../models/agentModel");
const partnerModel = require("../models/partnerModel");
const branchModel = require("../models/branchModel");
const userModel = require("../models/userModel");
const walletModel = require("../models/walletModel");
const masterWalletTypeModel = require("../models/masterWalletTypeModel");

const Op = Sequelize.Op;

exports.createInagent = () => (req, res, next) => {
  const user = req.user;
  const t = req.t;
  const inuser = req.inuser;

  const { "x-partner-id": partnerId } = req.headers;
  const {
    firstname_en: firstnameEN,
    lastname_en: lastnameEN,
    branch_id: branchId,
  } = req.body;

  agentModel
    .create(
      {
        partnerId:
          user.portalTypeId === portalTypeMaster.DIGIO.id
            ? partnerId
            : user.partnerId,
        branchId,
        userId: inuser.id,
        status: agentStatusMaster.UNVERIFIED,
      },
      { transaction: t }
    )
    .then((inagent) => {
      req.audit = {
        partnerId: user.partnerId,
        menu: auditLogMenuMaster.INAGENT,
        action: "CREATE",
        sourceType: "PORTAL",
        sourceId: user.id,
        sourceName: `${user.firstnameEN} ${user.lastnameEN}`,
        destinationType: "AGENT",
        destinationId: inagent.id,
        destinationName: `${firstnameEN} ${lastnameEN}`,
      };
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findInagents = () => (req, res, next) => {
  const user = req.user;

  const { "x-partner-id": partnerID } = req.headers;
  const { q, branch_id: branchId, status, limit, offset } = req.query;

  const query = {
    include: [
      {
        model: partnerModel,
        as: "partner",
        required: true,
      },
      {
        model: branchModel,
        as: "branch",
        required: true,
      },
      {
        model: userModel,
        as: "user",
        where: {},
        required: true,
      },
    ],
    where: {},
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
    const userIndex = query.include.findIndex(
      (include) => include.model === userModel
    );
    query.include[userIndex].where[Op.or] = [
      { username: { [Op.like]: `%${q}%` } },
      { firstnameTH: { [Op.like]: `%${q}%` } },
      { firstnameEN: { [Op.like]: `%${q}%` } },
      Sequelize.literal(`concat(firstnameTH, ' ', lastnameTH) LIKE '%${q}%'`),
      Sequelize.literal(`concat(firstnameEN, ' ', lastnameEN) LIKE '%${q}%'`),
      { phoneNo: { [Op.like]: `%${q}%` } },
      { email: { [Op.like]: `%${q}%` } },
      { citizenId: { [Op.like]: `%${q}%` } },
      { passport: { [Op.like]: `%${q}%` } },
    ];
  }
  if (branchId) query.where.branchId = branchId;
  if (status) query.where.status = status;
  if (limit) query.limit = Number(limit);
  if (offset) query.offset = Number(offset);

  agentModel
    .findAndCountAll(query)
    .then(({ count, rows }) => {
      req.total = count;
      req.inagents = rows;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findInagent = () => (req, res, next) => {
  const partner = req.partner;
  const user = req.user;

  const { id } = req.params;
  const query = {
    include: [
      {
        model: partnerModel,
        as: "partner",
        required: true,
      },
      {
        model: branchModel,
        as: "branch",
        required: true,
      },
      {
        model: userModel,
        as: "user",
        include: [
          {
            model: walletModel,
            as: "wallets",
            include: [
              {
                model: masterWalletTypeModel,
                as: "type",
                required: true,
              },
            ],
            required: true,
          },
        ],
        required: true,
      },
    ],
    where: {
      id,
    },
  };

  if (user.portalTypeId !== portalTypeMaster.DIGIO.id) {
    query.where.partnerId = partner.id;
  }

  agentModel
    .findOne(query)
    .then((inagent) => {
      if (!inagent) {
        throw new ServiceError(inagentError.ERR_INAGENT_NOT_FOUND);
      } else {
        req.inagent = inagent;
      }
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.updateInagent = () => (req, res, next) => {
  const inagent = req.inagent;
  const t = req.t;

  const {
    firstname_en: firstnameEN,
    lastname_en: lastnameEN,
    firstname_th: firstnameTH,
    lastname_th: lastnameTH,
    citizen_id: citizenId,
    passport,
    phone_no: phoneNo,
    email,
    status,
  } = req.body;

  const update = {};
  if (firstnameEN) update.firstnameEN = firstnameEN;
  if (lastnameEN) update.lastnameEN = lastnameEN;
  if (firstnameTH) update.firstnameTH = firstnameTH;
  if (lastnameTH) update.lastnameTH = lastnameTH;
  if (citizenId) update.citizenId = citizenId;
  if (passport) update.passport = passport;
  if (phoneNo) update.phoneNo = phoneNo;
  if (email) update.email = email;
  if (status) update.status = status;

  userModel
    .findOne({
      where: {
        id: { [Op.ne]: inagent.userId },
        partnerId: inagent.partnerId,
        userTypeId: userTypeMaster.AGENT.id,
        [Op.or]: [
          ...(citizenId ? [{ citizenId }] : []),
          ...(passport ? [{ passport }] : []),
        ],
      },
      transaction: t,
    })
    .then((inuser) => {
      if (inuser) {
        throw new ServiceError(inuserError.ERR_INUSER_DUPLICATE);
      } else {
        return userModel.update(update, {
          where: { id: inagent.userId },
          transaction: t,
        });
      }
    })
    .then(() => {
      if (status) {
        return inagent.update({ status }, { transaction: t });
      }
    })
    .then(() => next())
    .catch((err) => next(err));
};
