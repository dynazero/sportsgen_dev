import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client';
import styles from './scoreboard.module.css'


const match = ({ id, matchKey }) => {

    const tournamentSocketId = id;
    const match = matchKey.replace(/match(\w+)/g, 'Match ' + '$1');
    const role = 'guest';
    const socketRef = useRef(null); // Using ref to persist socket object
    const [matchDetails, setMatchDetails] = useState({});
    const [tournamentInfo, setTournamentInfo] = useState({});
    const [player1, setPlayer1] = useState('');
    const [player1Score, setPlayer1Score] = useState('');
    const [player2, setPlayer2] = useState('');
    const [player2Score, setPlayer2Score] = useState('');

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
                setTournamentInfo(details?.tournamentInfo)
                setPlayer1(details?.[matchKey]?.participant1)
                setPlayer2(details?.[matchKey]?.participant2)
                setPlayer1Score(details?.[matchKey]?.score.player1)
                setPlayer2Score(details?.[matchKey]?.score.player2)

                // Check if the received details are empty 
                // if (details === 'Tournament Does Not Exist') {
                //   socket.emit('initialize-tournament', {
                //     tournamentSocketId,
                //     initialMatches,
                //     role
                //   });
                // }
            });

            // Cleanup function to disconnect the socket when the component is unmounted.
            return () => {
                socket.disconnect();
            };
        }

        socketInitializer();
    }, [tournamentSocketId, role]);

    // console.log('tournamentSocketId', tournamentSocketId);
    // console.log('matchDetails', matchDetails);

    return (
        <>
            <div className={`${styles.scoreBoardContainer}`}>
                <div className="d-flex justify-content-center">
                    <div className='p-2 bd-highlight'>
                        <h3>
                            <strong className={`${styles.tournamentName}`}>
                                {tournamentInfo.tournamentName}
                            </strong>
                        </h3>
                    </div>
                    <div className='p-2 bd-highlight'>
                        <h3>
                            <strong className={`${styles.eventName}`}>
                                {tournamentInfo.tournamentCategory}
                            </strong>
                        </h3>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className='p-2 bd-highlight'>
                        <h3>
                            <strong className={`${styles.matchKey}`}>
                               {match}
                            </strong>
                        </h3>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className={`p-2 bd-highlight align-self-center ${styles.playerWrapper}`}>
                        <div className={`align-self-center ${styles.players}`}>{player1}</div>
                    </div>
                    <div className={`p-2 bd-highlight align-self-center ${styles.playerWrapper}`}>
                        <div className={`align-self-center ${styles.players}`}>{player2}</div>
                    </div>
                </div>
                <div className={`d-flex justify-content-between ${styles.scoreContainer}`}>
                    <div className={`p-2 bd-highlight align-self-center ${styles.scoreWrapper}`}>
                        <div className={`align-self-center ${styles.scores}`}>{player1Score}</div>
                    </div>
                    <div className={`p-2 bd-highlight ${styles.versus}`}>
                        <strong>
                            VS
                        </strong>
                    </div>
                    <div className={`p-2 bd-highlight align-self-center ${styles.scoreWrapper}`}>
                        <div className={`align-self-center ${styles.scores}`}>{player2Score}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default match;


export async function getServerSideProps(context) {
    const id = context.params.id;
    const matchKey = context.params.matchKey;


    return {
        props: {
            id,
            matchKey
        },
    };

}