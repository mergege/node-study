const fs = require('fs')

//这种读取文件的方式不好就是如果图片很大，就要开辟很大的缓冲区
// fs.readFile('./01.jpg', (err, data) => {
//   console.log(data)
// })

// 创建读取文件流
const rs = fs.createReadStream('./01.jpg')
// 创建写入流
const ws = fs.createWriteStream('./02.jpg')
// 创建连接导管
rs.pipe(ws)