const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

require('dotenv').config();

const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const swagger = require('./config/swagger');


app.use(cors({
  origin: process.env.ORIGIN_URL
}));
swagger(app);

// Initialize passport variables
require('./config/passport');

const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

const accessLog = require('./middleware/accessLog');

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());

// setup the flash message middleware
app.use(flash());

// setup the session middleware
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true
  }));
  

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN_URL); // Replace with your allowed origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Specify the allowed HTTP methods
  next();
});
app.use('/user', accessLog, userRoute);
app.use('/auth', accessLog, authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT}`);
});
