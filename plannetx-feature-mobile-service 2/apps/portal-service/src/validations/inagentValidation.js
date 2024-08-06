const { Joi } = require('express-validation')

const agentStatusMaster = require('../constants/masters/agentStatusMaster.json')

exports.createInagent = {
  headers: Joi.object({
    'x-partner-id': Joi.number().allow('').optional()
  }).unknown(true),
  body: Joi.object({
    username: Joi.string().min(5).max(20).required(),
    firstname_en: Joi.string().required(),
    lastname_en: Joi.string().required(),
    firstname_th: Joi.string().required(),
    lastname_th: Joi.string().required(),
    citizen_id: Joi.string().length(13),
    passport: Joi.string(),
    phone_no: Joi.string().length(10).required(),
    email: Joi.string().required(),
    branch_id: Joi.number().required()
  }).or('citizen_id', 'passport')
}

exports.findInagents = {
  query: Joi.object({
    q: Joi.string().allow('').optional(),
    branch_id: Joi.number().allow('').optional(),
    status: Joi.string().valid(
      agentStatusMaster.UNVERIFIED,
      agentStatusMaster.VERIFIED,
      agentStatusMaster.SUSPENDED
    ).allow('').optional(),
    limit: Joi.number().min(1).max(100).optional(),
    offset: Joi.number().min(0).optional()
  })
}

exports.findInagent = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

exports.updateInagent = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  body: Joi.object({
    firstname_en: Joi.string().optional(),
    lastname_en: Joi.string().optional(),
    firstname_th: Joi.string().optional(),
    lastname_th: Joi.string().optional(),
    citizen_id: Joi.string().allow(null).length(13).optional(),
    passport: Joi.string().allow(null).optional(),
    phone_no: Joi.string().length(10).optional(),
    email: Joi.string().optional(),
    status: Joi.string().valid(
      agentStatusMaster.UNVERIFIED,
      agentStatusMaster.VERIFIED,
      agentStatusMaster.SUSPENDED
    ).optional()
  })
}
