const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  team_id: {
    type: String,
    default: ''
  },
  player_skill: {
    type: String,
    default:''
  },
  tournament_id: {
    type: String,
    default: 'abct' // Assuming tournament_id is 'abct'
  }
  // Add other fields as needed
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
