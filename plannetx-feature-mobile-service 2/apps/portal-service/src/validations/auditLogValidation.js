const { Joi } = require('express-validation')

const auditLogMenuMaster = require('../constants/masters/auditLogMenuMaster')

exports.findAuditLogs = {
  headers: Joi.object({
    'x-partner-id': Joi.number().allow('').optional()
  }).unknown(true),
  query: Joi.object({
    menu: Joi.string().valid(
      auditLogMenuMaster.AUTHEN,
      auditLogMenuMaster.SETTLEMENT,
      auditLogMenuMaster.PARTNER,
      auditLogMenuMaster.INAGENT,
      auditLogMenuMaster.INMERCHANT,
      auditLogMenuMaster.CREDENTIAL,
      auditLogMenuMaster.INUSER,
      auditLogMenuMaster.INPORTAL
    ).allow('').optional(),
    q: Joi.string().allow('').optional(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    limit: Joi.number().min(1).max(100).required(),
    offset: Joi.number().min(0).required()
  })
}
