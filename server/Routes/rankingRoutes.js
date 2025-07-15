const express = require('express');
const router = express.Router();
const { getTopRankings } = require('../controllers/rankingController');

router.get('/:type', getTopRankings); 

module.exports = router;
