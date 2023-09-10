import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client';
import axios from 'axios';
import { toast } from "react-toastify";
import styles from './sete.module.css'
import { bottom } from '@popperjs/core';

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
    matchA: { participant1: reParticipants.participant1.name, participant2: reParticipants.participant2.name, winner: matchWinners.matchA, score: scores.matchA },
    matchB: { participant1: reParticipants.participant3.name, participant2: reParticipants.participant4.name, winner: matchWinners.matchB, score: scores.matchB },
    matchC: { participant1: reParticipants.participant6.name, participant2: reParticipants.participant7.name, winner: matchWinners.matchC, score: scores.matchC },
    matchD: { participant1: reParticipants.participant9.name, participant2: reParticipants.participant10.name, winner: matchWinners.matchD, score: scores.matchD },
    matchE: { participant1: matchWinners.matchA, participant2: reParticipants.participant5.name, winner: matchWinners.matchE, score: scores.matchE },
    matchF: { participant1: matchWinners.matchB, participant2: reParticipants.participant8.name, winner: matchWinners.matchF, score: scores.matchF },
    matchG: { participant1: matchWinners.matchE, participant2: matchWinners.matchC, winner: matchWinners.matchG, score: scores.matchG },
    matchH: { participant1: matchWinners.matchF, participant2: matchWinners.matchD, winner: matchWinners.matchH, score: scores.matchH },
    matchI: { participant1: matchWinners.matchG, participant2: matchWinners.matchH, winner: matchWinners.matchI, score: scores.matchI },
    champion: { winner: matchWinners.matchI }
  };


  const [matchDetails, setMatchDetails] = useState({});
  const [matchDetailsLocal, setMatchDetailsLocal] = useState({});
  const [role, setRole] = useState('admin');
  const [tournamentSocketId, setTournamentSocketId] = useState(`${tournamentInfo.tournamentSocketId}${categorykey}`);
  const [championId, setChampionId] = useState('');
  const socketRef = useRef(null); // Using ref to persist socket object



  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/tournamentSocket');
      const socket = io();

      socketRef.current = socket; // Set the current socket to the ref

      socket.on('connect', () => {
        console.log('connected');
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
    // console.log('called save tournament');

    socketRef.current.emit('get-all-matches', tournamentSocketId)

    socketRef.current.on('all-matches-details', (details) => {

      console.log('Received updated all-match-details, Ready for save:', details);
      setMatchDetails(details)
    });

    console.log('matchDetails', matchDetails);

    // Remove the champion field from the matchDetails object
    const { champion, ...matchDetailsWithoutChampion } = matchDetails;

    const formData = new FormData();
    formData.append('tournamentSocketId', tournamentSocketId);
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
            tournamentSocketId,
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
      case 'matchD':
        socketRef.current.emit('update-participant',
          {
            tournamentSocketId,
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

  const onPostWinnerHandler = (matchKey) => {
    const matchDataLocal = matchDetailsLocal[matchKey];
    let matchWinner = matchDataLocal.winner;


    if (matchDataLocal.winner === null) {
      matchWinner = matchDataLocal.participant1;
    }

    // console.log('called', matchWinner);

    socketRef.current.emit('update-winner',
      {
        tournamentSocketId,
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
    // console.log('params', tournamentSocketId, matchKey, matchScores);
    // console.log('role', role);


    socketRef.current.emit('update-score',
      {
        tournamentSocketId,
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


  return (
    <div className={`${styles.rowWidth}`}>

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
            <td>
              {matchDetailsLocal?.matchA && (
                <React.Fragment key='matchA'>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      {/* Participant 1*/}
                      {matchDetailsLocal.matchA.participant1}
                      <p className={`${styles.score} ${styles.winner}`}>
                        {matchDetailsLocal.matchA.score.player1}
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>A</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      {/* Participant 2*/}
                      {matchDetailsLocal.matchA.participant2}
                      <p className={`${styles.score}`}>
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
            <td>
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
                      <p className={`${styles.score}`}>
                        {matchDetailsLocal.matchE.score.player1}
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>E</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      {matchDetailsLocal.matchE.participant2}
                      <p className={`${styles.score}`}>
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
            <td>
              {matchDetailsLocal?.matchC && (
                <React.Fragment key='matchC'>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      {/* Participant 1*/}
                      {matchDetailsLocal.matchC.participant1}
                      <p className={`${styles.score}`}>
                        {matchDetailsLocal.matchC.score.player1}
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>C</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      {/* Participant 2*/}
                      {matchDetailsLocal.matchC.participant2}
                      <p className={`${styles.score}`}>
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
            <td className={`${styles.matchG}`} >
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
                      <p className={`${styles.score}`}>
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
                      <p className={`${styles.score}`}>
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

            <td className={`${styles.grandFinals}`}>
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
                      <p className={`${styles.score}`}>
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
                      <p className={`${styles.score}`}>
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
                      {matchDetailsLocal.champion.winner}
                    </div>
                  </React.Fragment>
                )}
              </td>
            )}
          </tr>
          <tr >
            <td>
              {matchDetailsLocal?.matchB && (
                <React.Fragment key='matchB'>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      {/* Participant 1*/}
                      {matchDetailsLocal.matchB.participant1}
                      <p className={`${styles.score}`}>
                        {matchDetailsLocal.matchB.score.player1}
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>B</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      {/* Participant 2*/}
                      {matchDetailsLocal.matchB.participant2}
                      <p className={`${styles.score}`}>
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
            <td>
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
                      <p className={`${styles.score}`}>
                        {matchDetailsLocal.matchF.score.player1}
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>F</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      {matchDetailsLocal.matchF.participant2}
                      <p className={`${styles.score}`}>
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

            <td className={`${styles.matchH}`}>
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
                      <p className={`${styles.score}`}>
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
                      <p className={`${styles.score}`}>
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
            <td className={`${styles.matchD}`}>
              {matchDetailsLocal?.matchD && (
                <React.Fragment key='matchD'>
                  <div className={`${styles.participantsWrapperTop}`}>
                    <div className={`${styles.participants}`}>
                      {/* Participant 1*/}
                      {matchDetailsLocal.matchD.participant1}
                      <p className={`${styles.score}`}>
                        0
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>D</small></div>
                  <div className={`${styles.participantsWrapperBottom}`}>
                    <div className={`${styles.participants}`}>
                      {/* Participant 2*/}
                      {matchDetailsLocal.matchD.participant2}
                      <p className={`${styles.score}`}>
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

  )
}

export default SetE;