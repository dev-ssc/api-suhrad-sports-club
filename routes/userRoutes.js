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


/**
 * @swagger
 * /api/filterdata:
 *   get:
 *     summary: Retrieve filtered users
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filter by first name
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Filter by last name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by email
 *       - in: query
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         description: Filter by phone number
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filter by state
 *       - in: query
 *         name: postalCode
 *         schema:
 *           type: string
 *         description: Filter by postal code
 *       - in: query
 *         name: count
 *         schema:
 *           type: string
 *         description: Set to 'true' to get the count of filtered users
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad request
 */
router.get('/filterdata', userController.filterUsers);
module.exports = router;
