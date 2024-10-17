const express = require('express');
const { creatbankController } = require('../controllers/bankController');

const router = express.Router();
router.post('/createbankDetails', creatbankController);

module.exports = router;
