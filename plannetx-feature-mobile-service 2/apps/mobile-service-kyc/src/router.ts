import express from 'express'

import kycRouter from './routers/kyc.router'
import scbRouter from './routers/scb.router'
import userRouter from './routers/user.router'
import callbackRouter from './routers/callback.router'

const router = express.Router()

router.use('/', kycRouter)
router.use('/scb', scbRouter)
router.use('/user', userRouter)
router.use('/callback', callbackRouter)

export default router
