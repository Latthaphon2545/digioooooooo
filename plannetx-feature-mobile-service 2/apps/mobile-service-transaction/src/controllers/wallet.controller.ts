import { NextFunction, Request, Response } from 'express'

import axios from 'axios'

const getWallet = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { walletId } = req.body
    const uid = req.headers.uid

    const wallet = await axios.post(`${process.env.WALLET_SERVICE_ENDPOINT}/v1/wallet/inquiry`, 
      { walletId },
      {
        headers: {
          uid,
          authorization: req.headers.authorization
        }
      }
    )

    res.locals.wallet = wallet.data.data
    next()
  } catch (error) {
    next(error)
  }
}

export default { 
  getWallet
}