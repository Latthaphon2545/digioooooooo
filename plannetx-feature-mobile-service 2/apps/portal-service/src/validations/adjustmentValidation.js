const { Joi } = require('express-validation')

exports.inquiryAdjustment = {
  body: Joi.object({
    partner_id: Joi.number().allow(null).optional(),
    payer_proxy_type: Joi.string().valid('DIGIO', 'COLLATERAL', 'CONSUMER').required(),
    payer_proxy_value: Joi.string()
      .when('payer_proxy_type', {
        is: 'CONSUMER',
        then: Joi.string().length(15).required()
      })
      .allow('')
      .optional(),
    payee_proxy_type: Joi.string()
      .when('payer_proxy_type', {
        is: 'DIGIO',
        then: Joi.string().valid('CONSUMER').required()
      })
      .when('payer_proxy_type', {
        is: 'COLLATERAL',
        then: Joi.string().valid('CONSUMER').required()
      })
      .when('payer_proxy_type', {
        is: 'CONSUMER',
        then: Joi.string().valid('DIGIO', 'COLLATERAL').required()
      }),
    payee_proxy_value: Joi.string()
      .when('payer_proxy_type', {
        is: 'CONSUMER',
        then: Joi.string().length(15).required()
      })
      .allow('')
      .optional(),
    amount: Joi.number().min(1).required(),
    remark: Joi.string().required()
  })
}

exports.confirmAdjustment = {
  body: Joi.object({
    partner_id: Joi.number().allow(null).optional(),
    reference_no: Joi.string().required()
  })
}
