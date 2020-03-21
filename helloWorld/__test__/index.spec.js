test('测试helloWorld代码', () => {
  const ret = require('../index')
  // console.log('helloWorld:', helloWorld)
  expect(ret)
    .toBe('hello world1')
})