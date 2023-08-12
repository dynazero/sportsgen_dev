import { Server } from 'socket.io'

let latestMsg = ''; // stores the latest message

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.emit('update-input', latestMsg) // send the latest input value to the newly connected client
      
      socket.on('input-change', msg => {
        latestMsg = msg // update the latest message
        socket.broadcast.emit('update-input', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler
