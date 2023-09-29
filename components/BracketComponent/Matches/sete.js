import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client';
import axios from 'axios';
import { toast } from "react-toastify";
import styles from './sete.module.css'
import { bottom } from '@popperjs/core';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ScoreModal from '../../ScoreModal';

const SetE = ({ participantsCount, bracketFS, categorykey, categorySet, tournamentInfo, reParticipants }) => {
  const matchWinners = {
    matchA: null,
    matchB: null,
    matchC: null,
    matchD: null,
    matchE: null,
    matchF: null,
    matchG: null,
    matchH: null,
    matchI: null,
  };

  const scores = {
    matchA: { player1: '0', player2: '0' },
    matchB: { player1: '0', player2: '0' },
    matchC: { player1: '0', player2: '0' },
    matchD: { player1: '0', player2: '0' },
    matchE: { player1: '0', player2: '0' },
    matchF: { player1: '0', player2: '0' },
    matchG: { player1: '0', player2: '0' },
    matchH: { player1: '0', player2: '0' },
    matchI: { player1: '0', player2: '0' },
  };

  const initialMatches = {
    tournamentInfo: { tournamentName: tournamentInfo.eventName, tournamentCategory: tournamentInfo.title, status: 'open' },
    // standings: {
    //   firstPlace: {standing: null, participant: null},
    //   secondPlace: {standing: null, participant: null},
    //   thirdPlace: [{standing: null, participant: null}],
    //   lastPlace: [{standing: null, participant: null}],
    // },
    matchA: { participant1: reParticipants.participant1.name, participant2: reParticipants.participant2.name, winner: matchWinners.matchA, score: scores.matchA, status: 'open' },
    matchB: { participant1: reParticipants.participant3.name, participant2: reParticipants.participant4.name, winner: matchWinners.matchB, score: scores.matchB, status: 'open' },
    matchC: { participant1: reParticipants.participant6.name, participant2: reParticipants.participant7.name, winner: matchWinners.matchC, score: scores.matchC, status: 'open' },
    matchD: { participant1: reParticipants.participant9.name, participant2: reParticipants.participant10.name, winner: matchWinners.matchD, score: scores.matchD, status: 'open' },
    matchE: { participant1: matchWinners.matchA, participant2: reParticipants.participant5.name, winner: matchWinners.matchE, score: scores.matchE, status: 'close' },
    matchF: { participant1: matchWinners.matchB, participant2: reParticipants.participant8.name, winner: matchWinners.matchF, score: scores.matchF, status: 'close' },
    matchG: { participant1: matchWinners.matchE, participant2: matchWinners.matchC, winner: matchWinners.matchG, score: scores.matchG, status: 'close' },
    matchH: { participant1: matchWinners.matchF, participant2: matchWinners.matchD, winner: matchWinners.matchH, score: scores.matchH, status: 'close' },
    matchI: { participant1: matchWinners.matchG, participant2: matchWinners.matchH, winner: matchWinners.matchI, score: scores.matchI, status: 'close' },
    champion: { winner: matchWinners.matchI }
  };

  const [matchDetails, setMatchDetails] = useState({});
  const [matchDetailsLocal, setMatchDetailsLocal] = useState({});
  const [role, setRole] = useState('admin');
  const [tournamentId, setTournamentId] = useState(tournamentInfo.tournamentId);
  const [tournamentSocketId, setTournamentSocketId] = useState(tournamentInfo.tournamentId + categorykey);
  const [championId, setChampionId] = useState('');
  const [pendingUpdate, setPendingUpdate] = useState({});
  const [matchKey, setMatchKey] = useState('')
  const [winnerUpdate, setWinnerUpdate] = useState(0)
  const [winnerConfirm, setWinnerConfirm] = useState(0)

  const socketRef = useRef(null); // Using ref to persist socket object

  const [show, setShow] = useState(false);

  const handleClose = () => {

    setShow(false);
    setWinnerConfirm(0);
  }

  const handleShow = (value) => {
    setWinnerUpdate(0)
    setShow(true);

    setPendingUpdate({
      [`match${value}`]: matchDetailsLocal[`match${value}`]
    })
    setMatchKey(`${value}`);
  };

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/tournamentSocket');
      const socket = io();

      socketRef.current = socket; // Set the current socket to the ref

      socket.on('connect', () => {
        // console.log('connected');
        socket.emit('join', { tournamentSocketId, role });
      });

      socket.on('match-details', (details) => {
        // console.log('Received match-details:', details);
        setMatchDetails(details)

        // Check if the received details are empty 
        if (details === 'Tournament Does Not Exist') {
          socket.emit('initialize-tournament', {
            tournamentSocketId,
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
  }, [tournamentSocketId, role]);

  useEffect(() => {
    setMatchDetailsLocal(matchDetails)
  }, [matchDetails])


  const onSaveTournamentData = () => {
    console.log('called saving tournament');

    socketRef.current.emit('get-all-matches', tournamentSocketId)

    socketRef.current.on('all-matches-details', (details) => {

      // console.log('Received updated all-match-details, Ready for save:', details);
      setMatchDetails(details)
    });

    const { champion, tournamentInfo, ...matchDetailsWithoutChampion } = matchDetails;

    // Remove the champion field from the matchDetails object

    const formData = new FormData();
    formData.append('tournamentId', tournamentId);
    formData.append('tournamentSocketId', tournamentSocketId);
    formData.append('championId', championId);
    formData.append('champion', champion.winner);
    formData.append('matchDetails', JSON.stringify(matchDetailsWithoutChampion));
    formData.append('participantList', JSON.stringify(reParticipants));

    // console.log('tournamentSocketId', tournamentSocketId);
    // console.log('championId', championId);
    // console.log('champion', champion.winner);
    // console.log('matchDetails', JSON.stringify(matchDetailsWithoutChampion));
    // console.log('participantList', JSON.stringify(reParticipants));

    const functionSaveResult = axios.post(`../../../../api/createTournamentResult`, formData);
    toast.promise(
      functionSaveResult,
      {
        pending: 'Saving Event',
        success: 'Event saved successfully! 👌',
        error: 'Error saving event 🤯'
      }
    ).then(
      (response) => {
        if (response.status === 201) {
          // Navigate to another page (e.g., the home page)
          //    setTimeout(() => {
          //     router.push('/event');
          // }, 3000);
          socketRef.current.emit('close-tournament',
          {
            tournamentSocketId,
            role
          });
        socketRef.current.on('match-details', (details) => {
          // console.log('Received updated match-details:', details);
          setMatchDetails(details);
        });


          console.log('reponse.status 201, success');
        }
      }
    ).catch((error) => {
      console.log('Error submitting form', error);
    })

  }

  const onEndTournament = () => {
    socketRef.current.emit('end-tournament', tournamentSocketId)
    socketRef.current.on('tournament-ended', (details) => {

      console.log('Received all left match-details:', details);
    });
  }

  const onPostTournamentData = () => {
    socketRef.current.emit('post-tournament-data', tournamentSocketId)
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
            tournamentSocketId,
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
      case 'matchB':
        socketRef.current.emit('update-participant',
          {
            tournamentSocketId,
            matchKey: 'matchF',
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
            tournamentSocketId,
            matchKey: 'matchG',
            participantSide: 'participant2',
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
            tournamentSocketId,
            matchKey: 'matchH',
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
            tournamentSocketId,
            matchKey: 'matchG',
            participantSide: 'participant1',
            player: player,
            role
          });
        socketRef.current.on('match-details', (details) => {
          // console.log('Received updated match-details:', details);
          setMatchDetails(details);
        });
        return;
      case 'matchF':
        socketRef.current.emit('update-participant',
          {
            tournamentSocketId,
            matchKey: 'matchH',
            participantSide: 'participant1',
            player: player,
            role
          });
        socketRef.current.on('match-details', (details) => {
          // console.log('Received updated match-details:', details);
          setMatchDetails(details);
        });
        return;
      case 'matchG':
        socketRef.current.emit('update-participant',
          {
            tournamentSocketId,
            matchKey: 'matchI',
            participantSide: 'participant1',
            player: player,
            role
          });
        socketRef.current.on('match-details', (details) => {
          // console.log('Received updated match-details:', details);
          setMatchDetails(details);
        });
        return;
      case 'matchH':
        socketRef.current.emit('update-participant',
          {
            tournamentSocketId,
            matchKey: 'matchI',
            participantSide: 'participant2',
            player: player,
            role
          });
        socketRef.current.on('match-details', (details) => {
          // console.log('Received updated match-details:', details);
          setMatchDetails(details);
        });
        return;
      case 'matchI':
        for (let key in reParticipants) {
          if (reParticipants[key].name === player) {
            setChampionId(reParticipants[key].id);
            break;
          }
        }
        socketRef.current.emit('update-participant',
          {
            tournamentSocketId,
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

  const onPostWinnerHandler = (matchKey, updatedWinner) => {
    const matchDataLocal = updatedWinner[matchKey];
    let matchWinner = matchDataLocal.winner;


    if (matchDataLocal.winner === null) {
      // matchWinner = matchDataLocal.participant1;
      toast.warning('Choose a winner')
      return;
    }

    socketRef.current.emit('update-winner',
      {
        tournamentSocketId,
        matchKey,
        matchWinner,
        role
      });

    socketRef.current.on('match-details', (details) => {
      // console.log('Received updated match-details:', details);
      setMatchDetails(details);
    });


    updateParticipants(matchKey, matchWinner);
    toast.success('Winner updated successfully!');

    // Handle errors if you added error handling
    // toast.error('Failed to update winner.');


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

  const onPostScoreHandler = (matchKey, updatedScore) => {
    const matchDataLocal = updatedScore[`match${matchKey}`];
    const matchScores = matchDataLocal.score;

    // toast.warning('Saving Scores');

    const updateScorePromise = new Promise((resolve, reject) => {
      // Emit the 'update-score' event
      socketRef.current.emit('update-score', {
        tournamentSocketId,
        matchKey: 'match' + matchKey,
        matchScores,
        role
      });

      socketRef.current.on('match-details', (details) => {
        resolve(details); // Resolve the promise when details are received
      });

      // Optional: you can add error handling and reject the promise if needed
      // socketRef.current.on('error-event', (error) => {
      //   reject(error);
      // });
    });

    updateScorePromise
      .then((details) => {
        setMatchDetails(details);
        toast.success('Scores updated successfully!');
      })
      .catch((error) => {
        // Handle errors if you added error handling
        toast.error('Failed to update scores.');
      });
  };


  const handleUpdate = (e, matchKey, winnerUpdate) => {

    if (winnerUpdate === 0) {
      setMatchDetailsLocal((prevDetails) => {
        const updatedScore = {
          ...prevDetails,
          [`match${matchKey}`]: {
            ...prevDetails[`match${matchKey}`],
            score: pendingUpdate[`match${matchKey}`]?.score
          }
        };

        // Call your handler here with the updated details
        onPostScoreHandler(matchKey, updatedScore);

        return updatedScore;
      });

      setShow(false);
    }

    if (winnerUpdate === 1) {

      if (pendingUpdate?.[`match${matchKey}`]?.winner === null) {
        toast.warning('Please Select a winner')

        return;
      }

      setWinnerConfirm(1)

    }

    if (winnerUpdate === 1 && winnerConfirm === 1) {

      if (pendingUpdate?.[`match${matchKey}`]?.winner === null) {
        toast.warning('Please Select a winner')

        return;
      }

      setMatchDetailsLocal((prevDetails) => {
        const updatedWinner = {
          ...prevDetails,
          [`match${matchKey}`]: {
            ...prevDetails[`match${matchKey}`],
            winner: pendingUpdate[`match${matchKey}`]?.winner
          }
        };
        onPostWinnerHandler('match' + matchKey, updatedWinner)

        return updatedWinner;
      })

      // console.log('matchKey', 'match'+matchKey);
      setShow(false);
    }

  };

  // // console.log('matchDetailsLocal', matchDetailsLocal);
  // console.log('matchDetails', matchDetails);
  return (
    <>
      <div className={`${styles.rowWidth}`}>
        <button type="button" onClick={onSaveTournamentData}
          className={`btn btn-outline-danger ${matchDetailsLocal?.tournamentInfo?.status !== 'closed' ? (matchDetailsLocal?.champion?.winner !== null ? (!bracketFS ? styles.endBtn : styles.endBtnFS) : styles.xEndBtn) : styles.xEndBtn} `}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stop-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"></path>
          </svg>
          End Tournament
        </button>

        <table className={`table table-dark ${!bracketFS ? styles.table : styles.tableFS}`}>
          <thead>
            <tr>
              <th className={`${styles.thead}`}>Round 1</th>
              <th></th>
              <th className={`${styles.thead}`}>Round 2</th>
              <th></th>
              <th className={`${styles.thead}`}>Round 3 / Semi Finals</th>
              <th></th>
              <th className={`${styles.thead}`}>Round 4 / Grand Finals</th>
              {matchDetailsLocal?.champion?.winner &&
                <th className={`${!bracketFS ? styles.headerChamp : styles.headerChampFS}`}>Champion</th>
              }
            </tr>
          </thead>
          <tbody>
            <tr >
              <td
                className={`${matchDetailsLocal?.matchA?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                onClick={() =>
                  `${matchDetailsLocal?.matchA?.status === 'open' ? handleShow('A') : null}`}>
                {matchDetailsLocal?.matchA && (
                  <React.Fragment key='matchA'>
                    <div className={`${styles.participantsWrapperTop}`}>
                      <div className={`${styles.participants}`}>
                        {/* Participant 1*/}
                        {matchDetailsLocal.matchA.participant1}
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchA?.winner ? (matchDetailsLocal?.matchA?.winner === matchDetailsLocal?.matchA?.participant1 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchA.score.player1}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>A</small></div>
                    <div className={`${styles.participantsWrapperBottom}`}>
                      <div className={`${styles.participants}`}>
                        {/* Participant 2*/}
                        {matchDetailsLocal.matchA.participant2}
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchA?.winner ? (matchDetailsLocal?.matchA?.winner === matchDetailsLocal?.matchA?.participant2 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchA.score.player2}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </td>
              <td>
                <svg height="100" width="100">
                  {/* <path d="M50 24.5 H80 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path> */}
                  <line x1="0" y1="24.5" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
                </svg>
              </td>
              <td
                className={`${matchDetailsLocal?.matchE?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                onClick={() =>
                  `${matchDetailsLocal?.matchE?.status === 'open' ? handleShow('E') : null}`}>
                {matchDetailsLocal?.matchE && (
                  <React.Fragment key='matchE'>
                    <div className={`${styles.participantsWrapperTop}`}>
                      <div className={`${styles.participants}`}>
                        {matchDetailsLocal.matchE.participant1 ?
                          matchDetailsLocal.matchE.participant1 :
                          <p className={`${styles.standByText} ${styles.pmb}`}>
                            <small>
                              Match A winner
                            </small>
                          </p>
                        }
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchE?.winner ? (matchDetailsLocal?.matchE?.winner === matchDetailsLocal?.matchE?.participant1 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchE.score.player1}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>E</small></div>
                    <div className={`${styles.participantsWrapperBottom}`}>
                      <div className={`${styles.participants}`}>
                        {matchDetailsLocal.matchE.participant2}
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchE?.winner ? (matchDetailsLocal?.matchE?.winner === matchDetailsLocal?.matchE?.participant2 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchE.score.player2}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </td>
              <td className={`${styles.matchtoF}`}>
                <svg height={`${!bracketFS ? "78" : "165"}`} width="50" style={{
                  position: `${!bracketFS ? "relative" : "absolute"}`
                }} >
                  <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d={`${!bracketFS ? "M100 80 H30 V24.5 H0" : "M110 165 H30 V24.5 H0"}`}></path>
                </svg>
              </td>
            </tr>
            <tr >
              <td></td>
              <td></td>
              <td
                className={`${matchDetailsLocal?.matchC?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                onClick={() =>
                  `${matchDetailsLocal?.matchC?.status === 'open' ? handleShow('C') : null}`}>
                {matchDetailsLocal?.matchC && (
                  <React.Fragment key='matchC'>
                    <div className={`${styles.participantsWrapperTop}`}>
                      <div className={`${styles.participants}`}>
                        {/* Participant 1*/}
                        {matchDetailsLocal.matchC.participant1}
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchC?.winner ? (matchDetailsLocal?.matchC?.winner === matchDetailsLocal?.matchC?.participant1 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchC.score.player1}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>C</small></div>
                    <div className={`${styles.participantsWrapperBottom}`}>
                      <div className={`${styles.participants}`}>
                        {/* Participant 2*/}
                        {matchDetailsLocal.matchC.participant2}
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchC?.winner ? (matchDetailsLocal?.matchC?.winner === matchDetailsLocal?.matchC?.participant2 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchC.score.player2}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </td>
              <td className={`${styles.matchBelowBracketA}`}>
                <svg height="70" width="110">
                  <path d="M110 0 H30 V53.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                </svg>
              </td>
              <td
                className={`${styles.matchG} ${matchDetailsLocal?.matchG?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                onClick={() =>
                  `${matchDetailsLocal?.matchG?.status === 'open' ? handleShow('G') : null}`}>
                {matchDetailsLocal?.matchG && (
                  <React.Fragment key='matchG'>
                    <div className={`${styles.participantsWrapperTop}`}>
                      <div className={`${styles.participants}`}>
                        {matchDetailsLocal.matchG.participant1 ?
                          matchDetailsLocal.matchG.participant1 :
                          <p className={`${styles.standByText} ${styles.pmb}`}>
                            <small>
                              Match E winner
                            </small>
                          </p>
                        }
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchG?.winner ? (matchDetailsLocal?.matchG?.winner === matchDetailsLocal?.matchG?.participant1 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchG.score.player1}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>G</small></div>
                    <div className={`${styles.participantsWrapperBottom}`}>
                      <div className={`${styles.participants}`}>
                        {matchDetailsLocal.matchG.participant2 ?
                          matchDetailsLocal.matchG.participant2 :
                          <p className={`${styles.standByText} ${styles.pmb}`}>
                            <small>
                              Match C winner
                            </small>
                          </p>
                        }
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchG?.winner ? (matchDetailsLocal?.matchG?.winner === matchDetailsLocal?.matchG?.participant2 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchG.score.player2}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </td>
              <td className={`${styles.matchtoH}`}>
                <svg height="110" width="50">
                  <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M100 110 H30 V0 H0"></path>
                </svg>
              </td>
              <td
                className={`${styles.grandFinals} ${matchDetailsLocal?.matchI?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                onClick={() =>
                  `${matchDetailsLocal?.matchI?.status === 'open' ? handleShow('I') : null}`}>
                {matchDetailsLocal?.matchI && (
                  <React.Fragment key='matchI'>
                    <div className={`${styles.participantsWrapperTop}`}>
                      <div className={`${styles.participants}`}>
                        {matchDetailsLocal.matchI.participant1 ?
                          matchDetailsLocal.matchI.participant1 :
                          <p className={`${styles.standByText} ${styles.pmb}`}>
                            <small>
                              Match G winner
                            </small>
                          </p>
                        }
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchI?.winner ? (matchDetailsLocal?.matchI?.winner === matchDetailsLocal?.matchI?.participant1 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchI.score.player1}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>I</small></div>
                    <div className={`${styles.participantsWrapperBottom}`}>
                      <div className={`${styles.participants}`}>
                        {matchDetailsLocal.matchI.participant2 ?
                          matchDetailsLocal.matchI.participant2 :
                          <p className={`${styles.standByText} ${styles.pmb}`}>
                            <small>
                              Match H winner
                            </small>
                          </p>
                        }
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchI?.winner ? (matchDetailsLocal?.matchI?.winner === matchDetailsLocal?.matchI?.participant2 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchI.score.player2}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </td>
              {matchDetailsLocal?.champion?.winner && (
                <td className={`${!bracketFS ? styles.champion : styles.championFS}`}>
                  {matchDetailsLocal?.champion?.winner && (
                    <React.Fragment key='matchB'>
                      <div className={`${styles.participants}`}>
                        <h5>
                          <strong>
                            {matchDetailsLocal.champion.winner}
                          </strong>
                        </h5>
                      </div>
                    </React.Fragment>
                  )}
                </td>
              )}
            </tr>
            <tr >
              <td className={`${matchDetailsLocal?.matchB?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                onClick={() =>
                  `${matchDetailsLocal?.matchB?.status === 'open' ? handleShow('B') : null}`}>
                {matchDetailsLocal?.matchB && (
                  <React.Fragment key='matchB'>
                    <div className={`${styles.participantsWrapperTop}`}>
                      <div className={`${styles.participants}`}>
                        {/* Participant 1*/}
                        {matchDetailsLocal.matchB.participant1}
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchB?.winner ? (matchDetailsLocal?.matchB?.winner === matchDetailsLocal?.matchB?.participant1 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchB.score.player1}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>B</small></div>
                    <div className={`${styles.participantsWrapperBottom}`}>
                      <div className={`${styles.participants}`}>
                        {/* Participant 2*/}
                        {matchDetailsLocal.matchB.participant2}
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchB?.winner ? (matchDetailsLocal?.matchB?.winner === matchDetailsLocal?.matchB?.participant2 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchB.score.player2}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </td>
              <td>
                <svg height="100" width="100">
                  {/* <path d="M50 24.5 H80 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path> */}
                  <line x1="0" y1="24.5" x2="100" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
                </svg>
              </td>
              <td className={`${matchDetailsLocal?.matchF?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                onClick={() =>
                  `${matchDetailsLocal?.matchF?.status === 'open' ? handleShow('F') : null}`}>
                {matchDetailsLocal?.matchF && (
                  <React.Fragment key='matchF'>
                    <div className={`${styles.participantsWrapperTop}`}>
                      <div className={`${styles.participants}`}>
                        {matchDetailsLocal.matchF.participant1 ?
                          matchDetailsLocal.matchF.participant1 :
                          <p className={`${styles.standByText} ${styles.pmb}`}>
                            <small>
                              Match B winner
                            </small>
                          </p>
                        }
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchF?.winner ? (matchDetailsLocal?.matchF?.winner === matchDetailsLocal?.matchF?.participant1 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchF.score.player1}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>F</small></div>
                    <div className={`${styles.participantsWrapperBottom}`}>
                      <div className={`${styles.participants}`}>
                        {matchDetailsLocal.matchF.participant2}
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchF?.winner ? (matchDetailsLocal?.matchF?.winner === matchDetailsLocal?.matchF?.participant2 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchF.score.player2}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </td>
              <td className={`${styles.matchtoF}`}>
                <svg height="78" width="50">
                  <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M100 80 H30 V24.5 H0"></path>
                </svg>
              </td>

              <td className={`${styles.matchH} ${matchDetailsLocal?.matchH?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                onClick={() =>
                  `${matchDetailsLocal?.matchH?.status === 'open' ? handleShow('H') : null}`}>
                {matchDetailsLocal?.matchH && (
                  <React.Fragment key='matchH'>
                    <div className={`${styles.participantsWrapperTop}`}>
                      <div className={`${styles.participants}`}>
                        {matchDetailsLocal.matchH.participant1 ?
                          matchDetailsLocal.matchH.participant1 :
                          <p className={`${styles.standByText} ${styles.pmb}`}>
                            <small>
                              Match F winner
                            </small>
                          </p>
                        }
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchH?.winner ? (matchDetailsLocal?.matchH?.winner === matchDetailsLocal?.matchH?.participant1 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchH.score.player1}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>H</small></div>
                    <div className={`${styles.participantsWrapperBottom}`}>
                      <div className={`${styles.participants}`}>
                        {matchDetailsLocal.matchH.participant2 ?
                          matchDetailsLocal.matchH.participant2 :
                          <p className={`${styles.standByText} ${styles.pmb}`}>
                            <small>
                              Match D winner
                            </small>
                          </p>
                        }
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchH?.winner ? (matchDetailsLocal?.matchH?.winner === matchDetailsLocal?.matchH?.participant2 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchH.score.player2}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </td>
              <td className={`${styles.matchBelowBracketB}`}>
                <svg height={`${!bracketFS ? "110" : "210"}`} width="50" style={{
                  position: `${!bracketFS ? "relative" : "absolute"}`,
                  bottom: `${!bracketFS ? "0" : "79"}`,
                  zIndex: `${!bracketFS ? "0" : "5"}`
                }} >
                  <path
                    d={`${!bracketFS ? "M50.5 0 H30 V110 H0" : "M110 0 H30 V210 H0"}`}
                    id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                </svg>
              </td>
            </tr>
            <tr>

            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className={`${styles.matchD} ${matchDetailsLocal?.matchD?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                onClick={() =>
                  `${matchDetailsLocal?.matchD?.status === 'open' ? handleShow('D') : null}`}>
                {matchDetailsLocal?.matchD && (
                  <React.Fragment key='matchD'>
                    <div className={`${styles.participantsWrapperTop}`}>
                      <div className={`${styles.participants}`}>
                        {/* Participant 1*/}
                        {matchDetailsLocal.matchD.participant1}
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchD?.winner ? (matchDetailsLocal?.matchD?.winner === matchDetailsLocal?.matchD?.participant1 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchD.score.player1}
                        </p>
                      </div>
                    </div>
                    <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>D</small></div>
                    <div className={`${styles.participantsWrapperBottom}`}>
                      <div className={`${styles.participants}`}>
                        {/* Participant 2*/}
                        {matchDetailsLocal.matchD.participant2}
                        <p className={`${styles.score}
                         ${matchDetailsLocal?.matchD?.winner ? (matchDetailsLocal?.matchD?.winner === matchDetailsLocal?.matchD?.participant2 ? styles.winner : '') : ''}
                        `}
                        >
                          {matchDetailsLocal.matchD.score.player2}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </td>
              <td className={`${styles.matchBelowBracketC}`}>
                <svg height={`${!bracketFS ? "70" : "150"}`} width="110" style={{
                  position: `${!bracketFS ? "relative" : "absolute"}`,
                  bottom: `${!bracketFS ? "0" : "21"}`
                }} >
                  <path
                    d={`${!bracketFS ? "M110 0 H30 V53.5 H0" : "M110 0 H30 V133 H0"}`}

                    id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div >

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Score Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ScoreModal
            tournamentSocketId={tournamentSocketId}
            pendingUpdate={pendingUpdate}
            setPendingUpdate={setPendingUpdate}
            matchKey={matchKey}
            winnerUpdate={winnerUpdate}
            onChangeScoreHandler={onChangeScoreHandler}
            winnerConfirm={winnerConfirm} />
        </Modal.Body>
        <Modal.Footer>
          <Button className={`${styles.updateWinnerButton}`} variant={`${winnerUpdate === 0 ? "danger" : "secondary"}`} onClick={() => winnerConfirm === 1 ? setWinnerConfirm(0) : setWinnerUpdate(winnerUpdate === 1 ? 0 : 1)}>
            {winnerUpdate === 0 ? 'Winner Update' :
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
                </svg>
                {winnerConfirm === 1 ? 'Choose Again' : 'Back to Score'}
              </>
            }
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className={`${winnerUpdate === 0 ? 'default' : pendingUpdate?.[`match${matchKey}`]?.winner !== null ? 'default' : 'disabled'}`} variant="primary" onClick={(e) => handleUpdate(e, matchKey, winnerUpdate)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SetE;