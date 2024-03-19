const mongoose = require('mongoose');
const { env } = require('../config/config');

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

let Tournaments;
// Check the environment variable to determine which model to export
if (env === 'staging') {
  Tournaments= mongoose.model('ACT2024-staging', tournamentSchema);;
} else {
  Tournaments = mongoose.model('ACT2024', tournamentSchema);;
}

module.exports = Tournaments;
