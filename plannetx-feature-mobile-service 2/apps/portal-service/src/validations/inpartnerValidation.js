const { Joi } = require('express-validation')

const partnerStatusMaster = require('../constants/masters/partnerStatusMaster')

exports.findInpartners = {
  query: Joi.object({
    q: Joi.string().allow('').optional(),
    status: Joi.string().valid(
      partnerStatusMaster.ACTIVATED,
      partnerStatusMaster.DEACTIVATED
    ).allow('').optional(),
    limit: Joi.number().min(1).max(100).optional(),
    offset: Joi.number().min(0).optional()
  })
}

exports.findInpartner = {
  params: Joi.object({
    id: Joi.number().required()
  })
}
