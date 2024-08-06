import express from 'express'

import token from './routers/token.router'

const router = express.Router()

router.use('/v1/token', token)

export default router
