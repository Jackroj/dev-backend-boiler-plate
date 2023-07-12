const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();

const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');

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


app.use('/user', accessLog, userRoute);
app.use('/auth', accessLog, authRoute);

app.listen(config.PORT, () => {
  console.log(`Listening at ${config.PORT}`);
});
