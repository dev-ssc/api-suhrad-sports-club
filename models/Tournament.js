const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  tournamentName: { type: String },
  userId: { type: String, required: true },
  teamId: { type: String, default: '' },
  bidAmount: { type: String, default: '' },
  rideDetails: {
    provideRides: { type: String },
    numberOfRides: { type: String }
  },
  skills: {
    skillSet: { type: String },
    ratingBatting: { type: String },
    ratingBowler: { type: String }
  }
  // Add other fields as needed
});

const Tournaments = mongoose.model('ACT2024', tournamentSchema); // Model name changed to 'Tournaments'

module.exports = Tournaments;
