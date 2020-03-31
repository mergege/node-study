// tcp/ip用net包,后续会用socket.io库代替

const net = require('net')

const chatServer = net.createServer()

let clientList = []

chatServer.on('connection', client => {
  client.write('HI!\n')
  clientList.push(client)
  client.on('data', data => {
    console.log('receive', data.toString())
    clientList.forEach(v => {
      v.write(data)
    })
  })
})

chatServer.listen(9000)
