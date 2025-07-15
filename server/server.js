require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/rankings', require('./Routes/rankingRoutes'));
app.use('/api/history', require('./Routes/historyRoutes'));

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
