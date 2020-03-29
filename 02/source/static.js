const fs = require('fs')
const path = require('path')

module.exports = (dirpath = './public') => {
  return async (ctx, next) => {
    // 前端访问地址的路由是以/public开始说明是读取static文件
    console.log(`ctx.url:${ctx.url}`)
    console.log(`dirPath: ${dirpath}`)

    if (ctx.url.indexOf('/public') === 0) {
      const url = path.resolve(__dirname, dirpath)
      const fileBaseName = path.basename(url)
      const filepath = url + ctx.url.replace('/public', '')
      try {
        let stats = fs.statSync(filepath) // 判断是文件夹还是文件
        if (stats.isDirectory()) {
          const dir = fs.readdirSync(filepath)
          const ret = ['<div style="padding-left: 20px;">']

          dir.forEach(filename => {
            if (filename.indexOf('.') !== -1) {
              ret.push(
                `<p><a style="color: block" href="${ctx.url}/${filename}">${filename}</a></p>`
              )
            } else {
              // 文件夹
              ret.push(
                `<p><a href="${ctx.url}/${filename}">${filename}</a></P>`
              )
            }
          })
          ret.push(`</div>`)
          ctx.body = ret.join('')
        } else {
          const content = fs.readFileSync(filepath)
          ctx.body = content
        }
      } catch (error) {
        ctx.body = '404 not found'
      }
    } else {
      // 否则不是静态资源，去下一个中间件
      await next()
    }
  }
}
