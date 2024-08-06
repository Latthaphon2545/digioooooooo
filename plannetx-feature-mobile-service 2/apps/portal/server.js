const next = require('next')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = next({
  dir: '.',
  dev: true
})
const server = express()

const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    server.use(
      '/api',
      createProxyMiddleware({
        target: 'http://127.0.0.1:9300',
        pathRewrite: { '^/api': '/' },
        changeOrigin: true
      })
    )
    server.all('*', (req, res) => handle(req, res))
    server.listen(9301, (err) => {
      if (err) throw err
      console.log('started server on http://127.0.0.1:9301')
    })
  })
  .catch((err) => console.error(err))
