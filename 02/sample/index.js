const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  const start = new Date().getTime()
  console.log(`1-start: ${ctx.url}`)
  await next()
  const end = new Date().getTime()
  console.log(`3-请求${ctx.url}耗时：${end - start}`)
})

app.use(async (ctx, next) => {
  ctx.body = [
    {
      name: 'tom'
    }
  ]
  console.log('2-请求中')
  await next()
})

app.listen(3000)
