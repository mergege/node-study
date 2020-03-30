const express = require('express')

const server = express.createServer()
server.use(express.static(__dirname + '/'))
server.listen(3000)
