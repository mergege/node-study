let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.on('chatMsg', (chatMsg)=> {
    console.log('msg:' + chatMsg)
    // socket.emit('chatMsg', chatMsg) // 用socket的话只是发送给发送者
    io.emit('chatMsg', chatMsg)
    // 或者
    // socket.broadcast.emit('chatMsg', chatMsg)
  })
  socket.on('disconnection', () => {
    console.log('a user disConnected')
  })
})



// 错误注意：这里是http.listen
// app.listen(3000, () => {
//   console.log('listen at 3000')
// })

http.listen(3000, () => {
  console.log('listen at 3000')
})