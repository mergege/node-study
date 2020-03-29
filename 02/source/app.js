const KKB = require('./kkb')

const app = new KKB()

// app.use((req, res) => {
//   res.end('hello KKB_koa')
// })
// app.use(ctx => {
//   ctx.body = 'haha'
// })

// const delay = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, 3000)
//   })
// }
// 这个方法怎么不生效
// const delay = () => new Promise(resolve => setTimeout(resolve(), 3000))

// console.log(delay())
// app.use(async (ctx, next) => {
//   ctx.body = '1'
//   await next()
//   ctx.body += '5'
// })

// app.use(async (ctx, next) => {
//   ctx.body += '2'
//   console.log(22222222)
//   await delay()
//   console.log(11111)
//   await next()
//   ctx.body += '4'
// })

// app.use(async (ctx, next) => {
//   ctx.body += '3'
//   await next()
// })

const static = require('./static')
app.use(static(__dirname + '/public'))

const Router = require('./router')
const router = new Router()
router.get('/index', async ctx => {
  ctx.body = 'index page'
})
router.get('/post', async ctx => {
  ctx.body = 'post page'
})
router.get('/list', async ctx => {
  ctx.body = 'list page'
})
router.post('/index', async ctx => {
  ctx.body = 'post page'
})
app.use(router.routes())
app.listen(3000, () => {
  console.log('listen at 3000')
})
