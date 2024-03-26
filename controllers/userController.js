const User = require('../models/User');
const Tournament = require('../models/Tournament');

async function insertUserAndTournament(req, res) {
  try {
    const { firstName, lastName, email, phoneNumber, address, profilePicture, rideDetails, skills,isJoiningWaitingList } = req.body;
    
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
    // Check if isJoiningWaitingList exists in savedUser
    if (isJoiningWaitingList !== undefined) {
      newTournament.isJoiningWaitingList = isJoiningWaitingList;
    }
    const savedTournament = await newTournament.save();

    res.status(201).json({ user: savedUser, tournament: savedTournament });
  } catch (error) {
    console.error('Error inserting user and tournament:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function filterUsers (req, res)  {
  try {
      const { firstName, lastName, email, phoneNumber, city, state, postalCode, count } = req.query;

      let query = {};
      if (firstName) {
          query.firstName = firstName;
      }
      if (lastName) {
          query.lastName = lastName;
      }
      if (email) {
          query.email = email;
      }
      if (phoneNumber) {
          query.phoneNumber = phoneNumber;
      }
      if (city) {
          query['address.city'] = city;
      }
      if (state) {
          query['address.state'] = state;
      }
      if (postalCode) {
          query['address.postalCode'] = postalCode;
      }

      let filteredData = await User.find(query);

      if (count === 'true') {
          const totalCount = await User.countDocuments(query);
          res.json({ count: totalCount });
      } else {
          res.json(filteredData);
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
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
    getAllUserData,
    filterUsers
  };
