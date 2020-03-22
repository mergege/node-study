const { promisify } = require('util')
module.exports.clone = async function(repo, desc) {
  // 从git下载的库
  const download = promisify(require('download-git-repo'))
  // 进度条的库
  const ora = require('ora')
  const process = ora(`下载中....${repo}`)
  process.start()
  await download(repo, desc)
  process.succeed()
}
