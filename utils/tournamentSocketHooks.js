import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { toast } from "react-toastify";
import { participantsSetConfig } from './config/participantsSets'


export const useTournamentSocketHooks = (tournamentSocketId, setTournamentStatus, participantsCount, tournamentInfo, initialMatches, role) => {
  const socketRef = useRef(null);
  const [matchDetails, setMatchDetails] = useState({});

  // console.log('tournamentInfo', tournamentInfo);
  // console.log('participantsCount', participantsCount);

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


  const onSaveTournamentData = (tournamentId, categorykey) => {

    let matchDetails = {}

    socketRef.current.emit('get-all-matches', tournamentSocketId)

    socketRef.current.on('all-matches-details', (details) => {

      setMatchDetails(details);
    });

    const { champion, tournamentInfo, ...matchDetailsWithoutChampion } = matchDetails;

    const formData = new FormData();
    formData.append('tournamentId', tournamentId);
    formData.append('categoryKey', tournamentInfo.categoryKey)
    formData.append('logAccount', tournamentInfo.logAccount)
    // formData.append('championId', championId);
    // formData.append('champion', champion.winner);
    // formData.append('matchDetails', JSON.stringify(matchDetailsWithoutChampion));
    // formData.append('participantList', JSON.stringify(reParticipants));

    console.log('tournamentId', tournamentInfo.tournamentId);
    console.log('categoryKey', tournamentInfo.categoryKey);
    console.log('logAccount', tournamentInfo.logAccount);
    // console.log('championId', championId);
    // console.log('firstRunnerUp', firstRunnerUp);
    // console.log('secondRunnerUp', secondRunnerUp);

    // const functionSaveResult = axios.post(`../pages/api/createTournamentResult`, formData);
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
  }

  const updateParticipants = async (matchKey, matchWinner, matchLoser) => {

    const setModuleName = participantsSetConfig[participantsCount];

    console.log('participantsCount', participantsCount);
    console.log('setModuleName', setModuleName);


    if (!setModuleName) {
      console.error('No module defined for this match key');
      return;
    }


    try {
      const module = await import(`./updateParticipants/${setModuleName}.js`);

      // Get the socket commands
      const socketCommands = module.useUpdateParticipants(tournamentSocketId, role, setTournamentStatus, setMatchDetails, matchKey, matchWinner, matchLoser);

      // Use the socket commands
      socketCommands.forEach(({ command, data }) => {
        if (typeof data === 'function') {
          socketRef.current.on(command, data);
        } else {
          socketRef.current.emit(command, data);
        }
      });
    } catch (error) {
      console.error('Failed to load module:', error);
    }
  }

  const onPostScoreHandler = (matchKey, updatedScore) => {
    const matchDataLocal = updatedScore[`match${matchKey}`];
    const matchScores = matchDataLocal.score;

    // toast.warning('Saving Scores');

    const updateScorePromise = new Promise((resolve, reject) => {
      // Emit the 'update-score' event
      socketRef.current.emit('update-score', {
        tournamentId: tournamentInfo.tournamentId,
        tournamentEventId: tournamentInfo.tournamentEventId,
        categoryKey: tournamentInfo.categoryKey,
        logAccount: tournamentInfo.logAccount,
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

  const onPostWinnerHandler = (matchKey, updatedWinner) => {
    const matchDataLocal = updatedWinner[matchKey];
    let matchWinner = matchDataLocal.winner;
    let matchLoser = matchDataLocal.loser;

    console.log('matchDataLocal', matchDataLocal);

    if (matchDataLocal.winner === null) {
      // matchWinner = matchDataLocal.participant1;
      toast.warning('Choose a winner')
      return;
    }

    socketRef.current.emit('update-winner',
      {
        tournamentId: tournamentInfo.tournamentId,
        tournamentEventId: tournamentInfo.tournamentEventId,
        categoryKey: tournamentInfo.categoryKey,
        logAccount: tournamentInfo.logAccount,
        matchKey,
        matchWinner,
        matchLoser,
        role


      });

    socketRef.current.on('match-details', (details) => {
      // console.log('Received updated match-details:', details);
      setMatchDetails(details);
    });


    updateParticipants(matchKey, matchWinner, matchLoser);
    toast.success('Winner updated successfully!');

    // Handle errors if you added error handling
    // toast.error('Failed to update winner.');


  };

  console.log('matchDetails', matchDetails);


  return { onSaveTournamentData, matchDetails, onPostScoreHandler, onPostWinnerHandler }
}