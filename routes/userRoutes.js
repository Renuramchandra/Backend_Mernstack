
const userController = require ('../controllers/userController');
const express = require('express');

const router = express.Router();

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);

 
router.get('/all-users' , userController.getUsersWithFirms); // Get endpoints to retrieve all users with their firms //
router.get('/single-user/:apple', userController.getUserById); // get endpoint with single id //

module.exports = router;



