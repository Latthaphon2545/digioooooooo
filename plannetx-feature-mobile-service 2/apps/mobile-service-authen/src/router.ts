import express from 'express'

import authenRouter from './routers/authen.router'
import deviceRouter from './routers/device.router'
import pinRouter from './routers/pin.router'
import userRoter from './routers/user.router'

const router = express.Router()

router.use('/', authenRouter)
router.use('/device', deviceRouter)
router.use('/pin', pinRouter)
router.use('/user', userRoter)

export default router
