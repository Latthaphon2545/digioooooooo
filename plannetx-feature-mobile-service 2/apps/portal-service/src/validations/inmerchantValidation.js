const { Joi } = require('express-validation')

const merchantStatusMaster = require('../constants/masters/merchantStatusMaster.json')
const userSubTypeMaster = require('../constants/masters/userSubTypeMaster.json')

exports.createInmerchant = {
  headers: Joi.object({
    'x-partner-id': Joi.number().allow('').optional()
  }).unknown(true),
  body: Joi.object({
    branch_id: Joi.number().required(),
    username: Joi.string().min(5).max(20).required(),
    mid: Joi.string().min(5).max(15).required(),
    sub_type: Joi.string().valid(
      userSubTypeMaster.CORPORATION.name,
      userSubTypeMaster.INDIVIDUAL.name
    ).required(),
    firstname_th: Joi.string().required(),
    lastname_th: Joi.string().when('sub_type', {
      is: userSubTypeMaster.INDIVIDUAL.name,
      then: Joi.string().required()
    }),
    firstname_en: Joi.string().required(),
    lastname_en: Joi.string().when('sub_type', {
      is: userSubTypeMaster.INDIVIDUAL.name,
      then: Joi.string().required()
    }),
    tax_id: Joi.string().when('sub_type', {
      is: userSubTypeMaster.CORPORATION.name,
      then: Joi.string().length(13).required()
    }),
    citizen_id: Joi.when('sub_type', {
      is: userSubTypeMaster.INDIVIDUAL.name,
      then: Joi.when('passport', {
        is: Joi.equal(null),
        then: Joi.string().length(13).required()
      })
    }),
    passport: Joi.when('sub_type', {
      is: userSubTypeMaster.INDIVIDUAL.name,
      then: Joi.when('citizen_id', {
        is: Joi.equal(null),
        then: Joi.string().min(6).max(20).required()
      })
    }),
    phone_no: Joi.string().length(10).required(),
    email: Joi.string().required(),
    settle_time: Joi.string().regex(/^[0-9]{2}:00$/).required(),
    settle_to_agent_id: Joi.number().required()
  })
}

exports.findInmerchants = {
  query: Joi.object({
    q: Joi.string().allow('').optional(),
    branch: Joi.number().allow('').optional(),
    status: Joi.string().valid(
      merchantStatusMaster.UNVERIFIED,
      merchantStatusMaster.VERIFIED,
      merchantStatusMaster.SUSPENDED
    ).allow('').optional(),
    limit: Joi.number().min(1).max(100).required(),
    offset: Joi.number().min(0).required()
  })
}

exports.findInmerchant = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

exports.updateInmerchant = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  body: Joi.object({
    branch_id: Joi.number().optional(),
    username: Joi.string().min(5).max(20).optional(),
    mid: Joi.string().min(5).max(15).optional(),
    sub_type: Joi.string().valid(
      userSubTypeMaster.CORPORATION.name,
      userSubTypeMaster.INDIVIDUAL.name
    ).optional(),
    firstname_th: Joi.string().optional(),
    lastname_th: Joi.string().allow(null).optional(),
    firstname_en: Joi.string().optional(),
    lastname_en: Joi.string().allow(null).optional(),
    tax_id: Joi.string().length(13).allow(null).optional(),
    citizen_id: Joi.string().length(13).allow(null).optional(),
    passport: Joi.string().min(6).max(20).allow(null).optional(),
    phone_no: Joi.string().length(10).optional(),
    email: Joi.string().optional(),
    settle_time: Joi.string().regex(/^[0-9]{2}:00$/).optional(),
    settle_to_agent_id: Joi.number().optional(),
    status: Joi.string().valid(
      merchantStatusMaster.UNVERIFIED,
      merchantStatusMaster.VERIFIED,
      merchantStatusMaster.SUSPENDED
    ).optional()
  })
}
