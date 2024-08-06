import { NextFunction, Request, Response } from 'express'

import { ServiceError } from '../helpers/error.helper'
import { coreWalletRequest } from '../instances/wallet'
import { createWalletId } from '../helpers/wallet.helper'

import { Wallet, RunningNumberModel, RunningNumberType, sequelize } from '@planetx/models'
import WalletError from '@planetx/constants/errors/wallet.error.json'
import RunningError from '@planetx/constants/errors/runnung.error.json'

const createWallet = () => async (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.body
  let w
  let runningNumber
  try {
    w = await sequelize.transaction({ autocommit: false })

    runningNumber = await RunningNumberModel.findOne({
      where: {
        type: RunningNumberType.WALLET
      },
      attributes: ['id', 'number'],
      lock: true,
      transaction: w
    })
  
    if (runningNumber === null) throw new ServiceError(RunningError.ERR_RUNNING_NUMBER)

    const running = runningNumber.number

    await runningNumber.increment('number', { by: 1, transaction: w })

    await w.commit()
    
    // สร้าง wallet
    const walletId = createWalletId(('000000' + String(Number(running) + 1)).slice(-7))
  
    await coreWalletRequest({
      endpoint: String(process.env.CORE_WALLET_ENDPOINT),
      path: '/v1/wallet',
      method: 'POST',
      data: {
        id: walletId,
        ownerId: uid,
        currency: 'THB'
      }
    })

    await coreWalletRequest({
      endpoint: String(process.env.CORE_WALLET_ENDPOINT),
      path: `/v1/wallet/${walletId}/activate`,
      method: 'PATCH'
    })

    next()
  } catch (error) {
    if (w !== undefined) {
      await w.commit()
    }
    next(error)
  }

}

const getWallet = () => async (req: Request, res: Response, next: NextFunction) => {
  const { walletId } = req.body

  try {
    const wallet = await coreWalletRequest({
      endpoint: String(process.env.CORE_WALLET_ENDPOINT),
      path: `/v1/wallet/${walletId}`,
      method: 'GET'
    })

    res.locals.body = wallet.data.wallet
    next()
  } catch (error: any) {
    next(error)
  }
}

const listWallet = () => async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.headers.uid

  try {
    const wallet = await coreWalletRequest({
      endpoint: String(process.env.CORE_WALLET_ENDPOINT),
      path: '/v1/wallet',
      method: 'GET',
      param: {
        ownerId: uid
      }
    })

    res.locals.body = wallet.data.wallets as Wallet[]
    next()
  } catch (error: any) {
    next(error)
  }
}

const isNegative = (balance: number) => {
  if (balance < 0) {
    throw new ServiceError(WalletError.ERR_BALANCE_NEGATIVE)
  }
}

export default {
  createWallet,
  getWallet,
  listWallet,
  isNegative
}
