const logTime = name => {
  const time = new Date().toLocaleDateString()
  console.log(`${name}: ${time}`)
}

exports.callBack = () => {
  setTimeout(() => {
    logTime('callBack 111')
    setTimeout(() => {
      logTime('callBack 222')
    }, 100)
  }, 100)
}
