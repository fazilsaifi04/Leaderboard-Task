require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000','https://leaderboard-task-lgbbqhmad-md-fazils-projects.vercel.app/'], // Replace with actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Health check
app.get('/', (req, res) => {
  res.send('Leaderboard API is running');
});

// Routes
app.use('/api/users', require('./Routes/userRoutes'));
app.use('/api/rankings', require('./Routes/rankingRoutes'));
app.use('/api/history', require('./Routes/historyRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

