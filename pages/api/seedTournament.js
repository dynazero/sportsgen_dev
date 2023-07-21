// pages/api/seed.js

import mongoose from 'mongoose';
import Tournament from "../../model/Tournament";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Connect to your MongoDB database
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // The array of data to seed
    const tournamentsData = [
      {
        eventId: new mongoose.Types.ObjectId(),
        eventName: 'Tournament 1',
        eventLogo: 'logo1.jpg',
        organizer: 'Organizer 1',
        flag: 'USA',
        eventType: 'Type 1',
        categories: [1, 2, 3],
        url: 'http://tournament1.com',
        address: '123 Street, City, State, Country',
        startDate: new Date(),
        endDate: new Date(),
        description: 'This is tournament 1',
        format: 'Single Elimination',
        matchForThird: false,
        registrationFee: 100,
        maxParticipants: 32,
        startTime: new Date(),
      },
      // Add more tournament objects as needed
    ];

    // Loop through the array and save each data object
    for (let tournamentData of tournamentsData) {
      const tournament = new Tournament(tournamentData);
      await tournament.save();
    }

    res.status(200).json({ message: 'Data seeded successfully' });
  } else {
    res.status(400).json({ message: 'Only POST requests are accepted' });
  }
}
