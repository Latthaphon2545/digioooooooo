const Sequelize = require("sequelize");

const inmerchantError = require("../constants/errors/inmerchantError.json");
const inuserError = require("../constants/errors/inuserError.json");
const inagentError = require("../constants/errors/inagentError.json");

const auditLogMenuMaster = require("../constants/masters/auditLogMenuMaster.json");
const portalTypeMaster = require("../constants/masters/portalTypeMaster.json");
const merchantStatusMaster = require("../constants/masters/merchantStatusMaster.json");
const userTypeMaster = require("../constants/masters/userTypeMaster.json");
const userSubTypeMaster = require("../constants/masters/userSubTypeMaster.json");

const { ServiceError } = require("../helpers/error");

const merchantModel = require("../models/merchantModel");
const partnerModel = require("../models/partnerModel");
const branchModel = require("../models/branchModel");
const userModel = require("../models/userModel");
const masterUserSubTypeModel = require("../models/masterUserSubTypeModel");
const walletModel = require("../models/walletModel");
const masterWalletTypeModel = require("../models/masterWalletTypeModel");
const agentModel = require("../models/agentModel");

const Op = Sequelize.Op;

exports.createInmerchant = () => (req, res, next) => {
  const user = req.user;
  const t = req.t;
  const inuser = req.inuser;

  const { "x-partner-id": partnerId } = req.headers;
  const {
    mid,
    firstname_en: firstnameEN,
    lastname_en: lastnameEN,
    branch_id: branchId,
    settle_time: settleTime,
    settle_to_agent_id: settleToAgentId,
  } = req.body;

  merchantModel
    .findOne({
      where: {
        partnerId:
          user.portalTypeId === portalTypeMaster.DIGIO.id
            ? partnerId
            : user.partnerId,
        mid,
      },
    })
    .then((inmerchant) => {
      if (inmerchant) {
        throw new ServiceError(inmerchantError.ERR_INMERCHANT_MID_DUPLICATE);
      } else {
        return merchantModel.create(
          {
            partnerId:
              user.portalTypeId === portalTypeMaster.DIGIO.id
                ? partnerId
                : user.partnerId,
            branchId,
            userId: inuser.id,
            mid,
            settleTime,
            settleToAgentId,
            status: merchantStatusMaster.UNVERIFIED,
          },
          { transaction: t }
        );
      }
    })
    .then((inmerchant) => {
      req.audit = {
        partnerId: user.partnerId,
        menu: auditLogMenuMaster.INMERCHANT,
        action: "CREATE",
        sourceType: "PORTAL",
        sourceId: user.id,
        sourceName: `${user.firstnameEN} ${user.lastnameEN}`,
        destinationType: "MERCHANT",
        destinationId: inmerchant.id,
        destinationName: lastnameEN
          ? `${firstnameEN} ${lastnameEN}`
          : firstnameEN,
      };
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findInmerchants = () => (req, res, next) => {
  const user = req.user;

  const { "x-partner-id": partnerID } = req.headers;
  const { q, branch, status, limit, offset } = req.query;

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
  if (branch) query.where.branchId = branch;
  if (status) query.where.status = status;

  merchantModel
    .findAndCountAll(query)
    .then(({ count, rows }) => {
      req.total = count;
      req.inmerchants = rows;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findInmerchant = () => (req, res, next) => {
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
            model: masterUserSubTypeModel,
            as: "subType",
            required: true,
          },
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
      {
        model: agentModel,
        as: "agent",
        include: [
          {
            attributes: [
              "id",
              "firstnameEN",
              "lastnameEN",
              "firstnameTH",
              "lastnameTH",
            ],
            model: userModel,
            as: "user",
            required: true,
          },
        ],
        required: true,
      },
    ],
    where: { id },
  };

  if (user.portalTypeId !== portalTypeMaster.DIGIO.id) {
    query.where.partnerId = partner.id;
  }

  merchantModel
    .findOne(query)
    .then((inmerchant) => {
      if (!inmerchant) {
        throw new ServiceError(inmerchantError.ERR_INMERCHANT_NOT_FOUND);
      } else {
        req.inmerchant = inmerchant;
      }
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.updateInmerchant = () => (req, res, next) => {
  const inmerchant = req.inmerchant;
  const t = req.t;

  const {
    mid,
    sub_type: subType,
    firstname_en: firstnameEN,
    lastname_en: lastnameEN,
    firstname_th: firstnameTH,
    lastname_th: lastnameTH,
    tax_id: taxId,
    citizen_id: citizenId,
    passport,
    phone_no: phoneNo,
    email,
    settle_time: settleTime,
    settle_to_agent_id: settleToAgentId,
    status,
  } = req.body;

  const update = {};
  if (subType) update.userSubTypeId = userSubTypeMaster[subType].id;
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
        id: { [Op.ne]: inmerchant.userId },
        partnerId: inmerchant.partnerId,
        userTypeId: userTypeMaster.MERCHANT.id,
        [Op.or]: [
          ...(taxId ? [{ taxId }] : []),
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
          where: { id: inmerchant.userId },
          transaction: t,
        });
      }
    })
    .then(async () => {
      const update = {};
      if (mid) {
        const _inmerchant = await merchantModel.findOne({
          where: {
            partnerId: inmerchant.partnerId,
            id: { [Op.ne]: inmerchant.id },
            mid,
          },
          transaction: t,
        });
        if (_inmerchant)
          throw new ServiceError(inmerchantError.ERR_INMERCHANT_MID_DUPLICATE);
        else update.mid = mid;
      }
      if (status) update.status = status;
      if (settleTime) update.settleTime = settleTime;
      if (settleToAgentId) {
        const agent = await agentModel.findOne({
          where: {
            partnerId: inmerchant.partnerId,
            id: settleToAgentId,
          },
        });
        if (!agent) throw new ServiceError(inagentError.ERR_INAGENT_NOT_FOUND);
      }

      if (update !== {}) {
        return inmerchant.update(update, { transaction: t });
      }
    })
    .then(() => next())
    .catch((err) => next(err));
};
