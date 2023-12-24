const express = require('express');
const router = express.Router();
const leaderBoardController = require("../../controllers/leaderBoardController")

router.get("/", leaderBoardController.getTopUser);

module.exports = router;