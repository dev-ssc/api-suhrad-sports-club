const User = require('../models/User');
const Tournament = require('../models/Tournament');

async function insertUserAndTournament(req, res) {
  try {
    const { firstName, lastName, email, phoneNumber, address, profilePicture, rideDetails, skills } = req.body;
    
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      profilePicture
    });

    const savedUser = await newUser.save();
    console.log("rideDetails",rideDetails)
    console.log("skills",skills)
    const newTournament = new Tournament({
      tournamentName: 'ACT2024',
      userId: savedUser._id,
      teamId: '',
      bidAmount: '',
      rideDetails: rideDetails,
      skills: skills
    });

    const savedTournament = await newTournament.save();

    res.status(201).json({ user: savedUser, tournament: savedTournament });
  } catch (error) {
    console.error('Error inserting user and tournament:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllUserData(req, res) {
    try {
      const users = await User.find();
  
      const userDataWithTournaments = [];
  
      for (const user of users) {
        const tournaments = await Tournament.find({ userId: user._id });
  
        const userData = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          profilePicture: user.profilePicture,
          tournaments: tournaments
        };
  
        userDataWithTournaments.push(userData);
      }
  
      res.json(userDataWithTournaments);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  module.exports = {
    insertUserAndTournament,
    getAllUserData
  };
