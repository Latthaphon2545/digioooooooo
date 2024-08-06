import express from 'express'
import walletRouter from './routers/wallet.router'
import userRouter from './routers/user.router'

const router = express.Router()
router.use('/v1/wallet', walletRouter)
router.use('/v1/user', userRouter)

export default router
