import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'

let socket;

const Home = () => {
  const [matchDetails, setMatchDetails] = useState({});
  const [role, setRole] = useState('admin');
  const [tournamentId, setTournamentId] = useState('01');
  const socketRef = useRef(null); // Using ref to persist socket object

  const initialParticipants = {
    participant1: 'Ali',
    participant2: 'Habibi',
    participant3: 'Butterbean',
    participant4: 'Genki',
    participant5: 'Inoue',
    participant6: 'Conor',
  };

  const initialMatches = {
    matchA: { participant1: initialParticipants.participant1, participant2: initialParticipants.participant2, winner: null, score: null },
    matchB: { participant1: initialParticipants.participant3, participant2: initialParticipants.participant4, winner: null, score: null },
    matchC: { matchA: null, participant1: initialParticipants.participant5, winner: null, score: null },
    matchD: { matchB: null, participant1: initialParticipants.participant6, winner: null, score: null },
    matchE: { matchC: null, matchD: null, winner: null, score: null },
  };

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/tournamentSocket');
      const socket = io();

      socketRef.current = socket; // Set the current socket to the ref

      socket.on('connect', () => {
        console.log('connected');
        socket.emit('join', { tournamentId, role });
      });

      socket.on('match-details', (details) => {
        setMatchDetails(details);
        console.log('details', details);

        // Check if the received details are empty 
        if (Object.keys(details).length === 0) {
          socket.emit('initialize-tournament', {
            tournamentId,
            initialMatches
          });
        }
      });

      // Cleanup function to disconnect the socket when the component is unmounted.
      return () => {
        socket.disconnect();
      };
    }

    socketInitializer();
  }, [tournamentId, role]);

  const updateMatchDetailsHandler = (newDetails) => {
    if (role === 'admin' && socketRef.current) {
      socketRef.current.emit('update-match', newDetails);
    }
  };

  function Match({ matchData }) {
    return (
      <div className="match">
        <div>Participant 1: {matchData.participant1}</div>
        <div>Participant 2: {matchData.participant2}</div>
        <div>Winner: {matchData.winner || 'TBD'}</div>
        <div>Score: {matchData.score || 'TBD'}</div>
      </div>
    );
  }

  console.log('matchDetails', matchDetails);
  return (
    <div>
      <h2>Tournament Matches</h2>
      {Object.keys(matchDetails).map(matchKey => (
        <div key={matchKey}>
          <h3>Match {matchKey}</h3>
          <Match matchData={matchDetails[matchKey]} />
        </div>
      ))}
    </div>
  );
}

export default Home;