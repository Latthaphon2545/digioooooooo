const { Joi } = require('express-validation')

const reportTypeMaster = require('../constants/masters/reportTypeMaster')
const reportSubTypeMaster = require('../constants/masters/reportSubTypeMaster')

const JoiDate = Joi.extend(require('@hapi/joi-date'))

exports.findReports = {
  headers: Joi.object({
    'x-partner-id': Joi.number().allow('').optional()
  }).unknown(true),
  query: Joi.object({
    start_date: JoiDate.date().format('YYYY-MM-DD').required(),
    end_date: JoiDate.date().format('YYYY-MM-DD').required(),
    type: Joi.string().valid(
      reportTypeMaster.TRANSACTION.name,
      reportTypeMaster.WALLET.name
    ).allow('').optional(),
    sub_type: Joi.string().valid(
      reportSubTypeMaster.DAILY.name,
      reportSubTypeMaster.WEEKLY.name,
      reportSubTypeMaster.MONTHLY.name
    ).allow('').optional(),
    limit: Joi.number().min(1).max(100).required(),
    offset: Joi.number().min(0).required()
  })
}

exports.findReport = {
  params: Joi.object({
    id: Joi.number().required()
  })
}
