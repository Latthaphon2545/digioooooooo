import express from 'express'

import alipayPlus from './routers/alipay-plus.router'

const router = express.Router()

router.use('/alipay', alipayPlus)

export default router




// import express from 'express'

// import authenRouter from './routers/authen.router'
// import deviceRouter from './routers/device.router'
// import pinRouter from './routers/pin.router'

// const router = express.Router()

// router.use('/', authenRouter)
// router.use('/device', deviceRouter)
// router.use('/pin', pinRouter)

// export default router
