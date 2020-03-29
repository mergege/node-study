const delay = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
}

async function fn() {
  console.log(1111)
  await delay()
  console.log(22222)
}

fn()
