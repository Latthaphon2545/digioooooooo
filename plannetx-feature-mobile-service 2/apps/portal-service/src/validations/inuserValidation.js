const { Joi } = require('express-validation')

const JoiDate = Joi.extend(require('@hapi/joi-date'))

const bankMaster = require('../constants/masters/bankMaster')
const userGenderMaster = require('../constants/masters/userGenderMaster')
const userStatusMaster = require('../constants/masters/userStatusMaster')
const userSubTypeMaster = require('../constants/masters/userSubTypeMaster')
const userTypeMaster = require('../constants/masters/userTypeMaster')

exports.findInusers = {
  headers: Joi.object({
    'x-partner-id': Joi.number().allow('').optional()
  }).unknown(true),
  query: Joi.object({
    q: Joi.string().allow('').optional(),
    type: Joi.string().valid(
      userTypeMaster.SYSTEM.name,
      userTypeMaster.PARTNER.name,
      userTypeMaster.CONSUMER.name
    ).allow('').optional(),
    sub_type: Joi.string().valid(
      userSubTypeMaster.CORPORATION.name,
      userSubTypeMaster.INDIVIDUAL.name
    ).allow('').optional(),
    status: Joi.string().valid(
      userStatusMaster.UNVERIFIED,
      userStatusMaster.VERIFIED,
      userStatusMaster.SUSPENDED
    ).allow('').optional(),
    limit: Joi.number().min(1).max(100).required(),
    offset: Joi.number().min(0).required()
  })
}

exports.findInuser = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

exports.updateInuser = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  body: Joi.object({
    firstname_en: Joi.string().optional(),
    lastname_en: Joi.string().allow(null).optional(),
    firstname_th: Joi.string().allow(null).optional(),
    lastname_th: Joi.string().allow(null).optional(),
    phone_no: Joi.string().min(9).max(10).optional(),
    email: Joi.string().allow(null).optional(),
    tax_id: Joi.string().allow(null).length(13).optional(),
    citizen_id: Joi.string().allow(null).length(13).optional(),
    passport: Joi.string().min(6).max(20).allow(null).optional(),
    birthdate: JoiDate.date().format('YYYY-MM-DD').allow(null).optional(),
    gender: Joi.string()
      .valid(
        userGenderMaster.FEMALE,
        userGenderMaster.MALE
      )
      .allow(null)
      .optional(),
    bank: Joi.string().valid(
      bankMaster.BAAC.shortName,
      bankMaster.BAY.shortName,
      bankMaster.BBL.shortName,
      bankMaster.CIMBT.shortName,
      bankMaster.CITI.shortName,
      bankMaster.GHB.shortName,
      bankMaster.GSB.shortName,
      bankMaster.ICBC.shortName,
      bankMaster.KBANK.shortName,
      bankMaster.KKP.shortName,
      bankMaster.KTB.shortName,
      bankMaster.LHBANK.shortName,
      bankMaster.SCB.shortName,
      bankMaster.SCBT.shortName,
      bankMaster.TCAP.shortName,
      bankMaster.TCRB.shortName,
      bankMaster.TMB.shortName,
      bankMaster.UOB.shortName
    ).allow(null).optional(),
    bank_branch: Joi.string().allow(null).optional(),
    bank_account_number: Joi.string().min(10).max(12).allow(null).optional(),
    bank_account_name: Joi.string().min(1).max(100).allow(null).optional(),
    status: Joi.string().valid(
      userStatusMaster.VERIFIED,
      userStatusMaster.SUSPENDED
    ).optional()
  })
}
