const Ranking = require('../models/Ranking');
const User = require('../models/user');

exports.getTopRankings = async (req, res) => {
    try {
        const { type } = req.params;
        const rankings = await Ranking.find({ type })
            .sort({ points: -1 })
            .limit(10)
            .populate('userId', 'username avatarUrl country');

        res.json(rankings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
