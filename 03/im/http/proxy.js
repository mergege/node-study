const express = require('express')

const app = express()

const {createProxyMiddleware} = require('http-proxy-middleware')
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:4000'
}))
app.use(express.static(__dirname + '/'))

app.listen(3000, () => {
  console.log('listen at 3000')
})
