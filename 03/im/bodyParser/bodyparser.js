// 这是bodyParser中间件：用来处理前端传过来的参数，以流的形式接受

module.exports = function bodyParser() {
  return async (ctx, next) => {
    await new Promise(resolve => { // 切记这里要创建Promise实例
      const {req, res} = ctx
      let reqData = []
      let size = 0
      req.on('data', data=>{
        reqData.push(data)
        size += data.length
      })
      req.on('end', () => {
        console.log(reqData, size)
        let data = Buffer.concat(reqData, size)
        console.log('data:'+ data)
        ctx.request.body = data.toString()
        resolve()
      })
    })
    await next()
  }
}