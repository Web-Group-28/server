const express = require('express');
const langController = require('../../controllers/langController');
const router = express.Router();

router.get('/', langController.languages);//OK

module.exports = router;