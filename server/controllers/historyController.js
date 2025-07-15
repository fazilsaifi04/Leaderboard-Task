const History = require('../models/PointsHistory');

exports.getUserHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.params.userId }).sort({ claimedAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
