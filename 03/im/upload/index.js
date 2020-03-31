const http = require('http')
const fs = require('fs')
const path = require('path')

let chunk = []
let size = 0
const app = http.createServer((request, response) => {
  console.log(request.url)
  const {pathname} = require('url').parse(request.url)
  if (pathname === '/upload') {
    console.log('load...')
    const fileName = request.headers['file-name'] ? request.headers['file-name'] : 'abc.png'
    const outputFile = path.resolve(__dirname, fileName)
    const fis = fs.createWriteStream(outputFile)

    // 1、管道方法
    // request.pipe(fis)
    // response.end()

    // 2、buffer方法
    // request.on('data', data=> {
    //   chunk.push(data)
    //   size += data.length
    //   console.log(size, data)
    // })
    // request.on('end', () => {
    //   let buffer = Buffer.concat(chunk, size)
    //   size = 0
    //   fs.writeFileSync(outputFile, buffer)
    //   response.end()
    // })

    // 3、流写入
    request.on('data', data => {
      fis.write(data)
    })
    request.on('end', ()=> {
      fis.end()
      response.end()
    })
  } else if (pathname === '/'){
    let data = fs.readFileSync('./index.html')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html')
    response.end(data)
  }
})
app.listen(3000)