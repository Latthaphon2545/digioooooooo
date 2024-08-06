import './helpers/sequelize.helper'

import express from 'express'

import router from './router'

import logController from './controllers/log.controller'

export const app = express()

app.get('/', (_req, res) => {
  res.send('Scb-planetx : integration service')
})

app.disable('x-powered-by')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(logController.createRequestLog())
app.use(router)

app.use(logController.createResponseLog())
app.use(logController.createErrorLog())

export default app
