const { Joi } = require('express-validation')

const portalStatusMaster = require('../constants/masters/portalStatusMaster')
const portalSubTypeMaster = require('../constants/masters/portalSubTypeMaster')

exports.createInportal = {
  body: Joi.object({
    username: Joi.string().min(5).required(),
    firstname_th: Joi.string().required(),
    lastname_th: Joi.string().required(),
    firstname_en: Joi.string().required(),
    lastname_en: Joi.string().required(),
    email: Joi.string().required(),
    phone_no: Joi.string().length(10).required(),
    sub_type: Joi.string().valid(
      portalSubTypeMaster.ADMIN.name,
      portalSubTypeMaster.USER.name
    ).required()
  })
}

exports.findInportals = {
  query: Joi.object({
    q: Joi.string().allow('').optional(),
    sub_type: Joi.string().valid(
      portalSubTypeMaster.ADMIN.name,
      portalSubTypeMaster.USER.name
    ).allow('').optional(),
    status: Joi.string().valid(
      portalStatusMaster.UNVERIFIED,
      portalStatusMaster.VERIFIED,
      portalStatusMaster.SUSPENDED
    ).allow('').optional(),
    limit: Joi.number().min(1).max(100).required(),
    offset: Joi.number().min(0).required()
  })
}

exports.findInportal = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

exports.updateInportal = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  body: Joi.object({
    sub_type: Joi.string().valid(
      portalSubTypeMaster.ADMIN.name,
      portalSubTypeMaster.USER.name
    ).optional(),
    firstname_en: Joi.string().optional(),
    lastname_en: Joi.string().optional(),
    firstname_th: Joi.string().optional(),
    lastname_th: Joi.string().optional(),
    phone_no: Joi.string().length(10).optional(),
    email: Joi.string().optional(),
    status: Joi.string().valid(
      portalStatusMaster.VERIFIED,
      portalStatusMaster.SUSPENDED
    ).optional()
  })
}

exports.resendActivateEmail = {
  params: Joi.object({
    id: Joi.number().required()
  })
}
