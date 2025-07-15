const express = require('express');
const router = express.Router();
const History = require('../models/PointsHistory');

router.get('/:userId', async (req, res) => {
  try {
    const history = await History.find({ userId: req.params.userId }).sort({ claimedAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
