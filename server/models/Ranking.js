const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['wealth', 'live', 'hourly'] 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    points: Number,
    timestamp: Date
});

module.exports = mongoose.model('Ranking', rankingSchema);
