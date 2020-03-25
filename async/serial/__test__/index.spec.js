const { callBack } = require('../index')
test('callBack', done => {
  callBack()
  setTimeout(done, 1000)
})
