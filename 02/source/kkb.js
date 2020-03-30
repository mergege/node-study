// 这是koa源码

const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')

class KKB {
  constructor() {
    this.middlewares = []
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // this.callBack(res, req)

      const ctx = this.createContext(req, res)
      // this.callBack(ctx)
      const fn = this.compose(this.middlewares)
      await fn(ctx)

      res.end(ctx.body)
    })
    server.listen(...args)
  }

  // use(callBack) {
  //   this.callBack = callBack
  // }
  use(middleware) {
    this.middlewares.push(middleware)
  }

  /**
   * 创建上下文
   * @param {*} res
   * @param {*} req
   */
  createContext(req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }

  /**
   * 中间件组合
   * @param {*} middleware
   */
  compose(middleware) {
    return function(ctx) {
      return dispatch(0)
      function dispatch(i) {
        let fn = middleware[i]
        if (!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1)
          })
        )
      }
    }
  }
}

module.exports = KKB
