const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');  
const reviewRoutes = require('./routes/reviewRoutes'); 
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);         // Auth routes
app.use('/api/books', bookRoutes);        // Books routes
app.use('/api/reviews', reviewRoutes);    // Reviews routes
app.use('/api/auth', authRoutes); // Register the auth routes

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
