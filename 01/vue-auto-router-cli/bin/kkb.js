#!/usr/bin/env node
// 表示是用node来解析代码

const program = require('commander')
program.version(require('../package').version)

program
  .command('init <name>')
  .description('init project')
  .action(require('../lib/init'))
program.parse(program.argv)
