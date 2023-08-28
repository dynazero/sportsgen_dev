import { Server } from 'socket.io';

let matchDetails = {
  '02': {
    matchA: { participant1: 'testParticipant1', participant2: 'testParticipant2' },
    matchB: { participant1: 'testParticipant3', participant2: 'testParticipant4' }
  }
};

const initializeSocket = (server) => {
  const io = new Server(server);
  server.io = io;

  io.on('connection', (socket) => {
    socket.on('join', (data) => handleJoin(io, socket, data));
    socket.on('post-tournament-data', (tournamentId) => handlePostData(io, socket, tournamentId));
    socket.on('update-score', (data) => handleUpdateScore(io, socket, data));
    socket.on('update-winner', (data) => handleUpdateWinner(io, socket, data));
    socket.on('update-participant', (data) => handleUpdateParticipant(io, socket, data));
    socket.on('end-tournament', (tournamentId) => handleEndTournament(io, socket, tournamentId));
    socket.on('get-all-matches', (tournamentId) => handleGetAllMatches(io, socket, tournamentId));
    socket.on('initialize-tournament', (data) => handleInitializeTournament(io, socket, data));

    socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
  });

  const handleJoin = (io, socket, { tournamentId, role }) => {
    socket.join(tournamentId);

    if (role === 'admin') {
      // Send the latest match details for that tournament 
      if (matchDetails[tournamentId] === undefined) {
        socket.emit('match-details', 'Tournament Does Not Exist');
      } else {
        socket.emit('match-details', matchDetails[tournamentId]);
      }
    }

    if (role === 'guest') {
      // Send the latest match details for that tournament 
      if (matchDetails[tournamentId] === undefined) {
        socket.emit('match-details', 'Tournament will start shortly, please stand by');
      } else {
        socket.emit('match-details', matchDetails[tournamentId]);
      }
    }

  };

  const handlePostData = (io, socket, tournamentId) => {
    console.log('Current Data', tournamentId)
    // console.log('Current Participants', matchDetails[tournamentId][matchKey].participant1, matchDetails[tournamentId][matchKey].participant2)

    console.log(matchDetails)
    // Emit the updated match details to all clients in the tournament room
    io.to(tournamentId).emit('all-match-details', matchDetails);
  };

  const handleUpdateParticipant = (io, socket, { tournamentId, matchKey, participantSide, player, role }) => {
    // console.log('Current Data', tournamentId, matchKey, participantSide, player, role)
    // console.log('Current Participants', matchDetails[tournamentId][matchKey].participant1, matchDetails[tournamentId][matchKey].participant2)
    if (role !== 'admin') {
      console.log(`Client is not an admin, skipping winner update.`);
      return;
    }


    matchDetails[tournamentId][matchKey][participantSide] = player;

    // Emit the updated match details to all clients in the tournament room
    io.to(tournamentId).emit('match-details', matchDetails[tournamentId]);
  };

  const handleUpdateWinner = (io, socket, { tournamentId, matchKey, matchWinner, role }) => {
    // console.log('Current Data', tournamentId, matchKey, matchWinner, role)
    // console.log('Current Participants', matchDetails[tournamentId][matchKey].participant1, matchDetails[tournamentId][matchKey].participant2)

    let currentParticipants = [matchDetails[tournamentId][matchKey].participant1, matchDetails[tournamentId][matchKey].participant2];

    if (role !== 'admin') {
      console.log(`Client is not an admin, skipping winner update.`);
      return;
    }

    if (!currentParticipants.includes(matchWinner)) {
      console.log('Invalid winner, skipping update.')
      return;
    }


    matchDetails[tournamentId][matchKey].winner = matchWinner;

    // Emit the updated match details to all clients in the tournament room
    io.to(tournamentId).emit('match-details', matchDetails[tournamentId]);
  };

  const handleUpdateScore = (io, socket, { tournamentId, matchKey, matchScores, role }) => {
    // console.log('Received update-score:', tournamentId, matchKey, matchScores, role)
    // console.log('Current Scores', matchDetails[tournamentId][matchKey].score)

    if (role !== 'admin') {
      console.log(`Client is not an admin, skipping score update.`);
      return;
    }

    matchDetails[tournamentId][matchKey].score = matchScores;

    // Emit the updated match details to all clients in the tournament room
    io.to(tournamentId).emit('match-details', matchDetails[tournamentId]);
  };

  const handleEndTournament = (io, socket, tournamentId) => {
    if (matchDetails[tournamentId]) {
      delete matchDetails[tournamentId];
      io.to(tournamentId).emit('tournament-ended', matchDetails);
    }
  };

  const handleGetAllMatches = (io, socket, tournamentId) => {
    socket.emit('all-matches-details', matchDetails[tournamentId] || {});
  };

  const handleInitializeTournament = (io, socket, { tournamentId, initialMatches, role }) => {
    // Check if the match details for the specified tournament already exist
    if (matchDetails[tournamentId]) {
      console.log(`Match details for tournament ${tournamentId} already exist, skipping initialization.`);
      return;
    }

    // Check if the client is an admin
    if (role !== 'admin') {
      console.log(`Client is not an admin, skipping initialization.`);
      return;
    }

    // console.log(`Initializing tournament ${tournamentId} with initial matches:`, initialMatches, 'and role:', role);
    // Initialize the tournament with the initial matches
    matchDetails[tournamentId] = initialMatches;
    io.to(tournamentId).emit('match-details', matchDetails[tournamentId]);
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