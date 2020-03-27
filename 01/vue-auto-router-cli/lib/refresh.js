const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = async () => {
  // 获取vue文件列表

  const list = fs
    .readdirSync('./src/views')
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      name: v.replace('.vue', '').toLowerCase(),
      file: v
    }))
  console.log(chalk.red(JSON.stringify(list)))

  // 生成路由定义
  // 巨坑：这里的compile的第一个参数必须与模版一致list
  compile({ list }, './src/router.js', './template/router.js.hbs')
  //生产导航App.vue
  compile({ list }, './src/App.vue', './template/App.vue.hbs')
  /**
   * 编译模版文件
   * @param {*} meta 数据定义
   * @param {*} filepath 目标文件路径
   * @param {*} templatePath 模版文件路径
   */
  function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString()
      const result = handlebars.compile(content)(meta)
      console.log(result)
      console.log(filePath)
      fs.writeFileSync('./src/aaa.js', result)
      fs.writeFileSync(filePath, result)
    }
  }
}
