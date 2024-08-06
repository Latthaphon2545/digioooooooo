import express from 'express'

import otp from './routers/otp.router'

const router = express.Router()

router.use('/', otp)

export default router
