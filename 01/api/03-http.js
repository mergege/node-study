const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
  // console.log('接收到前端的请求')
  // // 用end响应前端请求返回数据
  // console.log(getProtoTypeChain(response))
  // response.end('hello node')
  // 读取index.html
  const {url, method, headers} = request
  console.log(url, method)
  if(url === '/' && method === 'GET') {
    fs.readFile('./index.html',(err, data) => {
      if(err) {
        response.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'}) //返回的500：服务器错误，有中文并且是utf-8
        response.end('500: 服务器错误')
        return
      }
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/html')
      response.end(data)
    } )
  } else if (url === '/users' && method === 'GET') {
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify([{name: 'tom'}]))
  } else if (method === 'GET' && headers.accept.indexOf('image/*') != -1) {
    console.log('请求图片')
    // response也是一个流
    fs.createReadStream('.' + url).pipe(response)
  }
})
.listen(3000)

// 获取原型链
function getProtoTypeChain(obj) {
  const protoChain = []
  while(obj = Object.getPrototypeOf(obj)) {
    protoChain.push(obj)
  }
  console.log(protoChain)
}