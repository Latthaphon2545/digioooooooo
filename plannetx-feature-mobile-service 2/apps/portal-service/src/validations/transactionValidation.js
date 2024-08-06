const { Joi } = require('express-validation')

const JoiDate = Joi.extend(require('@hapi/joi-date'))

const transactionStatusMaster = require('../constants/masters/transactionStatusMaster')
const transactionSettlementBatchStatusMaster = require('../constants/masters/transactionSettlementBatchStatusMaster')

exports.findTransactions = {
  headers: Joi.object({
    'x-partner-id': Joi.number().allow('').optional()
  }).unknown(true),
  query: Joi.object({
    is_export: Joi.boolean().optional(),
    q: Joi.string().allow('').optional(),
    type: Joi.string().allow('').optional(),
    sub_type: Joi.string().allow('').optional(),
    status: Joi.string().valid(
      transactionStatusMaster.PENDING,
      transactionStatusMaster.HOLDED,
      transactionStatusMaster.APPROVED,
      transactionStatusMaster.CANCELLED,
      transactionStatusMaster.FAILED,
      transactionStatusMaster.VOIDED,
      transactionStatusMaster.REFUNDED,
      transactionStatusMaster.SETTLED
    ).allow('').optional(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    limit: Joi.number().min(1).max(100).optional(),
    offset: Joi.number().min(0).optional()
  })
}

exports.findTransaction = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

exports.inquiryTransaction = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

exports.approveTransaction = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

exports.voidTransaction = {
  params: Joi.object({
    id: Joi.number().required()
  }),
  body: Joi.object({
    reason: Joi.string().required()
  })
}

exports.findTransactionSettlementBatches = {
  headers: Joi.object({
    'x-partner-id': Joi.number().allow('').optional()
  }).unknown(true),
  query: Joi.object({
    start_date: JoiDate.date().format('YYYY-MM-DD').optional(),
    end_date: JoiDate.date().format('YYYY-MM-DD').optional(),
    batch_no: Joi.string().allow('').optional(),
    status: Joi.valid(
      transactionSettlementBatchStatusMaster.PENDING,
      transactionSettlementBatchStatusMaster.PROCESSING,
      transactionSettlementBatchStatusMaster.SETTLED
    ).allow('').optional(),
    limit: Joi.number().min(1).max(100).optional(),
    offset: Joi.number().min(0).optional()
  })
}

exports.findTransactionSettlementBatch = {
  params: Joi.object({
    id: Joi.number().required()
  })
}

exports.settledTransactionSettlementBatch = {
  params: Joi.object({
    id: Joi.number().required()
  })
}
