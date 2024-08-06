import express from 'express'
import { NextFunction, Request, Response } from 'express'

import { body, header, validationResult } from 'express-validator'
import transactionController from '../controllers/transaction.controller'
import alipayPlusController from '../controllers/alipayPlus.controller'
import alipaySDKServerController from '../controllers/alipaySDKServer.controller'
import validationController from '../controllers/validation.controller'

const router = express.Router()

declare module 'express-serve-static-core' {
  interface Request {
    alipay_response?: any;
  }
}

router.post(
  '/identify-code',
  body(['codeValue']).exists().withMessage('codeValue is required').isLength({ max: 512 }).withMessage('codeValue must not be longer than 512 characters'),
  validationController.validate(),
  alipaySDKServerController.getInquiryInfoSDKServer(),
  transactionController.requestIdentifyCode(),
  alipayPlusController.getInquiryInfo(),
  transactionController.requestUserInitiatedPay(),
  (req: express.Request, res: Response, next: NextFunction) => {
    res.locals.body = {
      resCode: '0000',
      data: req.alipay_response,
      resDesc: ''
    }
    res.json(res.locals.body)
    next()
  }
)

// userInitiatedPay
router.post(
  '/entry-code',
  body(['codeValue']).exists().withMessage('codeValue is required').isLength({ max: 512 }).withMessage('codeValue must not be longer than 512 characters'),
  validationController.validate(),
  alipayPlusController.getInquiryInfo(),
  transactionController.requestUserInitiatedPay(),
  (req: express.Request, res: Response, next: NextFunction) => {
    res.locals.body = {
      resCode: '0000',
      data: req.alipay_response,
      resDesc: ''
    }
    res.json(res.locals.body)
    next()
  }
)

// Notification Payment MPP (Entry Code)
router.post(
  '/notify-payment',
  // Validation Request Parameters (Referance By: notifyPaymentMPP)
  [
    body('paymentResult')
      .exists({ checkNull: true }).withMessage('paymentResult is required')
      .isObject().withMessage('paymentResult must be an object'),
    body('paymentResult.resultCode')
      .exists({ checkNull: true }).withMessage('resultCode is required')
      .isString().withMessage('resultCode must be a string')
      .isLength({ max: 64 }).withMessage('resultCode must not be longer than 64 characters'),
    body('paymentResult.resultStatus')
      .exists({ checkNull: true }).withMessage('resultStatus is required')
      .isString().withMessage('resultStatus must be a string')
      .isIn(['S', 'F']).withMessage('resultStatus must be either S or F'),
    body('paymentResult.resultMessage')
      .optional()
      .isString().withMessage('resultMessage must be a string')
      .isLength({ max: 256 }).withMessage('resultMessage must not be longer than 256 characters'),
    body('paymentRequestId')
      .exists({ checkNull: true }).withMessage('paymentRequestId is required')
      .isString().withMessage('paymentRequestId must be a string')
      .isLength({ max: 64 }).withMessage('paymentRequestId must not be longer than 64 characters'),
    body('paymentResult.resultStatus').custom((value, { req }) => {
      if (value === 'S') {
        return body('paymentResult.paymentId')
          .exists({ checkNull: true }).withMessage('paymentId is required when resultStatus is S')
          .isString().withMessage('paymentId must be a string')
          .isLength({ max: 64 }).withMessage('paymentId must not be longer than 64 characters');
      }
      return true;
    }),
    body('paymentAmount')
      .exists({ checkNull: true }).withMessage('paymentAmount is required')
      .isObject().withMessage('paymentAmount must be an object'),
    body('paymentAmount.currency')
      .exists({ checkNull: true }).withMessage('currency is required')
      .isString().withMessage('currency must be a string')
      .isLength({ max: 3 }).withMessage('currency must not be longer than 3 characters'),
    body('paymentAmount.value')
      .exists({ checkNull: true }).withMessage('value is required')
      .isInt({ min: 1 }).withMessage('value must be an integer greater than 0'),
    body('paymentResult.resultStatus').custom((value, { req }) => {
      if (value === 'S' && req.body.paymentAmount.currency !== req.body.payToAmount?.currency) {
        return body('payToAmount')
          .exists({ checkNull: true }).withMessage('payToAmount is required when currencies differ and resultStatus is S')
          .isObject().withMessage('payToAmount must be an object');
      }
      return true;
    }),
    body('payToAmount.currency')
      .optional()
      .isString().withMessage('payToAmount.currency must be a string')
      .isLength({ max: 3 }).withMessage('payToAmount.currency must not be longer than 3 characters'),
    body('payToAmount.value')
      .optional()
      .isInt({ min: 1 }).withMessage('payToAmount.value must be an integer greater than 0'),
    body('paymentTime')
      .optional()
      .isISO8601().withMessage('paymentTime must be a valid ISO 8601 date'),
    body('customerId')
      .optional()
      .isString().withMessage('customerId must be a string')
      .isLength({ max: 64 }).withMessage('customerId must not be longer than 64 characters'),
    body('customsDeclarationAmount')
      .optional()
      .isObject().withMessage('customsDeclarationAmount must be an object'),
    body('customsDeclarationAmount.currency')
      .optional()
      .isString().withMessage('customsDeclarationAmount.currency must be a string')
      .isLength({ max: 3 }).withMessage('customsDeclarationAmount.currency must not be longer than 3 characters'),
    body('customsDeclarationAmount.value')
      .optional()
      .isInt({ min: 1 }).withMessage('customsDeclarationAmount.value must be an integer greater than 0'),
    body('passThroughInfo')
      .optional()
      .isString().withMessage('passThroughInfo must be a string')
      .isLength({ max: 20000 }).withMessage('passThroughInfo must not be longer than 20000 characters'),
  ],
  alipayPlusController.getInquiryNotifyPayment(),
  transactionController.requestAlipayPlus(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        resCode: '0001',
        resDesc: 'Validation error',
        errors: errors.array(),
      });
    }

    res.locals.body = {
      statusCode: 200,
      resCode: '0000',
      resDesc: '',
      data: req.alipay_response,
    };
    res.json(res.locals.body);
    next();
  }
);

export default router
