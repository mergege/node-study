const sleep = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('暂停2秒')
      resolve()
    }, 2000)
  })
}

async function asyncAwait() {
  console.log('slee之前')
  await sleep()
  console.log('sleep之后的')
}

asyncAwait()
console.log('调用方法之后')
