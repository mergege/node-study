const logTime = (name) => {
  const time = new Date().toLocaleDateString()
  console.log(`Log...${name} ` + time)
}

// 1

// exports.callBack = () => {
//   setTimeout(() => {
//     logTime(`callBack 1`)
//     setTimeout(() => {
//       logTime(`callBack 2`)
//     }, 100)
//   },100)
// }

// 2

const promise = (name, delay=1000) => new Promise(resolve => {
  setTimeout(() => {
    logTime(name)
    resolve()
  }, delay)
})

exports.promise = () => {
  promise('promise 1')
      .then(promise('promise 2'))
      .then(promise('promise 3'))
}

exports.generator = () => {
  function* generator(name) {
    yield promise(name + 1)
    yield promise(name + 2)
    yield promise(name + 3)
  }
  let co = generator => {
    if(it = generator.next().value) {
      it.then(res => {
        console.log(111, res)
        co(generator)
      })
    } else {
      return
    }
  }
  co(generator('co-generator'))
}

exports.asyncAwait = async () => {
  await promise('asyncAwait 1')
  await promise('asyncAwait 2')
  await promise('asyncAwait 3')
  console.log(3333333)
}
