// const add = (x, y) => x + y
// const squre = x => x * x

// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))
// const fn = compose(
//   add,
//   squre
// )

// const compose = (...[first, ...other]) => (...args) => {
//   let ret = first(...args)
//   other.forEach(fn => {
//     ret = fn(ret)
//   })
//   return ret
// }
// const fn = compose(
//   add,
//   squre,
//   squre
// )

// const fn = (x, y) => squre(add(x, y))

// console.log(fn(1, 2))

const compose = middleware => {
  return function() {
    return dispatch(0)
    function dispatch(i) {
      let fn = middleware[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}

async function fn1(next) {
  console.log('fn1')
  await next()
  console.log('end fn1')
}

async function fn2(next) {
  console.log('fn2')
  await delay()
  await next()
  console.log('end fn2')
}

async function fn3(next) {
  console.log('fn3')
}

function delay() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

const middleware = [fn1, fn2, fn3]

const fn = compose(middleware)
fn()
