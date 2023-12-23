const express = require('express');
const router = express.Router();
const questionController = require("../../controllers/questionController")

router.post("/choice", questionController.createChoiceQuestion);
router.post("/sentence", questionController.createSentenceQuestion);
router.post("/fill", questionController.createFillQuestion);
router.get("/choice", questionController.getAllChoiceQuestion);
router.get("/sentence", questionController.getAllSentenceQuestion);
router.get("/fill", questionController.getAllFillQuestion);

module.exports = router;