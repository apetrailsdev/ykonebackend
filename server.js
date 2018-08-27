const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const morgan = require('morgan');
const path = require("path"); 
const router = express.Router();


// db Connection
const db = require('./config/db');

// Routes setup
const apiRoutes = require('./routes/api')(router);
const webRoutes = require('./routes/web')(router);

// Set Port 
const port = process.env.PORT || 3000;

// Initialize app 
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(cors());

// API version 1.0 routes
app.use('/api', apiRoutes);
app.use('/', webRoutes);

// Server Start
app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
});