const User = require('../models/user.js');

exports.createUser = async (req, res) => {
    try {
        const { username, avatarUrl, country, wealthPoints, contributionPoints, flamePoints } = req.body;

        const newUser = new User({
            username,
            avatarUrl,
            country,
            wealthPoints,
            contributionPoints,
            flamePoints
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const History = require('../models/PointsHistory.js'); 

exports.claimPoints = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const randomPoints = Math.floor(Math.random() * 100) + 1;
    user.wealthPoints = parseInt(user.wealthPoints) + randomPoints;
    await user.save();

    const historyEntry = new History({
      userId: user._id,
      pointsClaimed: randomPoints,
    });
    await historyEntry.save();

    res.json({
      message: 'Points claimed successfully',
      points: randomPoints,
      totalPoints: user.wealthPoints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


