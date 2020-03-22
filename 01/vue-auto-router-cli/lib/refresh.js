const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = async () => {
  // 获取vue文件列表
  const vueList = fs
    .readdirSync('./src/views')
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      name: v.replace('.vue', '').toLowerCase(),
      file: v
    }))
  console.log(chalk.red(vueList))

  // 生成路由定义
  compile({ vueList }, './src/router.js', './template/router.js.hbs')
  //生产导航App.vue
  compile({ vueList }, './src/App.vue', './template/App.vue.hbs')
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
      fs.writeFileSync(filePath, result)
    }
  }
}
