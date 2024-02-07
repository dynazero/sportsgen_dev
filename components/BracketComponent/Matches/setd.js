import React, { useEffect, useState, useRef, useContext } from 'react'
import { generateInitialMatches } from '../../../utils/generateInitialMatches.js'
import { useTournamentSocketHooks } from '../../../utils/tournamentSocketHooks.js'
import { BracketContext } from '../../../context/bracketContext.js'
import { BracketUIContext } from '../../../pages/tournament/admin/bracket/[id]/[categorykey].js'
import LoadingSpinner from './LoadingSpinner.js'
import axios from 'axios';
import { toast } from "react-toastify";
import styles from './setd.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ScoreModal from '../../ScoreModal/index.js';

const SetE = () => {

  const context = useContext(BracketContext);
  const reParticipants = {};

  if (!context) {
    console.error('BracketContext is undefined');
    return null; // or some fallback UI
  }

  let {
    categorykey,
    tournamentInfo,
    participants,
    setTournamentStatus,
    participantsCount
  } = context;

  let {
    bracketFS
    // handleFullScreen,
  } = useContext(BracketUIContext)

  for (let i = 0; i < participants.length; i++) {
    reParticipants[`participant${i + 1}`] = {
      // name : athlete[i].athlete.split(",")[1].trim(), // last name only
      name: participants[i].athleteName,
      id: participants[i].athleteId
    }
  }

  //parallax results
  const elementRef = useRef(null);
  const [resultsToggle, setResultsToggle] = useState(false);
  const resultsToggleRef = useRef(resultsToggle);


  // const bracketFS = false;
  const { initialMatches } = generateInitialMatches(reParticipants, tournamentInfo, participantsCount);

  const [tournamentSocketId, setTournamentSocketId] = useState(tournamentInfo.tournamentId + categorykey);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [matchDetailsLocal, setMatchDetailsLocal] = useState({});
  const [role, setRole] = useState('admin');
  const [tournamentId, setTournamentId] = useState(tournamentInfo.tournamentId);
  const [championId, setChampionId] = useState('');
  const [firstrunnerupId, setFirstrunnerupId] = useState('');
  const [secondrunnerupId, setSecondrunnerupId] = useState('');
  const [pendingUpdate, setPendingUpdate] = useState({});
  const [matchCurrentDetail, setMatchCurrentDetail] = useState({})
  const [matchKey, setMatchKey] = useState('')
  const [winnerUpdate, setWinnerUpdate] = useState(0)
  const [winnerConfirm, setWinnerConfirm] = useState(0)

  const { onSaveTournamentData, matchDetails, onPostScoreHandler, onPostWinnerHandler } = useTournamentSocketHooks(tournamentSocketId, setTournamentStatus, participantsCount, tournamentInfo, initialMatches, role);

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
    setMatchDetailsLocal(matchDetails);
    const timer = setTimeout(() => setDataLoaded(true), 800);

    return () => clearTimeout(timer);
  }, [matchDetails]);

  useEffect(() => {

    if (pendingUpdate) {
      const matchKey = Object.keys(pendingUpdate)[0];
      setMatchCurrentDetail({
        [matchKey]: matchDetails?.[matchKey]
      })
    }

  }, [pendingUpdate])

  //parallax results function
  useEffect(() => {
    resultsToggleRef.current = resultsToggle;
  }, [resultsToggle]);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const st = elementRef.current.scrollTop;
      if (st > lastScrollTop) {
        setResultsToggle('resultsMin');
      } else {
        setResultsToggle('resultsMax');
      }
      console.log(resultsToggleRef.current); // Log the latest resultsToggle state
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    };

    const elementView = elementRef?.current;
    elementView?.addEventListener('scroll', handleScroll);

    return () => {
      elementView?.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // const onSaveTournamentData = () => {

  //   socketRef.current.emit('get-all-matches', tournamentSocketId)

  //   socketRef.current.on('all-matches-details', (details) => {

  //     // console.log('Received updated all-match-details, Ready for save:', details);
  //     setMatchDetails(details)
  //   });

  //   const { champion, tournamentInfo, ...matchDetailsWithoutChampion } = matchDetails;

  //   // Remove the champion field from the matchDetails object

  //   const formData = new FormData();
  //   formData.append('tournamentId', tournamentId);
  //   formData.append('categoryKey', categorykey)
  //   formData.append('logAccount', localStorage.getItem('email'))
  //   formData.append('championId', championId);
  //   formData.append('champion', champion.winner);
  //   formData.append('matchDetails', JSON.stringify(matchDetailsWithoutChampion));
  //   formData.append('participantList', JSON.stringify(reParticipants));

  //   // console.log('tournamentSocketId', tournamentSocketId);
  //   console.log('championId', championId);
  //   // console.log('champion', champion.winner);
  //   // console.log('matchDetails', JSON.stringify(matchDetailsWithoutChampion));
  //   // console.log('participantList', JSON.stringify(reParticipants));

  //   const functionSaveResult = axios.post(`../../../../api/createTournamentResult`, formData);
  //   toast.promise(
  //     functionSaveResult,
  //     {
  //       pending: 'Saving Event',
  //       success: 'Event saved successfully! 👌',
  //       error: 'Error saving event 🤯'
  //     }
  //   ).then(
  //     (response) => {
  //       if (response.status === 201) {
  //         // Navigate to another page (e.g., the home page)
  //         //    setTimeout(() => {
  //         //     router.push('/event');
  //         // }, 3000);
  //         socketRef.current.emit('close-tournament',
  //           {
  //             tournamentSocketId,
  //             role
  //           });
  //         socketRef.current.on('match-details', (details) => {
  //           // console.log('Received updated match-details:', details);
  //           setMatchDetails(details);
  //         });
  //         console.log('reponse.status 201, success');
  //       }
  //     }
  //   ).catch((error) => {
  //     console.log('Error submitting form', error);
  //   })

  // }

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

        // console.log('updatedScore', updatedScore);
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
            winner: pendingUpdate[`match${matchKey}`]?.winner,
            loser: pendingUpdate[`match${matchKey}`]?.loser
          }
        };
        onPostWinnerHandler('match' + matchKey, updatedWinner)

        return updatedWinner;
      })

      // console.log('matchKey', 'match'+matchKey);
      setShow(false);
    }

  };

  //  console.log('tournamentInfo',  tournamentInfo);
  //  console.log('participantsCount', participantsCount);
  // console.log('role', role);
  // console.log('matchDetailsLocal', matchDetailsLocal);

  return (
    dataLoaded ?


      <>
        {/* <div className={`${!resultsToggle ? styles.resultsMax : styles.resultsMin}`}>
          <div className="container">
            <div className="row">
              <div className="col-sm">
                Champion
              </div>
              <div className="col-sm">
                2nd place
              </div>
              <div className="col-sm">
                3rd place
              </div>
              <div className="col-sm">
                <button type="button" onClick={() => onSaveTournamentData(tournamentId, categorykey)}
                  // className={`btn btn-danger ${matchDetailsLocal?.tournamentInfo?.status !== 'closed' ? (matchDetailsLocal?.secondplace?.winner !== null ? (!bracketFS ? styles.endBtn : styles.endBtnFS) : styles.xEndBtn) : styles.xEndBtn} `}
                className={`btn btn-danger ${styles.endBtn}}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stop-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                    <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"></path>
                  </svg>
                  End Tournament
                </button>
              </div>
            </div>
          </div>
        </div> */}

        <button type="button" onClick={() => onSaveTournamentData(tournamentId, categorykey)}
          // className={`btn btn-danger ${matchDetailsLocal?.tournamentInfo?.status !== 'closed' ? (matchDetailsLocal?.secondplace?.winner !== null ? (!bracketFS ? styles.endBtn : styles.endBtnFS) : styles.xEndBtn) : styles.xEndBtn} `}
          className={`btn btn-danger ${styles.endBtn}}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stop-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"></path>
          </svg>
          End Tournament
        </button>

        <div className={`d-flex justify-content-start ${!bracketFS ? styles.rowWidth : styles.rowWidthFS}`} ref={elementRef} >
          <div className={`row ${styles.mainRow}`}>
            <div className='col-12'>
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
                              {matchDetailsLocal?.matchA.participant1}
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchA?.winner ? (matchDetailsLocal?.matchA?.winner === matchDetailsLocal?.matchA?.participant1 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchA?.score.player1}
                              </p>
                            </div>
                          </div>
                          <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>A</small></div>
                          <div className={`${styles.participantsWrapperBottom}`}>
                            <div className={`${styles.participants}`}>
                              {/* Participant 2*/}
                              {matchDetailsLocal?.matchA.participant2}
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchA?.winner ? (matchDetailsLocal?.matchA?.winner === matchDetailsLocal?.matchA?.participant2 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchA.score.player2}
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </td>
                    <td className={`${styles.straightLine}`}>
                      <svg height="100" width="100">
                        {/* <path d="M50 24.5 H80 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path> */}
                        <line x1="0" y1="24.5" x2={`${!bracketFS ? "90" : "100"}`} y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
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
                              {matchDetailsLocal?.matchE.participant1 ?
                                matchDetailsLocal?.matchE.participant1 :
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
                                {matchDetailsLocal?.matchE?.score.player1}
                              </p>
                            </div>
                          </div>
                          <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>E</small></div>
                          <div className={`${styles.participantsWrapperBottom}`}>
                            <div className={`${styles.participants}`}>
                              {matchDetailsLocal?.matchE.participant2}
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchE?.winner ? (matchDetailsLocal?.matchE?.winner === matchDetailsLocal?.matchE?.participant2 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchE.score.player2}
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </td>
                    <td className={`${styles.roundTwotoThree}`}>
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
                              {matchDetailsLocal?.matchC.participant1}
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchC?.winner ? (matchDetailsLocal?.matchC?.winner === matchDetailsLocal?.matchC?.participant1 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchC?.score.player1}
                              </p>
                            </div>
                          </div>
                          <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>C</small></div>
                          <div className={`${styles.participantsWrapperBottom}`}>
                            <div className={`${styles.participants}`}>
                              {/* Participant 2*/}
                              {matchDetailsLocal?.matchC.participant2}
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchC?.winner ? (matchDetailsLocal?.matchC?.winner === matchDetailsLocal?.matchC?.participant2 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchC.score.player2}
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </td>
                    <td className={`${styles.matchBelowBracketA}`}>
                      <svg height="70" width="110">
                        <path d={`${!bracketFS ? "M100 0 H30 V53.5 H0" : "M110 0 H30 V53.5 H0"}`}
                          id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
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
                              {matchDetailsLocal?.matchG.participant1 ?
                                matchDetailsLocal?.matchG.participant1 :
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
                                {matchDetailsLocal?.matchG?.score.player1}
                              </p>
                            </div>
                          </div>
                          <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>G</small></div>
                          <div className={`${styles.participantsWrapperBottom}`}>
                            <div className={`${styles.participants}`}>
                              {matchDetailsLocal?.matchG.participant2 ?
                                matchDetailsLocal?.matchG.participant2 :
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
                                {matchDetailsLocal?.matchG.score.player2}
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </td>
                    <td className={`${styles.roundThreetoFour}`}>
                      <svg height="110" width="120">
                        <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M110 110 H30 V0 H0"></path>
                      </svg>
                    </td>
                    <td
                      className={`${styles.grandFinals} ${matchDetailsLocal?.matchO?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                      onClick={() =>
                        `${matchDetailsLocal?.matchO?.status === 'open' ? handleShow('O') : null}`}>
                      {matchDetailsLocal?.matchO && (
                        <React.Fragment key='matchI'>
                          <div className={`${styles.participantsWrapperTop}`}>
                            <div className={`${styles.participants}`}>
                              {matchDetailsLocal?.matchO.participant1 ?
                                matchDetailsLocal?.matchO.participant1 :
                                <p className={`${styles.standByText} ${styles.pmb}`}>
                                  <small>
                                    Match G winner
                                  </small>
                                </p>
                              }
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchO?.winner ? (matchDetailsLocal?.matchO?.winner === matchDetailsLocal?.matchO?.participant1 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchO?.score.player1}
                              </p>
                            </div>
                          </div>
                          <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>O</small></div>
                          <div className={`${styles.participantsWrapperBottom}`}>
                            <div className={`${styles.participants}`}>
                              {matchDetailsLocal?.matchO.participant2 ?
                                matchDetailsLocal?.matchO.participant2 :
                                <p className={`${styles.standByText} ${styles.pmb}`}>
                                  <small>
                                    Match H winner
                                  </small>
                                </p>
                              }
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchO?.winner ? (matchDetailsLocal?.matchO?.winner === matchDetailsLocal?.matchO?.participant2 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchO.score.player2}
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
                                  {matchDetailsLocal?.champion.winner}
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
                              {matchDetailsLocal?.matchB.participant1}
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchB?.winner ? (matchDetailsLocal?.matchB?.winner === matchDetailsLocal?.matchB?.participant1 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchB?.score.player1}
                              </p>
                            </div>
                          </div>
                          <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>B</small></div>
                          <div className={`${styles.participantsWrapperBottom}`}>
                            <div className={`${styles.participants}`}>
                              {/* Participant 2*/}
                              {matchDetailsLocal?.matchB.participant2}
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchB?.winner ? (matchDetailsLocal?.matchB?.winner === matchDetailsLocal?.matchB?.participant2 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchB.score.player2}
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </td>
                    <td className={`${styles.straightLine}`}>
                      <svg height="100" width="100">
                        {/* <path d="M50 24.5 H80 V24.5 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path> */}
                        <line x1="0" y1="24.5" x2={`${!bracketFS ? "90" : "100"}`} y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
                      </svg>
                    </td>
                    <td className={`${matchDetailsLocal?.matchF?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                      onClick={() =>
                        `${matchDetailsLocal?.matchF?.status === 'open' ? handleShow('F') : null}`}>
                      {matchDetailsLocal?.matchF && (
                        <React.Fragment key='matchF'>
                          <div className={`${styles.participantsWrapperTop}`}>
                            <div className={`${styles.participants}`}>
                              {matchDetailsLocal?.matchF.participant1 ?
                                matchDetailsLocal?.matchF.participant1 :
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
                                {matchDetailsLocal?.matchF?.score.player1}
                              </p>
                            </div>
                          </div>
                          <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>F</small></div>
                          <div className={`${styles.participantsWrapperBottom}`}>
                            <div className={`${styles.participants}`}>
                              {matchDetailsLocal?.matchF.participant2}
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchF?.winner ? (matchDetailsLocal?.matchF?.winner === matchDetailsLocal?.matchF?.participant2 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchF.score.player2}
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </td>
                    <td className={`${styles.roundTwotoThree}`}>
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
                              {matchDetailsLocal?.matchH.participant1 ?
                                matchDetailsLocal?.matchH.participant1 :
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
                                {matchDetailsLocal?.matchH?.score.player1}
                              </p>
                            </div>
                          </div>
                          <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>H</small></div>
                          <div className={`${styles.participantsWrapperBottom}`}>
                            <div className={`${styles.participants}`}>
                              {matchDetailsLocal?.matchH.participant2 ?
                                matchDetailsLocal?.matchH.participant2 :
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
                                {matchDetailsLocal?.matchH.score.player2}
                              </p>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </td>
                    <td className={`${styles.roundThreetoFour}`}>
                      <svg height={`${!bracketFS ? "110" : "210"}`} width="120" style={{
                        position: `${!bracketFS ? "relative" : "absolute"}`,
                        bottom: `${!bracketFS ? "0" : "79"}`,
                        zIndex: `${!bracketFS ? "0" : "5"}`
                      }} >
                        <path
                          d={`${!bracketFS ? "M110 0 H30 V110 H0" : "M110 0 H30 V210 H0"}`}
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
                              {matchDetailsLocal?.matchD.participant1}
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchD?.winner ? (matchDetailsLocal?.matchD?.winner === matchDetailsLocal?.matchD?.participant1 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchD?.score.player1}
                              </p>
                            </div>
                          </div>
                          <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>D</small></div>
                          <div className={`${styles.participantsWrapperBottom}`}>
                            <div className={`${styles.participants}`}>
                              {/* Participant 2*/}
                              {matchDetailsLocal?.matchD.participant2}
                              <p className={`${styles.score}
                         ${matchDetailsLocal?.matchD?.winner ? (matchDetailsLocal?.matchD?.winner === matchDetailsLocal?.matchD?.participant2 ? styles.winner : '') : ''}
                        `}
                              >
                                {matchDetailsLocal?.matchD.score.player2}
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
                          d={`${!bracketFS ? "M100 0 H30 V53.5 H0" : "M110 0 H30 V133 H0"}`}
                          id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-12'>
              <table className={`table table-dark ${styles.repTable}`}>
                <thead>
                  <tr>
                    <th className={`${styles.thead}`}>Repechage:</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className={`${styles.thead}`}>Repechage Finals</th>
                    <th className={`${styles.headerSecondplace}`}>Second Place</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className={`${styles.repsemis}
                    ${matchDetailsLocal?.matchP?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                      onClick={() =>
                        `${matchDetailsLocal?.matchP?.status === 'open' ? handleShow('P') : null}`}
                    >
                      <div className={`${styles.repParticipantsWrapperTop}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchP?.participant1 ?
                            matchDetailsLocal?.matchP?.participant1 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match M winner
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchP?.winner ? (matchDetailsLocal?.matchP?.winner === matchDetailsLocal?.matchP?.participant1 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchP?.score.player1}
                          </p>
                        </div>
                      </div>
                      <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>P</small></div>
                      <div className={`${styles.repParticipantsWrapperBottom}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchP?.participant2 ?
                            matchDetailsLocal?.matchP?.participant2 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match N winner
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchP?.winner ? (matchDetailsLocal?.matchP?.winner === matchDetailsLocal?.matchP?.participant2 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchP?.score.player2}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.repsemisBracket}`}>
                      <svg className={`${styles.showSVG}`} height="100" width="100">
                        <path d="M90 0 H45 V91 H0" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                      </svg>
                    </td>
                    <td className={`${styles.repgrandFinals}
                     ${matchDetailsLocal?.matchQ?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                      onClick={() =>
                        `${matchDetailsLocal?.matchQ?.status === 'open' ? handleShow('Q') : null}`}
                    >
                      <div className={`${styles.repParticipantsWrapperTop}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchQ?.participant1 ?
                            matchDetailsLocal?.matchQ?.participant1 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match O loser
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchQ?.winner ? (matchDetailsLocal?.matchQ?.winner === matchDetailsLocal?.matchQ?.participant1 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchQ?.score.player1}
                          </p>
                        </div>
                      </div>
                      <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>Q</small></div>
                      <div className={`${styles.repParticipantsWrapperBottom}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchQ?.participant2 ?
                            matchDetailsLocal?.matchQ?.participant2 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match P winner
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchQ?.winner ? (matchDetailsLocal?.matchQ?.winner === matchDetailsLocal?.matchQ?.participant2 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchQ?.score.player2}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.secondplace}`}>

                      <div className={`${styles.standByText}`}>
                        {/* Match Q winner */}
                        {matchDetailsLocal?.secondplace?.winner}

                      </div>

                    </td>
                  </tr>
                  <tr >
                    <td className={`${styles.repechageTopPanel} 
                    ${matchDetailsLocal?.matchI?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                      onClick={() =>
                        `${matchDetailsLocal?.matchI?.status === 'open' ? handleShow('I') : null}`}
                    >
                      <div className={`${styles.repParticipantsWrapperTop}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchI?.participant1 ?
                            matchDetailsLocal?.matchI?.participant1 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match A loser
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchI?.winner ? (matchDetailsLocal?.matchI?.winner === matchDetailsLocal?.matchI?.participant1 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchI?.score.player1}
                          </p>
                        </div>
                      </div>
                      <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>I</small></div>
                      <div className={`${styles.repParticipantsWrapperBottom}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchI?.participant2 ?
                            matchDetailsLocal?.matchI?.participant2 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match B loser
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchI?.winner ? (matchDetailsLocal?.matchI?.winner === matchDetailsLocal?.matchI?.participant2 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchI?.score.player2}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.repstraightLine} ${styles.repechageTopStraightLine}`}>
                      <svg height="100" width="100">
                        <line x1="0" y1="24.5" x2="92" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
                      </svg>
                    </td>
                    <td className={`${styles.repechageTopPanel}
                      ${matchDetailsLocal?.matchK?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                      onClick={() =>
                        `${matchDetailsLocal?.matchK?.status === 'open' ? handleShow('K') : null}`}
                    >
                      <div className={`${styles.repParticipantsWrapperTop}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchK?.participant1 ?
                            matchDetailsLocal?.matchK?.participant1 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match E loser
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchK?.winner ? (matchDetailsLocal?.matchK?.winner === matchDetailsLocal?.matchK?.participant1 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchK?.score.player1}
                          </p>
                        </div>
                      </div>
                      <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>K</small></div>
                      <div className={`${styles.repParticipantsWrapperBottom}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchK?.participant2 ?
                            matchDetailsLocal?.matchK?.participant2 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match I winner
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchK?.winner ? (matchDetailsLocal?.matchK?.winner === matchDetailsLocal?.matchK?.participant2 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchK?.score.player2}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.repstraightLine} ${styles.repechageTopStraightLine}`}>
                      <svg height="100" width="100">
                        <line x1="0" y1="24.5" x2="92" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
                      </svg>
                    </td>
                    <td className={`${styles.repechageTopPanel}
                    ${matchDetailsLocal?.matchM?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                      onClick={() =>
                        `${matchDetailsLocal?.matchM?.status === 'open' ? handleShow('M') : null}`}
                    >
                      <div className={`${styles.repParticipantsWrapperTop}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchM?.participant1 ?
                            matchDetailsLocal?.matchM?.participant1 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match G loser
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchM?.winner ? (matchDetailsLocal?.matchM?.winner === matchDetailsLocal?.matchM?.participant1 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchM?.score.player1}
                          </p>
                        </div>
                      </div>
                      <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>M</small></div>
                      <div className={`${styles.repParticipantsWrapperBottom}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchM?.participant2 ?
                            matchDetailsLocal?.matchM?.participant2 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match K winner
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchM?.winner ? (matchDetailsLocal?.matchM?.winner === matchDetailsLocal?.matchM?.participant2 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchM?.score.player2}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.repechageBracketToSemis}`} >
                      <svg height="120" width="100">
                        <path strokeWidth="1" stroke="rgb(233, 236, 239)" fill="transparent" id="" d="M110 75 H30 V24.5 H0">
                        </path>
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className={`${styles.repechageBottomPanel}
                     ${matchDetailsLocal?.matchJ?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                      onClick={() =>
                        `${matchDetailsLocal?.matchJ?.status === 'open' ? handleShow('J') : null}`}
                    >
                      <div className={`${styles.repParticipantsWrapperTop}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchJ?.participant1 ?
                            matchDetailsLocal?.matchJ?.participant1 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match C loser
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchJ?.winner ? (matchDetailsLocal?.matchJ?.winner === matchDetailsLocal?.matchJ?.participant1 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchJ?.score.player1}
                          </p>
                        </div>
                      </div>
                      <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>J</small></div>
                      <div className={`${styles.repParticipantsWrapperBottom}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchJ?.participant2 ?
                            matchDetailsLocal?.matchJ?.participant2 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match D loser
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchJ?.winner ? (matchDetailsLocal?.matchJ?.winner === matchDetailsLocal?.matchJ?.participant2 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchJ?.score.player2}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.repstraightLine} ${styles.repechageBottomStraightLine}`}>
                      <svg height="100" width="100">
                        <line x1="0" y1="24.5" x2="92" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
                      </svg>
                    </td>
                    <td className={`${styles.repechageBottomPanel} 
                    ${matchDetailsLocal?.matchL?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                      onClick={() =>
                        `${matchDetailsLocal?.matchL?.status === 'open' ? handleShow('L') : null}`}
                    >
                      <div className={`${styles.repParticipantsWrapperTop}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchL?.participant1 ?
                            matchDetailsLocal?.matchL?.participant1 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match F loser
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchL?.winner ? (matchDetailsLocal?.matchL?.winner === matchDetailsLocal?.matchL?.participant1 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchL?.score.player1}
                          </p>
                        </div>
                      </div>
                      <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>L</small></div>
                      <div className={`${styles.repParticipantsWrapperBottom}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchL?.participant2 ?
                            matchDetailsLocal?.matchL?.participant2 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match J winner
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchL?.winner ? (matchDetailsLocal?.matchL?.winner === matchDetailsLocal?.matchL?.participant2 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchL?.score.player2}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.repstraightLine} ${styles.repechageBottomStraightLine}`}>
                      <svg height="100" width="100">
                        <line x1="0" y1="24.5" x2="92" y2="24.5" style={{ stroke: "rgb(233, 236, 239)", strokeWidth: 1 }} />
                      </svg>
                    </td>
                    <td className={`${styles.repechageBottomPanel}
                     ${matchDetailsLocal?.matchN?.status === 'open' ? styles.activeMatch : styles.xActiveMatch}`}
                      onClick={() =>
                        `${matchDetailsLocal?.matchN?.status === 'open' ? handleShow('N') : null}`}
                    >
                      <div className={`${styles.repParticipantsWrapperTop}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchN?.participant1 ?
                            matchDetailsLocal?.matchN?.participant1 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match H loser
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchN?.winner ? (matchDetailsLocal?.matchN?.winner === matchDetailsLocal?.matchN?.participant1 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchN?.score.player1}
                          </p>
                        </div>
                      </div>
                      <div className={`${styles.matchesBorder}`}><small className={`${styles.matchIndicator}`}>N</small></div>
                      <div className={`${styles.repParticipantsWrapperBottom}`}>
                        <div className={`${styles.participants}`}>
                          {matchDetailsLocal?.matchN?.participant2 ?
                            matchDetailsLocal?.matchN?.participant2 :
                            <p className={`${styles.standByText} ${styles.pmb}`}>
                              <small>
                                Match L winner
                              </small>
                            </p>
                          }
                          <p className={`${styles.score}
                         ${matchDetailsLocal?.matchN?.winner ? (matchDetailsLocal?.matchN?.winner === matchDetailsLocal?.matchN?.participant2 ? styles.winner : '') : ''}
                        `}
                          >
                            {matchDetailsLocal?.matchN?.score.player2}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.repBracketBeforeSemis2}`}>
                      <svg className={`${styles.showSVG}`} height="50" width="50">
                        <path d="M30 -2 H30 V50 H5" id="" fill="transparent" stroke="rgb(233, 236, 239)" strokeWidth="1"></path>
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div >

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Score Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ScoreModal
              tournamentSocketId={tournamentSocketId}
              pendingUpdate={pendingUpdate}
              matchCurrentDetail={matchCurrentDetail}
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
      : (
        <LoadingSpinner />
      )
  )
}

export default SetE;