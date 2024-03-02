const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to create a new user and tournament together
router.post('/createUser', userController.insertUserAndTournament);
router.get('/getAllUserData', userController.getAllUserData);
module.exports = router;