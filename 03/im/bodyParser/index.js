const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()


const app = new Koa()

// const bodyParser = require('koa-bodyParser')
// app.use(bodyParser())
const BodyParser = require('./bodyParser')
app.use(BodyParser())

// 自动启动index.html文件
const static = require('koa-static')
app.use(static(__dirname, '/'))

router.post('/add',async (ctx,next) => {
  console.log('ctx.body:' + ctx.request.body)
  ctx.body = ctx.request.body
  // await next()
  next()
})

app.use(router.routes())

app.listen(5000, ()=> {
  console.log('listen at 5000')
})
