import { Server } from 'socket.io';

let matchDetails = {};

const initializeSocket = (server) => {
  const io = new Server(server);
  server.io = io;

  io.on('connection', (socket) => {
    socket.on('join', (data) => handleJoin(io, socket, data));
    socket.on('post-tournament-data', (tournamentSocketId) => handlePostData(io, socket, tournamentSocketId));
    socket.on('update-score', (data) => handleUpdateScore(io, socket, data));
    socket.on('update-winner', (data) => handleUpdateWinner(io, socket, data));
    socket.on('update-participant', (data) => handleUpdateParticipant(io, socket, data));
    socket.on('close-tournament', (tournamentSocketId) => handleCloseTournament(io, socket, tournamentSocketId));
    socket.on('end-tournament', (tournamentSocketId) => handleEndTournament(io, socket, tournamentSocketId));
    socket.on('get-all-matches', (tournamentSocketId) => handleGetAllMatches(io, socket, tournamentSocketId));
    socket.on('initialize-tournament', (data) => handleInitializeTournament(io, socket, data));

    socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
  });

  const handleJoin = (io, socket, { tournamentSocketId, role }) => {
    socket.join(tournamentSocketId);

    if (role === 'admin') {
      // Send the latest match details for that tournament 
      if (matchDetails[tournamentSocketId] === undefined) {
        socket.emit('match-details', 'Tournament Does Not Exist');
      } else {
        socket.emit('match-details', matchDetails[tournamentSocketId]);
      }
    }

    if (role === 'guest') {
      // Send the latest match details for that tournament 
      if (matchDetails[tournamentSocketId] === undefined) {
        socket.emit('match-details', 'Tournament will start shortly, please stand by');
      } else {
        socket.emit('match-details', matchDetails[tournamentSocketId]);
      }
    }

  };

  const handlePostData = (io, socket, tournamentSocketId) => {
    console.log('Current Data', tournamentSocketId)
    // console.log('Current Participants', matchDetails[tournamentSocketId][matchKey].participant1, matchDetails[tournamentSocketId][matchKey].participant2)

    console.log(matchDetails)
    // Emit the updated match details to all clients in the tournament room
    io.to(tournamentSocketId).emit('all-match-details', matchDetails);
  };

  const handleUpdateParticipant = (io, socket, { tournamentSocketId, matchKey, participantSide, player, role }) => {
    // console.log('Current Data', tournamentSocketId, matchKey, participantSide, player, role)
    // console.log('Current Participants', matchDetails[tournamentSocketId][matchKey].participant1, matchDetails[tournamentSocketId][matchKey].participant2)
    if (role !== 'admin') {
      console.log(`Client is not an admin, skipping winner update.`);
      return;
    }


    matchDetails[tournamentSocketId][matchKey][participantSide] = player;
    if (matchDetails[tournamentSocketId][matchKey].participant1 !== null && matchDetails[tournamentSocketId][matchKey].participant2 !== null) {
      matchDetails[tournamentSocketId][matchKey].status = 'open';
    }

    // Emit the updated match details to all clients in the tournament room
    io.to(tournamentSocketId).emit('match-details', matchDetails[tournamentSocketId]);
  };

  const handleUpdateWinner = (io, socket, { tournamentSocketId, matchKey, matchWinner, role }) => {
    // console.log('Current Data', tournamentSocketId, matchKey, matchWinner, role)
    // console.log('Current Participants', matchDetails[tournamentSocketId][matchKey].participant1, matchDetails[tournamentSocketId][matchKey].participant2)

    let currentParticipants = [matchDetails[tournamentSocketId][matchKey].participant1, matchDetails[tournamentSocketId][matchKey].participant2];

    if (role !== 'admin') {
      console.log(`Client is not an admin, skipping winner update.`);
      return;
    }

    if (!currentParticipants.includes(matchWinner)) {
      console.log('Invalid winner, skipping update.')
      return;
    }

    matchDetails[tournamentSocketId][matchKey].winner = matchWinner;
    matchDetails[tournamentSocketId][matchKey].status = 'closed';

    // Emit the updated match details to all clients in the tournament room
    io.to(tournamentSocketId).emit('match-details', matchDetails[tournamentSocketId]);
  };

  const handleUpdateScore = (io, socket, { tournamentSocketId, matchKey, matchScores, role }) => {
    // console.log('Received update-score:', tournamentSocketId, matchKey, matchScores, role)
    // console.log('Current Scores', matchDetails[tournamentSocketId][matchKey].score)

    if (role !== 'admin') {
      console.log(`Client is not an admin, skipping score update.`);
      return;
    }

    matchDetails[tournamentSocketId][matchKey].score = matchScores;

    // Emit the updated match details to all clients in the tournament room
    io.to(tournamentSocketId).emit('match-details', matchDetails[tournamentSocketId]);
  };

  const handleCloseTournament = (io, socket, {tournamentSocketId, role}) => {
    // console.log('Current Data', tournamentSocketId, matchKey, participantSide, player, role)
    // console.log('Current Participants', matchDetails[tournamentSocketId][matchKey].participant1, matchDetails[tournamentSocketId][matchKey].participant2)
    if (role !== 'admin') {
      console.log(`Client is not an admin, skipping winner update.`);
      return;
    }

    matchDetails[tournamentSocketId].tournamentInfo.status = closed;
    
    // Emit the updated match details to all clients in the tournament room
    io.to(tournamentSocketId).emit('match-details', matchDetails[tournamentSocketId]);
  };

  const handleEndTournament = (io, socket, tournamentSocketId) => {
    if (matchDetails[tournamentSocketId]) {
      delete matchDetails[tournamentSocketId];
      io.to(tournamentSocketId).emit('tournament-ended', matchDetails);
    }
  };

  const handleGetAllMatches = (io, socket, tournamentSocketId) => {
    socket.emit('all-matches-details', matchDetails[tournamentSocketId] || {});
  };

  const handleInitializeTournament = (io, socket, { tournamentSocketId, initialMatches, role }) => {
    // Check if the match details for the specified tournament already exist
    if (matchDetails[tournamentSocketId]) {
      console.log(`Match details for tournament ${tournamentSocketId} already exist, skipping initialization.`);
      return;
    }

    // Check if the client is an admin
    if (role !== 'admin') {
      console.log(`Client is not an admin, skipping initialization.`);
      return;
    }

    // console.log(`Initializing tournament ${tournamentSocketId} with initial matches:`, initialMatches, 'and role:', role);
    // Initialize the tournament with the initial matches
    matchDetails[tournamentSocketId] = initialMatches;
    io.to(tournamentSocketId).emit('match-details', matchDetails[tournamentSocketId]);
  };


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