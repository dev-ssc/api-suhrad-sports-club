const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamId: { type: String },
  tournamentId: { type: String },
  teamName: { type: String },
  members: [{ type: String }],
  budget: {
    total: { type: String },
    remaining: { type: String }
  },
  captain: { type: String },
  viceCaptain: { type: String }
});

const Team = mongoose.model('teams', teamSchema);

module.exports = Team;
