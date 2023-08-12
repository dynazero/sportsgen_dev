import { Server } from 'socket.io';

let matchDetails = {};

const initializeSocket = (server) => {
  const io = new Server(server);
  server.io = io;

  io.on('connection', (socket) => {
    socket.on('join', (data) => handleJoin(io, socket, data));
    socket.on('update-match', (data) => handleUpdateMatch(io, socket, data));
    socket.on('end-tournament', (tournamentId) => handleEndTournament(io, socket, tournamentId));
    socket.on('get-all-matches', (tournamentId) => handleGetAllMatches(io, socket, tournamentId));
    socket.on('initialize-tournament', ({ tournamentId, initialMatches }) => {
      if (!matchDetails[tournamentId]) {
        matchDetails[tournamentId] = initialMatches;
        // Inform all clients connected to this tournament about the initialized details
        io.to(tournamentId).emit('match-details', matchDetails[tournamentId]);
      }
    });

    socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
  });

  
};

const handleJoin = (io, socket, { tournamentId, role }) => {
  socket.join(tournamentId);

  // Send the latest match details for that tournament (if it exists)
  if (matchDetails[tournamentId]) {
    socket.emit('match-details', matchDetails[tournamentId]);
  }
};

const handleUpdateMatch = (io, socket, { tournamentId, matchId, matchData }) => {
  if (!matchDetails[tournamentId]) {
    matchDetails[tournamentId] = {};
  }
  matchDetails[tournamentId][matchId] = matchData;

  io.to(tournamentId).emit('match-details', matchDetails[tournamentId]);
};

const handleEndTournament = (io, socket, tournamentId) => {
  if (matchDetails[tournamentId]) {
    delete matchDetails[tournamentId];
    io.to(tournamentId).emit('tournament-ended', tournamentId);
  }
};

const handleGetAllMatches = (io, socket, tournamentId) => {
  socket.emit('all-matches-details', matchDetails[tournamentId] || {});
};

const SocketRoom = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    initializeSocket(res.socket.server);
  }

  res.end();
};

export default SocketRoom;
