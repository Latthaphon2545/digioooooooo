const Sequelize = require("sequelize");
const { nanoid } = require("nanoid");

const inuserError = require("../constants/errors/inuserError");

const bankMaster = require("../constants/masters/bankMaster");
const auditLogMenuMaster = require("../constants/masters/auditLogMenuMaster");
const portalTypeMaster = require("../constants/masters/portalTypeMaster");
const userStatusMaster = require("../constants/masters/userStatusMaster.json");
const userSubTypeMaster = require("../constants/masters/userSubTypeMaster");
const userTypeMaster = require("../constants/masters/userTypeMaster");
const walletTypeMaster = require("../constants/masters/walletTypeMaster");

const diff = require("../helpers/diff");
const { ServiceError } = require("../helpers/error");

const masterBankModel = require("../models/masterBankModel");
const masterUserSubTypeModel = require("../models/masterUserSubTypeModel");
const masterUserTypeModel = require("../models/masterUserTypeModel");
const masterWalletType = require("../models/masterWalletTypeModel");
const partnerModel = require("../models/partnerModel");
const userModel = require("../models/userModel");
const walletModel = require("../models/walletModel");

const Op = Sequelize.Op;

exports.createInuser = (userType, userSubType) => (req, res, next) => {
  const user = req.user;
  const t = req.t;

  const { "x-partner-id": partnerId } = req.headers;
  const {
    username,
    sub_type: subType,
    firstname_en: firstnameEN,
    lastname_en: lastnameEN,
    firstname_th: firstnameTH,
    lastname_th: lastnameTH,
    citizen_id: citizenId,
    tax_id: taxId,
    passport,
    phone_no: phoneNo,
    email,
  } = req.body;

  userModel
    .findOne({
      where: {
        partnerId:
          user.portalTypeId === portalTypeMaster.DIGIO.id
            ? partnerId
            : user.partnerId,
        [Op.or]: [
          { username },
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
        return userModel.create(
          {
            uid: nanoid(),
            partnerId:
              user.portalTypeId === portalTypeMaster.DIGIO.id
                ? partnerId
                : user.partnerId,
            userTypeId: userType.id,
            userSubTypeId: userSubType
              ? userSubType.id
              : userSubTypeMaster[subType].id,
            username,
            firstnameEN,
            lastnameEN,
            firstnameTH,
            lastnameTH,
            phoneNo,
            email,
            taxId,
            citizenId,
            passport,
            status: userStatusMaster.UNVERIFIED,
          },
          { transaction: t }
        );
      }
    })
    .then((inuser) => {
      req.inuser = inuser;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findInusers = () => (req, res, next) => {
  const user = req.user;
  const partner = req.partner;

  const { "x-partner-id": partnerID } = req.headers;
  const { q, type, sub_type: subType, status, limit, offset } = req.query;

  const query = {
    include: [
      {
        model: partnerModel,
        as: "partner",
        required: false,
      },
      {
        model: masterUserTypeModel,
        as: "type",
        required: true,
      },
      {
        model: masterUserSubTypeModel,
        as: "subType",
        required: true,
      },
    ],
    where: {
      userTypeId: {
        [Op.notIn]: [userTypeMaster.AGENT.id, userTypeMaster.MERCHANT.id],
      },
    },
    limit: limit ? Number(limit) : 10,
    offset: offset ? Number(offset) : 0,
    order: [["createdAt", "DESC"]],
  };

  if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
    if (partnerID) {
      query.where.partnerID = partnerID;
    }
  } else {
    query.where.partnerId = partner.id;
  }

  if (q) {
    query.where[Op.or] = [
      { uid: q },
      { firstnameTH: { [Op.like]: `%${q}%` } },
      { firstnameEN: { [Op.like]: `%${q}%` } },
      Sequelize.literal(`concat(firstnameTH, ' ', lastnameTH) LIKE '%${q}%'`),
      Sequelize.literal(`concat(firstnameEN, ' ', lastnameEN) LIKE '%${q}%'`),
      { phoneNo: { [Op.like]: `%${q}%` } },
      { email: { [Op.like]: `%${q}%` } },
      { taxId: { [Op.like]: `%${q}%` } },
      { citizenId: { [Op.like]: `%${q}%` } },
      { passport: { [Op.like]: `%${q}%` } },
    ];
  }
  if (type) query.where.userTypeId = userTypeMaster[type].id;
  if (subType) query.where.userSubTypeId = userSubTypeMaster[subType].id;
  if (status) query.where.status = status;

  userModel
    .findAndCountAll(query)
    .then(({ count, rows }) => {
      req.total = count;
      req.inusers = rows;
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.findInuser = (proxyType, proxyValue, role) => (req, res, next) => {
  const user = req.user;
  const partner = req.partner;

  const query = {
    include: [
      {
        model: masterUserTypeModel,
        as: "type",
        required: true,
      },
      {
        model: masterUserSubTypeModel,
        as: "subType",
        required: true,
      },
      {
        model: masterBankModel,
        as: "bank",
        required: false,
      },
      {
        model: walletModel,
        as: "wallets",
        include: [
          {
            model: masterWalletType,
            as: "type",
            require: true,
          },
        ],
        where: {},
        required: true,
      },
    ],
    where: {},
  };

  switch (proxyType) {
    case "id":
      switch (proxyValue) {
        case "param":
          query.where.id = req.params.id;
          if (user.portalTypeId !== portalTypeMaster.DIGIO.id) {
            query.where.partnerId = partner.id;
          }
          break;
      }
      break;
    case "payer":
      switch (proxyValue) {
        case "body":
          switch (req.body.payer_proxy_type) {
            case "DIGIO":
              query.where.userTypeId = userTypeMaster.SYSTEM.id;
              break;
            case "COLLATERAL": {
              const walletIndex = query.include.findIndex(
                (include) => include.model === walletModel
              );
              query.include[walletIndex].where.walletTypeId =
                walletTypeMaster.COLLATERAL.id;
              if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
                query.where.partnerId = req.body.partner_id;
                query.where.userTypeId = userTypeMaster.PARTNER.id;
              } else {
                query.where.partnerId = user.partnerId;
                query.where.userTypeId = userTypeMaster.PARTNER.id;
              }
              break;
            }
            case "CONSUMER": {
              const walletIndex = query.include.findIndex(
                (include) => include.model === walletModel
              );
              query.include[walletIndex].where.walletId =
                req.body.payer_proxy_value;
              if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
                query.where.partnerId = req.body.partner_id;
              } else {
                query.where.partnerId = user.partnerId;
              }
              query.where.userTypeId = userTypeMaster.CONSUMER.id;
              break;
            }
          }
          break;
      }
      break;
    case "payee":
      switch (proxyValue) {
        case "body":
          switch (req.body.payee_proxy_type) {
            case "DIGIO":
              query.where.userTypeId = userTypeMaster.SYSTEM.id;
              break;
            case "COLLATERAL": {
              const walletIndex = query.include.findIndex(
                (include) => include.model === walletModel
              );
              query.include[walletIndex].where.walletTypeId =
                walletTypeMaster.COLLATERAL.id;
              if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
                query.where.partnerId = req.body.partner_id;
                query.where.userTypeId = userTypeMaster.PARTNER.id;
              } else {
                query.where.partnerId = user.partnerId;
                query.where.userTypeId = userTypeMaster.PARTNER.id;
              }
              break;
            }
            case "CONSUMER": {
              const walletIndex = query.include.findIndex(
                (include) => include.model === walletModel
              );
              query.include[walletIndex].where.walletId =
                req.body.payee_proxy_value;
              if (user.portalTypeId === portalTypeMaster.DIGIO.id) {
                query.where.partnerId = req.body.partner_id;
              } else {
                query.where.partnerId = user.partnerId;
              }
              query.where.userTypeId = userTypeMaster.CONSUMER.id;
              break;
            }
          }
          break;
      }
      break;
  }

  userModel
    .findOne(query)
    .then((inuser) => {
      if (!inuser) {
        throw new ServiceError(inuserError.ERR_INUSER_NOT_FOUND);
      } else {
        switch (role) {
          case "payer":
            req.payer = inuser;
            break;
          case "payee":
            req.payee = inuser;
            break;
          default:
            req.inuser = inuser;
        }
      }
    })
    .then(() => next())
    .catch((err) => next(err));
};

exports.updateInuser = () => async (req, res, next) => {
  const partner = req.partner;
  const user = req.user;
  const inuser = req.inuser;

  const {
    firstname_en: firstnameEN,
    lastname_en: lastnameEN,
    firstname_th: firstnameTH,
    lastname_th: lastnameTH,
    tax_id: taxId,
    citizen_id: citizenId,
    passport,
    birthdate,
    gender,
    phone_no: phoneNo,
    email,
    bank,
    bank_branch: bankBranch,
    bank_account_number: bankAccountNumber,
    bank_account_name: bankAccountName,
    status,
  } = req.body;

  const update = {};

  if (firstnameEN !== undefined) update.firstnameEN = firstnameEN;
  if (lastnameEN !== undefined) update.lastnameEN = lastnameEN;
  if (firstnameTH !== undefined) update.firstnameTH = firstnameTH;
  if (lastnameTH !== undefined) update.lastnameTH = lastnameTH;
  if (taxId !== undefined) update.taxId = taxId;
  if (citizenId !== undefined) update.citizenId = citizenId;
  if (passport !== undefined) update.passport = passport;
  if (birthdate !== undefined) update.birthdate = birthdate;
  if (gender !== undefined) update.gender = gender;
  if (phoneNo !== undefined) update.phoneNo = phoneNo;
  if (email !== undefined) update.email = email;
  if (bank !== undefined)
    update.bankId = bank !== null ? bankMaster[bank].id : null;
  if (bankBranch !== undefined) update.bankBranch = bankBranch;
  if (bankAccountNumber !== undefined)
    update.bankAccountNumber = bankAccountNumber;
  if (bankAccountName !== undefined) update.bankAccountName = bankAccountName;
  if (status !== undefined) update.status = status;

  const inUserAfterUpdate = { ...inuser.toJSON(), ...update };
  switch (inUserAfterUpdate.userSubTypeId) {
    case userSubTypeMaster.CORPORATION.id:
      if (!inUserAfterUpdate.taxId) {
        return next(
          new ServiceError(inuserError.ERR_INUSER_CORPORATION_TAX_ID_REQUIRED)
        );
      }
      break;
    case userSubTypeMaster.INDIVIDUAL.id:
      if (!inUserAfterUpdate.citizenId && !inUserAfterUpdate.passport) {
        return next(
          new ServiceError(
            inuserError.ERR_INUSER_INDIVIDUAL_CITIZEN_ID_OR_PASSPORT_REQUIRED
          )
        );
      }
      break;
  }

  req.audit = {
    partnerId: user.partnerId,
    menu: auditLogMenuMaster.INUSER,
    action: "UPDATE",
    sourceType: "PORTAL",
    sourceId: user.id,
    sourceName: `${user.firstnameEN} ${user.lastnameEN}`,
    destinationType: "INUSER",
    destinationId: inuser.id,
    destinationName: inuser.lastnameEN
      ? `${inuser.firstnameEN} ${inuser.lastnameEN}`
      : inuser.firstnameEN,
    detail: JSON.stringify(diff.diffJson(inuser, update)),
  };

  const query = {
    where: {},
  };

  switch (inUserAfterUpdate.userSubTypeId) {
    case userSubTypeMaster.CORPORATION.id:
      if (taxId) query.where.taxId = taxId;
      break;
    case userSubTypeMaster.INDIVIDUAL.id:
      if (citizenId) query.where.citizenId = citizenId;
      if (passport) query.where.passport = passport;
      break;
  }

  try {
    if (Object.keys(query.where).length) {
      query.where.id = { [Op.ne]: inuser.id };
      if (user.portalTypeId !== portalTypeMaster.DIGIO.id) {
        query.where.partnerId = partner.id;
      }

      const _inuser = await userModel.findOne(query);
      if (_inuser) {
        throw new ServiceError(inuserError.ERR_INUSER_DUPLICATE);
      }
    }

    await inuser.update(update);
    await next();
  } catch (err) {
    next(err);
  }
};
