const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)

// 同步读取
// const data = fs.readFileSync('./conf.js')
// console.log(data)
// console.log(data.toString())

// 异步读取：执行到readFile方法会继续下面的代码，文件会异步加载知道文件加载完成会执行回调
// fs.readFile('./conf.js', (err, data) => {
//   if(err) throw err
//   console.log(data)
// })

// nodejs有些老的方法不是异步的，需要用promisify转一下
process.nextTick(async () => {
  const data =await readFile('./conf.js')
  console.log(data.toString())
})