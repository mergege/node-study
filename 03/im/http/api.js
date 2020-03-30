const http = require('http')
const fs = require('fs')

http
  .createServer((req, res) => {
    // console.log('接收到前端的请求')
    // // 用end响应前端请求返回数据
    // console.log(getProtoTypeChain(res))
    // res.end('hello node')
    // 读取index.html
    const { url, method, headers } = req
    console.log(url, method)
    if (url === '/' && method === 'GET') {
      fs.readFile('./index.html', (err, data) => {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain;charset=utf-8'
          }) //返回的500：服务器错误，有中文并且是utf-8
          res.end('500: 服务器错误')
          return
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(data)
      })
    } else if (url === '/api/users' && method === 'GET') {
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.setHeader('Set-Cookie','cookie=va222222')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      console.log('接口返回了数据')
      res.end(JSON.stringify([{ name: 'tom' }]))
    } else if(method === 'OPTIONS' && url === '/api/users'){
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Token')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.end()
    } else if(method === 'POST' && url === '/api/save'){
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      let reqData = []
      let size = 0
      req.on('data', data => {
        reqData.push(data)
        size += data.length
      })
      req.on('end', () => {
        let data = Buffer.concat(reqData, size)
        console.log('data:'+ data)
        res.end(`formData:${data.toString()}`)
      })
    }
  })
  .listen(4000, ()=> {
    console.log('listen at 4000')
  })

// 获取原型链
function getProtoTypeChain(obj) {
  const protoChain = []
  while ((obj = Object.getPrototypeOf(obj))) {
    protoChain.push(obj)
  }
  console.log(protoChain)
}
