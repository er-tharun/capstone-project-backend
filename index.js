// index.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

const corsOptions = {
    origin: 'http://localhost:5173', // Change this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
    credentials: true // if you need cookies on cross-origin requests
};
app.use(bodyParser.json());
app.options('*', cors(corsOptions)); // Allow preflight requests for all routes

// Routes
const authRoutes = require('./auth');
const appointmentRouter = require('./appointment');
const paymentRoutes = require('./payment');

app.use('/api', authRoutes);
app.use('/appointments', appointmentRouter);
app.use('/api/payment', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
