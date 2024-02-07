import { useRef } from 'react';



export const useUpdateParticipants = (tournamentSocketId, role, setTournamentStatus,  setMatchDetails, matchKey, matchWinner, matchLoser) => {

    console.log('role in upSetD', role);
    switch (matchKey) {
        case 'matchA':
            return [
                {
                    command: 'update-participant',
                    data: {
                        tournamentSocketId,
                        matchKey: 'matchE',
                        participantSide: 'participant1',
                        player: matchWinner,
                        role
                    }
                },
                {

                    command: 'update-participant',
                    data: {
                        tournamentSocketId,
                        matchKey: 'matchI',
                        participantSide: 'participant1',
                        player: matchLoser,
                        role
                    }
                },
                {
                    command: 'match-details',
                    data: (details) => {
                        // console.log('Received updated match-details:', details);
                        setMatchDetails(details);
                    }
                },
            ];
        case 'matchB':
            return [
                {
                    command: 'update-participant',
                    data: {
                        tournamentSocketId,
                        matchKey: 'matchF',
                        participantSide: 'participant1',
                        player: matchWinner,
                        role
                    }
                },
                {
                    command: 'update-participant',
                    data: {
                        tournamentSocketId,
                        matchKey: 'matchI',
                        participantSide: 'participant2',
                        player: matchLoser,
                        role
                    }
                },
                {
                    command: 'match-details',
                    data: (details) => {
                        // console.log('Received updated match-details:', details);
                        setMatchDetails(details);
                    }
                }
            ];
            case 'matchC':
                return [
                    {
                        command: 'update-participant',
                        data: {
                            tournamentSocketId,
                            matchKey: 'matchG',
                            participantSide: 'participant2',
                            player: matchWinner,
                            role
                        }
                    },
                    {
                        command: 'update-participant',
                        data: {
                            tournamentSocketId,
                            matchKey: 'matchJ',
                            participantSide: 'participant1',
                            player: matchLoser,
                            role
                        }
                    },
                    {
                        command: 'match-details',
                        data: (details) => {
                            // console.log('Received updated match-details:', details);
                            setMatchDetails(details);
                        }
                    }
                ];
            case 'matchD':
                return [
                    {
                        command: 'update-participant',
                        data: {
                            tournamentSocketId,
                            matchKey: 'matchH',
                            participantSide: 'participant2',
                            player: matchWinner,
                            role
                        }
                    },
                    {
                        command: 'update-participant',
                        data: {
                            tournamentSocketId,
                            matchKey: 'matchJ',
                            participantSide: 'participant2',
                            player: matchLoser,
                            role
                        }
                    },
                    {
                        command: 'match-details',
                        data: (details) => {
                            // console.log('Received updated match-details:', details);
                            setMatchDetails(details);
                        }
                    }
                ];
            case 'matchE':
                return [
                    {
                        command: 'update-participant',
                        data: {
                            tournamentSocketId,
                            matchKey: 'matchG',
                            participantSide: 'participant1',
                            player: matchWinner,
                            role
                        }
                    },
                    {
                        command: 'update-participant',
                        data: {
                            tournamentSocketId,
                            matchKey: 'matchK',
                            participantSide: 'participant1',
                            player: matchLoser,
                            role
                        }
                    },
                    {
                        command: 'match-details',
                        data: (details) => {
                            // console.log('Received updated match-details:', details);
                            setMatchDetails(details);
                        }
                    }
                ];
            case 'matchF':
                return [
                    {
                        command: 'update-participant',
                        data: {
                            tournamentSocketId,
                            matchKey: 'matchH',
                            participantSide: 'participant1',
                            player: matchWinner,
                            role
                        }
                    },
                    {
                        command: 'update-participant',
                        data: {
                            tournamentSocketId,
                            matchKey: 'matchL',
                            participantSide: 'participant1',
                            player: matchLoser,
                            role
                        }
                    },
                    {
                        command: 'match-details',
                        data: (details) => {
                            // console.log('Received updated match-details:', details);
                            setMatchDetails(details);
                        }
                    }
                ];
                case 'matchG':
                    return [
                        {
                            command: 'update-participant',
                            data: {
                                tournamentSocketId,
                                matchKey: 'matchO',
                                participantSide: 'participant1',
                                player: matchWinner,
                                role
                            }
                        },
                        {
                            command: 'update-participant',
                            data: {
                                tournamentSocketId,
                                matchKey: 'matchM',
                                participantSide: 'participant1',
                                player: matchLoser,
                                role
                            }
                        },
                        {
                            command: 'match-details',
                            data: (details) => {
                                // console.log('Received updated match-details:', details);
                                setMatchDetails(details);
                            }
                        }
                    ];
                case 'matchH':
                    return [
                        {
                            command: 'update-participant',
                            data: {
                                tournamentSocketId,
                                matchKey: 'matchO',
                                participantSide: 'participant2',
                                player: matchWinner,
                                role
                            }
                        },
                        {
                            command: 'update-participant',
                            data: {
                                tournamentSocketId,
                                matchKey: 'matchN',
                                participantSide: 'participant1',
                                player: matchLoser,
                                role
                            }
                        },
                        {
                            command: 'match-details',
                            data: (details) => {
                                // console.log('Received updated match-details:', details);
                                setMatchDetails(details);
                            }
                        }
                    ];
                case 'matchI':
                    return [
                        {
                            command: 'update-participant',
                            data: {
                                tournamentSocketId,
                                matchKey: 'matchK',
                                participantSide: 'participant2',
                                player: matchWinner,
                                role
                            }
                        },
                        {
                            command: 'match-details',
                            data: (details) => {
                                // console.log('Received updated match-details:', details);
                                setMatchDetails(details);
                            }
                        }
                    ];
                case 'matchJ':
                    return [
                        {
                            command: 'update-participant',
                            data: {
                                tournamentSocketId,
                                matchKey: 'matchL',
                                participantSide: 'participant2',
                                player: matchWinner,
                                role
                            }
                        },
                        {
                            command: 'match-details',
                            data: (details) => {
                                // console.log('Received updated match-details:', details);
                                setMatchDetails(details);
                            }
                        }
                    ];
                    case 'matchK':
                        return [
                            {
                                command: 'update-participant',
                                data: {
                                    tournamentSocketId,
                                    matchKey: 'matchM',
                                    participantSide: 'participant2',
                                    player: matchWinner,
                                    role
                                }
                            },
                            {
                                command: 'match-details',
                                data: (details) => {
                                    // console.log('Received updated match-details:', details);
                                    setMatchDetails(details);
                                }
                            }
                        ];
                    case 'matchL':
                        return [
                            {
                                command: 'update-participant',
                                data: {
                                    tournamentSocketId,
                                    matchKey: 'matchN',
                                    participantSide: 'participant2',
                                    player: matchWinner,
                                    role
                                }
                            },
                            {
                                command: 'match-details',
                                data: (details) => {
                                    // console.log('Received updated match-details:', details);
                                    setMatchDetails(details);
                                }
                            }
                        ];
                    case 'matchM':
                        return [
                            {
                                command: 'update-participant',
                                data: {
                                    tournamentSocketId,
                                    matchKey: 'matchP',
                                    participantSide: 'participant1',
                                    player: matchWinner,
                                    role
                                }
                            },
                            {
                                command: 'match-details',
                                data: (details) => {
                                    // console.log('Received updated match-details:', details);
                                    setMatchDetails(details);
                                }
                            }
                        ];
                    case 'matchN':
                        return [
                            {
                                command: 'update-participant',
                                data: {
                                    tournamentSocketId,
                                    matchKey: 'matchP',
                                    participantSide: 'participant2',
                                    player: matchWinner,
                                    role
                                }
                            },
                            {
                                command: 'match-details',
                                data: (details) => {
                                    // console.log('Received updated match-details:', details);
                                    setMatchDetails(details);
                                }
                            }
                        ];
                        case 'matchO':
                            return [
                                {
                                    command: 'update-participant',
                                    data: {
                                        tournamentSocketId,
                                        matchKey: 'champion',
                                        participantSide: 'winner',
                                        player: matchWinner,
                                        role
                                    }
                                },
                                {
                                    command: 'update-participant',
                                    data: {
                                        tournamentSocketId,
                                        matchKey: 'matchQ',
                                        participantSide: 'participant1',
                                        player: matchLoser,
                                        role
                                    }
                                },
                                {
                                    command: 'match-details',
                                    data: (details) => {
                                        // console.log('Received updated match-details:', details);
                                        setMatchDetails(details);
                                    }
                                }
                            ];
                        case 'matchP':
                            return [
                                {
                                    command: 'update-participant',
                                    data: {
                                        tournamentSocketId,
                                        matchKey: 'matchQ',
                                        participantSide: 'participant2',
                                        player: matchWinner,
                                        role
                                    }
                                },
                                {
                                    command: 'match-details',
                                    data: (details) => {
                                        // console.log('Received updated match-details:', details);
                                        setMatchDetails(details);
                                    }
                                }
                            ];
                        case 'matchQ':
                            return [
                                {
                                    command: 'update-participant',
                                    data: {
                                        tournamentSocketId,
                                        matchKey: 'secondplace',
                                        participantSide: 'winner',
                                        player: matchWinner,
                                        role
                                    }
                                },
                                {
                                    command: 'update-participant',
                                    data: {
                                        tournamentSocketId,
                                        matchKey: 'thirdplace',
                                        participantSide: 'winner',
                                        player: matchLoser,
                                        role
                                    }
                                },
                                {
                                    command: 'match-details',
                                    data: (details) => {
                                        // console.log('Received updated match-details:', details);
                                        setMatchDetails(details);
                                        setTournamentStatus('closed');
                                    }
                                }
                            ];

    }
};
