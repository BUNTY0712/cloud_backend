const express = require('express');
const {
	registerController,
	loginController,
	getSixUserController,
} = require('../controllers/userController');

const router = express.Router();
router.post('/login', loginController);
router.post('/resgister', registerController);
router.post('/getsixusers', getSixUserController);

module.exports = router;
