const express = require('express');
const {
	createloanCrontroller,
	createloanController,
	getloanController,
} = require('../controllers/loanController');

const router = express.Router();

router.post('/createloan', createloanController);
router.post('/getloan', getloanController);

module.exports = router;
