const mongoose = require('../config/db'); // Import mongoose instance from db.js
const User = require('../models/User');
const Tournament = require('../models/Tournament');

// Function to handle insertion of user and tournament
async function insertUserAndTournament(req, res) {
  try {
    // Create a new user object
 // Extract data from the request body
    // console.log("req",req.body)
    // Create a new user object based on the updated schema
    const { username, email, bowlerSkill, batsmanSkill, profile_picture } = req.body;

    // Create the playerskill object
    const skills = bowlerSkill
    

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      skills,
      profile_picture
    });
    // Save the user to the database
    const savedUser = await newUser.save();
     console.log("Saved",savedUser)
    // Create a new tournament object
    const newTournament = new Tournament({
      // Extract tournament data from request body or form data
      // Example: tournament name, date, etc.
      user_id: savedUser._id, // Assign the user ID to the tournament
      team_id: '', // Keep team_id empty
      player_skill: req.body.skills, // Extract player skill from form data
      tournament_id: 'abct' // Set tournament ID as 'abct'
    });

    // Save the tournament to the database
    const savedTournament = await newTournament.save();

    res.status(201).json({ user: savedUser, tournament: savedTournament });
  } catch (error) {
    console.error('Error inserting user and tournament:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllUserData(req, res) {
    try {
      // Find all users
      const users = await User.find();
  
      // Array to store user data with related tournaments
      const userDataWithTournaments = [];
  
      // Iterate through each user
      for (const user of users) {
        // Find related tournaments for each user
        const tournaments = await Tournament.find({ user_id: user._id });
  
        // Combine user data with tournament data
        const userData = {
          _id: user._id,
          username: user.username,
          email: user.email,
          skills: user.skills,
          profile_picture: user.profile_picture,
          tournaments: tournaments
        };
  
        // Push combined data to array
        userDataWithTournaments.push(userData);
      }
  
      // Return array of user data with related tournaments
      res.json(userDataWithTournaments);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  module.exports = {
    getAllUserData
  };
  

module.exports = {
  insertUserAndTournament,getAllUserData
};
