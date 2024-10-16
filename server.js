const express = require('express'); // Import dependencies
const logger = require('morgan');
const cors = require("cors");
const passport = require('passport');

const app = express(); // Initialize express app

// CORS configuration options
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers)
};

// Middleware
app.use(logger('dev')); // Log incoming requests
app.use(cors(corsOptions)); // Enable CORS with the defined options
app.options('*', cors(corsOptions)); // Handle preflight requests for all routes
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data (form data)
app.use(express.json()); // Parse incoming JSON data
app.use(express.static(__dirname + "/public")); // Serve static files from the 'public' folder

// Initialize Passport.js
app.use(passport.initialize());

// Route imports
require('./app/auth/passport');
app.use(require('./app/auth/routes'));
app.use(require('./app/region/routes'));
app.use(require('./app/skills/routes'));
app.use(require('./app/employment-type/routes'));
app.use(require('./app/languages/routes'));
app.use(require('./app/resume/routes'));
app.use(require('./app/specializations/routes'));
app.use(require('./app/vacancy/routes'));
app.use(require('./app/applies/routes'));

// Start server on port 3001
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});

