/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/createUser:
 *   post:
 *     summary: Create a new user and tournament
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '201':
 *         description: User and tournament created successfully
 *       '500':
 *         description: Internal server error
 */
router.post('/createUser', userController.insertUserAndTournament);

/**
 * @swagger
 * /api/getAllUserData:
 *   get:
 *     summary: Retrieve all user data with related tournaments
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: User data retrieved successfully
 *       '500':
 *         description: Internal server error
 */
router.get('/getAllUserData', userController.getAllUserData);

module.exports = router;
