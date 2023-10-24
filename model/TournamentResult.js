import mongoose from "mongoose";

const participantListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
  },
})

const matchSchema = new mongoose.Schema({
  participant1: {
    type: String,
    required: true,
    trim: true,
  },
  participant2: {
    type: String,
    required: true,
    trim: true,
  },
  winner: {
    type: String,
    required: true,
    trim: true,
  },
  score: {
    type: {
      player1: {
        type: Number,
        required: true,
        trim: true,
      },
      player2: {
        type: Number,
        required: true,
        trim: true,
      }
    },
    required: true,
    trim: true,
  },
});

const tournamentresultSchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
  },
  tournamentSocketId: {
    type: String,
    required: true,
    trim: true,
  },
  champion: {
    type: {
      participantId: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
      },
      participant: {
        type: String,
        required: true,
        trim: true,
      }
    },
    required: true,
    trim: true,
  },
  matches: {
    type: Map,
    of: matchSchema,
    required: true,
    trim: true,
  },
  participantList: {
    type: Map,
    of: participantListSchema,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Check-in', 'Live', 'Finals', 'Awarding', 'Closed'],
    default: 'Closed'
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const TournamentResult = mongoose.models.TournamentResult || mongoose.model("TournamentResult", tournamentresultSchema, "tournamentresults");

export default TournamentResult;