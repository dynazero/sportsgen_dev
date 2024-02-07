import React from 'react'

export const generateInitialMatches = (participants, tournamentInfo) => {
    const totalMatches = calculateTotalMatches(participants.length);
    let initialMatches = {};
  
    for (let i = 0; i < totalMatches; i++) {
      const matchKey = generateMatchKey(i); // Generates Aa, Ab, Ac, ..., Az, Ba, Bb, etc.
      initialMatches[matchKey] = {
        participant1: i < participants.length ? participants[i].name : null,
        participant2: i + 1 < participants.length ? participants[i + 1].name : null,
        winner: null,
        loser: null,
        score: { player1: '0', player2: '0' },
        status: 'open'
      };
    }
  
    return {
      tournamentInfo: {
        ...initialMatches,
        champion: { winner: null }, // Placeholder for the champion
        firstRunnerUp: { winner: null }, // Placeholder for the first runner-up
        secondPlace: { winner: null }, // Placeholder for the second place
      },
      ...initialMatches
    };
  };
  
  const generateMatchKey = (index) => {
    if (index < 26) {
      // For the first 26 matches, return single characters A-Z
      return String.fromCharCode(65 + index); // A-Z
    } else {
      // For subsequent matches, use the two-character pattern
      index -= 26;
      const firstChar = String.fromCharCode(65 + Math.floor(index / 26)); // A-Z
      const secondChar = String.fromCharCode(97 + index % 26); // a-z
      return `${firstChar}${secondChar}`;
    }
  };
  
  const calculateTotalMatches = (numParticipants) => {
    return Math.ceil(numParticipants / 2);
  };