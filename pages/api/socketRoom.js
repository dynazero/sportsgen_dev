import { Server } from 'socket.io'

let latestMsg = ''; // stores the latest message

const SocketRoom = (req, res) => {
    if (res.socket.server.io) {
      console.log('Socket is already running')
    } else {
      console.log('Socket is initializing')
      const io = new Server(res.socket.server)
      res.socket.server.io = io
  
      io.on('connection', socket => {
        // Client sends a 'join' event when it connects, with the tournament ID and user role as data
        socket.on('join', ({tournamentId, role}) => {
          socket.join(tournamentId)
      
          if (role === 'admin') {
            socket.on('score-update', newScore => {
              // Only admins can send score updates
              io.to(tournamentId).emit('score-update', newScore)
            })
          }
        })
      })
    }
    res.end()
  }
  

export default SocketRoom;




