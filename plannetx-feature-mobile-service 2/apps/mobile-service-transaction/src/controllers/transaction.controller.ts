import { NextFunction, Request, Response } from 'express'

import { coreTransactionRequest } from '../instances/transaction'

import { momentAsiaBangkok } from '@planetx/helpers'
import { generateRandomNumber } from '@planetx/commons'
import { Transaction, TransactionType, TransactionStatus } from '@planetx/models'

const creteTransaction =
  ({ bank, paymentType, ignoreInsufficient }: { bank: string, paymentType: keyof typeof TransactionType, ignoreInsufficient: boolean }) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount, orderId, walletId } = req.body
      const reference = momentAsiaBangkok().format('YYYYMMDDHHmmssSSS') + generateRandomNumber(3)

      const bankWalletId = bank === 'SCB' ? '00000000000014' : '00000000000004'

      const requestTransaction: Transaction = {
        id: reference,
        orderId,
        type: paymentType,
        payerWalletId: paymentType === TransactionType.TOP_UP ? bankWalletId : walletId,
        payeeWalletId: paymentType === TransactionType.TOP_UP ? walletId : bankWalletId,
        currency: 'THB',
        amount,
      }

      await coreTransactionRequest({
        endpoint: String(process.env.CORE_TRANSACTION_ENDPOINT),
        path: '/v1/transaction',
        method: 'POST',
        data: requestTransaction,
        header: {
          'x-ignore-insufficient': ignoreInsufficient
        }
      })

      res.locals.reference = reference
      next()
    } catch (error: any) {
      next(error)
    }
  }

const approveTransaction =
  ({ ignoreInsufficient }: {ignoreInsufficient: boolean}) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const status = res.locals.tranasctionStatus!
      const reference = res.locals.reference ? res.locals.reference : req.body?.reference

      if (status === TransactionStatus.APPROVED) { 
        await coreTransactionRequest({
          endpoint: String(process.env.CORE_TRANSACTION_ENDPOINT),
          path: `/v1/transaction/${reference}/approve`,
          method: 'PATCH',
          header: {
            'x-ignore-insufficient': ignoreInsufficient
          }
        })
      }

      res.locals.body = {
        ...res.locals.body,
        transaction: {
          reference: reference,
          transactionStatus: status
        }
      }

      next()
    } catch (error) {
      next(error)
    }
  }

const getTransactionDetail = () => async (req: Request, res: Response, next: NextFunction) => {
  const { reference } = req.body
  try {
    const transaction = await coreTransactionRequest({
      endpoint: String(process.env.CORE_TRANSACTION_ENDPOINT),
      path: `/v1/transaction/${reference}`,
      method: 'GET'
    })
    
    res.locals.body = transaction.data?.transaction

    next()
  } catch (error) {
    next(error)
  }
}

const getTransactionByUserUid = () => async (req: Request, res: Response, next: NextFunction) => {
  const { walletId } = req.headers

  try {
    const limit = Number(req.query.limit) || 10
    const offset = Number(req.query.offset) || 0

    const transactions = await coreTransactionRequest({
      endpoint: String(process.env.CORE_TRANSACTION_ENDPOINT),
      path: `/v1/transaction`,
      method: 'GET',
      param: {
        payerWalletId: walletId,
        payeeWalletId: walletId,
        offset,
        limit
      }
    })

    res.locals.body = {
      transactions: transactions.data.transactions,
      count: transactions.data.count
    }

    next()
  } catch (error) {
    next(error)
  }
}

export default {
  creteTransaction,
  approveTransaction,
  getTransactionDetail,
  getTransactionByUserUid
}
