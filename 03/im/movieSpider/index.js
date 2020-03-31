// 后台发送请求的库
const originRequest = require('request')
// 编码用的库
const iconv = require('iconv-lite')
// 后台用的jqurey
const cheerio = require('cheerio')

const request = (url, callBack) => {
  const options = {
    encoding: null
  }
  originRequest(url,options,callBack)
}
// https://www.dy2018.com/i/101616.html
for(let i =101616; i < 101627; i++) {
  let url = `https://www.dy2018.com/i/${i}.html`
  request(url,(err, res,data) => {
    let html = iconv.decode(data, 'gb2312')
    let $ = cheerio.load(html)
    console.log($('.title_all h1').text())
  })
}