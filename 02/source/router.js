class Router {
  constructor() {
    this.stack = []
  }
  register(method, path, middleware) {
    let route = { method, path, middleware }
    this.stack.push(route)
  }
  get(path, middleware) {
    this.register('get', path, middleware)
  }
  post(path, middleware) {
    this.register('post', path, middleware)
    // console.log(this.stack)
  }
  routes() {
    let stack = this.stack
    return async function(ctx, next) {
      let currentPath = ctx.url
      let route
      stack.forEach(item => {
        console.log(currentPath, item.path, item.method)
        if (
          item.path === currentPath &&
          ctx.method.indexOf(item.method) !== -1
        ) {
          route = item.middleware
        }
      })
      if (typeof route === 'function') {
        // console.log(route.toString())
        route(ctx, next)
        // console.log('ctx.body', ctx.body)
        return
      }
      await next()
    }
  }
}

module.exports = Router
