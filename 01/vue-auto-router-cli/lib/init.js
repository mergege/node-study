const { promisify } = require('util')
// figlet不是异步方法,优化打印界面的库
const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk') // 打印的日志的粉笔库，颜色

// 定一个log方法，所有日志都要粉笔一下
const log = content => console.log(chalk.green(content))
const { clone } = require('./download')

module.exports = async name => {
  // 打印欢迎界面
  clear()
  const data = await figlet('KKB welCome') // 封装一下日志内容的东西
  log(data)
  // 克隆git项目
  clone('github:su37josephxia/vue-template', name)
  // 安装依赖
  log('安装依赖')
}
/**
 * 子进程安装依赖并打印日志
 * @param  {...any} args
 */
// 安装依赖 spwan子进程安装依赖不会输出依赖，所以要写方法对接，日志是流的方式
function spwan(...args) {
  // 子进程库，用来安装依赖
  const { spwan } = require('child_process')
  return new Promise(resolve => {
    const childProc = spwan(...args)
    childProc.stdout.pipe(process.stdout)
    childProc.stderr.pipe(process.stderr)
    // 子进程完成的事件监听
    childProc.on('close', () => {
      resolve()
    })
  })
}
