const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    avatarUrl: String,
    country: String,
    wealthPoints: Number,
    contributionPoints: Number,
    flamePoints: Number,
}, { 
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
