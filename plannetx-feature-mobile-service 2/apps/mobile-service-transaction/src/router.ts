import express from 'express'

import transactionRouter from './routers/transaction.router'
import scbRouter from './routers/scb.router'
import kbankRouter from './routers/kbank.router'

const router = express.Router()

router.use('/v1/transaction', transactionRouter)
router.use('/v1/scb', scbRouter)
router.use('/v1/kbank', kbankRouter)

export default router
