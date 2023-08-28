import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { toast } from "react-toastify";


const matchWinners = {
  matchA: null,
  matchB: null,
  matchC: null,
  matchD: null,
  matchE: null
};

const scores = {
  matchA: { player1: '0', player2: '0' },
  matchB: { player1: '0', player2: '0' },
  matchC: { player1: '0', player2: '0' },
  matchD: { player1: '0', player2: '0' },
  matchE: { player1: '0', player2: '0' }
};

const initialParticipants = {
  participant1: 'Ali',
  participant2: 'Habibi',
  participant3: 'Butterbean',
  participant4: 'Genki',
  participant5: 'Inoue',
  participant6: 'Conor',
};

const initialMatches = {
  matchA: { participant1: initialParticipants.participant1, participant2: initialParticipants.participant2, winner: matchWinners.matchA, score: scores.matchA },
  matchB: { participant1: initialParticipants.participant3, participant2: initialParticipants.participant4, winner: matchWinners.matchB, score: scores.matchB },
  matchC: { participant1: matchWinners.matchA, participant2: initialParticipants.participant5, winner: matchWinners.matchC, score: scores.matchC },
  matchD: { participant1: matchWinners.matchB, participant2: initialParticipants.participant6, winner: matchWinners.matchD, score: scores.matchD },
  matchE: { participant1: matchWinners.matchC, participant2: matchWinners.matchD, winner: matchWinners.matchE, score: scores.matchE },
  champion: { winner: matchWinners.matchE }
};

const Home = () => {
  const [matchDetails, setMatchDetails] = useState({});
  const [matchDetailsLocal, setMatchDetailsLocal] = useState({});
  const [role, setRole] = useState('admin');
  const [tournamentId, setTournamentId] = useState('647c8773c559dc4ad09dac22');
  const [championId, setChampionId] = useState('6481fbe428dea4e4e8701827');
  const socketRef = useRef(null); // Using ref to persist socket object

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
        // console.log('Received match-details:', details);
        setMatchDetails(details)

        // Check if the received details are empty 
        if (details === 'Tournament Does Not Exist') {
          socket.emit('initialize-tournament', {
            tournamentId,
            initialMatches,
            role
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

  useEffect(() => {
    setMatchDetailsLocal(matchDetails)
  }, [matchDetails])

  
  const onSaveTournamentData = () => {
    console.log('called save tournament');

    socketRef.current.emit('get-all-matches',tournamentId)

    socketRef.current.on('all-matches-details', (details) => {
      
      console.log('Received updated all-match-details, Ready for save:', details);
      setMatchDetails(details)
    });

    console.log('matchDetails', matchDetails);

     // Remove the champion field from the matchDetails object
  const { champion, ...matchDetailsWithoutChampion } = matchDetails;

    const formData = new FormData();
    formData.append('tournamentId', tournamentId);
    formData.append('championId', championId);
    formData.append('champion', champion.winner);
    formData.append('matchDetails', JSON.stringify(matchDetailsWithoutChampion));

    console.log('matchDetailsWithoutChampion', matchDetailsWithoutChampion);


    const functionThatReturnPromise = axios.post(`../api/createTournamentResult`, formData);
    toast.promise(
        functionThatReturnPromise,
        {
            pending: 'Creating Event',
            success: 'Event created successfully! 👌',
            error: 'Error creating event 🤯'
        }
    ).then(
      (response) => {
        if (response.status === 201) { 
           // Navigate to another page (e.g., the home page)
        //    setTimeout(() => {
        //     router.push('/event');
        // }, 3000);
        console.log('reponse.status 201, success');
        }
      }
    ).catch((error) => {
      console.log('Error submitting form', error);
    })


  }

  const onEndTournament = () => {
    socketRef.current.emit('end-tournament',tournamentId)
    socketRef.current.on('tournament-ended', (details) => {
      
      console.log('Received all left match-details:', details);
    });
  }

  const onPostTournamentData = () => {
    socketRef.current.emit('post-tournament-data',tournamentId)
    socketRef.current.on('all-match-details', (details) => {
      
      console.log('Received updated all-match-details:', details);
    });
  }


  const updateParticipants = (matchKey, player) => {

    // console.log('called update participants', matchKey, player, role);
    switch (matchKey) {
      case 'matchA':
        socketRef.current.emit('update-participant',
          {
            tournamentId,
            matchKey: 'matchC',
            participantSide: 'participant1',
            player: player,
            role
          });
        socketRef.current.on('match-details', (details) => {
          // console.log('Received updated match-details:', details);
          setMatchDetails(details);
        });
        return;
      case 'matchB':
        socketRef.current.emit('update-participant',
          {
            tournamentId,
            matchKey: 'matchD',
            participantSide: 'participant1',
            player: player,
            role
          });
        socketRef.current.on('match-details', (details) => {
          // console.log('Received updated match-details:', details);
          setMatchDetails(details);
        });
        return;
      case 'matchC':
        socketRef.current.emit('update-participant',
          {
            tournamentId,
            matchKey: 'matchE',
            participantSide: 'participant1',
            player: player,
            role
          });
        socketRef.current.on('match-details', (details) => {
          // console.log('Received updated match-details:', details);
          setMatchDetails(details);
        });
        return;
      case 'matchD':
        socketRef.current.emit('update-participant',
          {
            tournamentId,
            matchKey: 'matchE',
            participantSide: 'participant2',
            player: player,
            role
          });
        socketRef.current.on('match-details', (details) => {
          // console.log('Received updated match-details:', details);
          setMatchDetails(details);
        });
        return;
      case 'matchE':
        socketRef.current.emit('update-participant',
          {
            tournamentId,
            matchKey: 'champion',
            participantSide: 'winner',
            player: player,
            role
          });
        socketRef.current.on('match-details', (details) => {
          // console.log('Received updated match-details:', details);
          setMatchDetails(details);
        });
        return;


    }

  }


  const onChangeWinnerHandler = (e, matchKey) => {
    const value = e.target.value;
    // console.log('called', value);

    setMatchDetailsLocal((prevDetails) => ({
      ...prevDetails,
      [matchKey]: {
        ...prevDetails[matchKey],
        winner: value
      }
    }));
  };

  const onPostWinnerHandler = (matchKey) => {
    const matchDataLocal = matchDetailsLocal[matchKey];
    let matchWinner = matchDataLocal.winner;


    if (matchDataLocal.winner === null) {
      matchWinner = matchDataLocal.participant1;
    }

    // console.log('called', matchWinner);

    socketRef.current.emit('update-winner',
      {
        tournamentId,
        matchKey,
        matchWinner,
        role
      });

    // Receive the updated match details from the server
    socketRef.current.on('match-details', (details) => {
      // console.log('Received updated match-details:', details);
      setMatchDetails(details);
    });
    updateParticipants(matchKey, matchWinner);

  };

  const onChangeScoreHandler = (e, matchKey, player) => {
    const value = e.target.value;
    setMatchDetailsLocal((prevDetails) => ({
      ...prevDetails,
      [matchKey]: {
        ...prevDetails[matchKey],
        score: {
          ...prevDetails[matchKey].score,
          [player]: value
        }
      }
    }));
  };

  const onPostScoreHandler = (matchKey) => {
    const matchDataLocal = matchDetailsLocal[matchKey];
    const matchScores = matchDataLocal.score;
    // console.log('called', matchScores);
    // console.log('params', tournamentId, matchKey, matchScores);
    // console.log('role', role);


    socketRef.current.emit('update-score',
      {
        tournamentId,
        matchKey,
        matchScores,
        role
      });

    // Receive the updated match details from the server
    socketRef.current.on('match-details', (details) => {
      // console.log('Received updated match-details:', details);
      setMatchDetails(details);
    });
  };

  // console.log('matchDetails', matchDetails.matchA?.score);
  // console.log('matchDetailsLocal', matchDetailsLocal.matchA?.score);


  return (
    <div>
      <h2>Tournament Matches</h2>
      <div style={{overflow: 'scroll', height: '80dvh'}}>
        {Object.entries(matchDetailsLocal).map(([matchKey, matchData]) => (
         matchKey !== 'champion' ? (
          <div key={matchKey}>
            <h3>Match {matchKey}</h3>
            <div className="match">
              <div>Participant 1: {matchData?.participant1}</div>
              <div>Participant 2: {matchData?.participant2}</div>
              <div>Winner:
                {matchDetails[matchKey]?.winner && (
                  <div>{`${matchDetails[matchKey].winner}`}</div>
                )}

              </div>
              <div>LocalWinner {matchData?.winner}</div>
              <select id="participants" name="participants"
                onChange={(e) => onChangeWinnerHandler(e, matchKey)}
              >
                <option defaultValue={matchData?.participant1}>{matchData?.participant1}</option>
                <option value={matchData?.participant2}>{matchData?.participant2}</option>
              </select>

              <button onClick={() => onPostWinnerHandler(matchKey)}>Post Winner</button>
              {matchDetails[matchKey]?.score && (
                <div>Score: {`${matchDetails[matchKey].score.player1} - ${matchDetails[matchKey].score.player2}`}</div>
              )}
              <div>
                player1: {matchData?.score?.player1}
                {matchDetails?.matchKey?.score?.player1}
                <input
                  type='number'
                  value={matchData?.score?.player1}
                  onChange={(e) => onChangeScoreHandler(e, matchKey, 'player1')}
                />
                <button onClick={() => onPostScoreHandler(matchKey)}>Post Score</button>
              </div>
              <div>
                player2: {matchData?.score?.player2}
                <input
                  type='number'
                  value={matchData?.score?.player2}
                  onChange={(e) => onChangeScoreHandler(e, matchKey, 'player2')}
                />
                <button onClick={() => onPostScoreHandler(matchKey)}>Post Score</button>
              </div>
            </div>
          </div>) : (
            <div key={matchKey}>
              <h3>Champion</h3>
              <div className="match">
                <div>Winner:
                  {matchDetails[matchKey]?.winner && (
                    <div>{`${matchDetails[matchKey].winner}`}</div>
                  )}
                </div>
              </div>
            </div>

          )
        ))}
      </div>

      <button onClick={() => onSaveTournamentData()}>Saving to Database</button>
      <button onClick={() => onPostTournamentData()}>Post All Tournament Data</button>
      <button onClick={() => onEndTournament()}>End Tournament</button>

    </div>
  );
}

export default Home;