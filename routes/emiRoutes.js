const express = require('express');
const {
	creatEmiController,
	getLastEmiController,
} = require('../controllers/emiController');

const router = express.Router();

router.post('/emicreate', creatEmiController);
router.post('/lastemi', getLastEmiController);

module.exports = router;
