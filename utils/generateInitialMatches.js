import React from 'react'

export const generateInitialMatches = (participants, tournamentInfo, participantsCount) => {

    let initialMatches = {};
    let scores = {};
    let matchWinners = {};
    let matchLosers = {};

    switch (participantsCount) {
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            break;
        case 9:
            break;
        case 10:
            matchWinners = {
                matchA: null,
                matchB: null,
                matchC: null,
                matchD: null,
                matchE: null,
                matchF: null,
                matchG: null,
                matchH: null,
                matchI: null,
                matchJ: null,
                matchK: null,
                matchL: null,
                matchM: null,
                matchN: null,
                matchO: null,
                matchP: null,
                matchQ: null,
            };

            matchLosers = {
                matchA: null,
                matchB: null,
                matchC: null,
                matchD: null,
                matchE: null,
                matchF: null,
                matchG: null,
                matchH: null,
                matchI: null,
                matchJ: null,
                matchK: null,
                matchL: null,
                matchM: null,
                matchN: null,
                matchO: null,
                matchP: null,
                matchQ: null,
            };

            

            initialMatches = {
                tournamentInfo: { tournamentName: tournamentInfo.eventName, tournamentCategory: tournamentInfo.title, status: 'open' },
                matchA: { participant1: participants.participant1.name, participant2: participants.participant2.name, winner: matchWinners.matchA, loser: matchLosers.matchA, score: { player1: '0', player2: '0' }, status: 'open' },
                matchB: { participant1: participants.participant3.name, participant2: participants.participant4.name, winner: matchWinners.matchB, loser: matchLosers.matchB, score: { player1: '0', player2: '0' }, status: 'open' },
                matchC: { participant1: participants.participant6.name, participant2: participants.participant7.name, winner: matchWinners.matchC, loser: matchLosers.matchC, score: { player1: '0', player2: '0' }, status: 'open' },
                matchD: { participant1: participants.participant9.name, participant2: participants.participant10.name, winner: matchWinners.matchD, loser: matchLosers.matchD, score: { player1: '0', player2: '0' }, status: 'open' },
                matchE: { participant1: matchWinners.matchA, participant2: participants.participant5.name, winner: matchWinners.matchE, loser: matchLosers.matchE, score: { player1: '0', player2: '0' }, status: 'close' },
                matchF: { participant1: matchWinners.matchB, participant2: participants.participant8.name, winner: matchWinners.matchF, loser: matchLosers.matchF, score: { player1: '0', player2: '0' }, status: 'close' },
                matchG: { participant1: matchWinners.matchE, participant2: matchWinners.matchC, winner: matchWinners.matchG, loser: matchLosers.matchG, score: { player1: '0', player2: '0' }, status: 'close' },
                matchH: { participant1: matchWinners.matchF, participant2: matchWinners.matchD, winner: matchWinners.matchH, loser: matchLosers.matchH, score: { player1: '0', player2: '0' }, status: 'close' },
                matchI: { participant1: matchLosers.matchA, participant2: matchLosers.matchB, winner: matchWinners.matchI, loser: matchLosers.matchI, score: { player1: '0', player2: '0' }, status: 'close' },
                matchJ: { participant1: matchLosers.matchC, participant2: matchLosers.matchD, winner: matchWinners.matchD, loser: matchLosers.matchJ, score: { player1: '0', player2: '0' }, status: 'close' },
                matchK: { participant1: matchLosers.matchE, participant2: matchWinners.matchI, winner: matchWinners.matchK, loser: matchLosers.matchK, score: { player1: '0', player2: '0' }, status: 'close' },
                matchL: { participant1: matchLosers.matchF, participant2: matchWinners.matchJ, winner: matchWinners.matchL, loser: matchLosers.matchL, score: { player1: '0', player2: '0' }, status: 'close' },
                matchM: { participant1: matchLosers.matchG, participant2: matchWinners.matchK, winner: matchWinners.matchM, loser: matchLosers.matchM, score: { player1: '0', player2: '0' }, status: 'close' },
                matchN: { participant1: matchLosers.matchH, participant2: matchWinners.matchL, winner: matchWinners.matchN, loser: matchLosers.matchN, score: { player1: '0', player2: '0' }, status: 'close' },
                matchO: { participant1: matchWinners.matchG, participant2: matchWinners.matchH, winner: matchWinners.matchO, loser: matchLosers.matchO, score: { player1: '0', player2: '0' }, status: 'close' },
                matchP: { participant1: matchWinners.matchM, participant2: matchWinners.matchN, winner: matchWinners.matchP, loser: matchLosers.matchP, score: { player1: '0', player2: '0' }, status: 'close' },
                matchQ: { participant1: matchLosers.matchO, participant2: matchWinners.matchP, winner: matchWinners.matchQ, loser: matchLosers.matchQ, score: { player1: '0', player2: '0' }, status: 'close' },
                champion: { winner: matchWinners.matchO },
                secondplace: { winner: matchWinners.matchQ },
                thirdplace: { winner: matchLosers.matchQ }
            };
            break;

    }

    return {
        initialMatches: {
            ...initialMatches
        }
    };
};
