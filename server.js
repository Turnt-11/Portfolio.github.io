const express = require('express');
const session = require('express-session');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const smtpTransport = require('nodemailer-smtp-transport');

const cors = require('cors');
const crypto = require('crypto');
const ejsMate = require('ejs-mate');
const path = require('path');
const nodemailer = require('nodemailer');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

const app = express();

// Set up view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(__dirname + '/views/img/favi.ico'));



app.use('/views/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/views/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/views/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/views/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));

// Middleware
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable sessions
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: 'None',
      secure: true,
    },
  })
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kylesvault@gmail.com',
    pass: 'hwerhjhaaoxdnhvy',
  },
});

//homepage
const homeRoute = require('./routes/index');
app.use('/', homeRoute);

app.post('/contact', (req, res) => {
  const { name, email, service, message } = req.body;

  const mailOptions = {
    from: 'kylesvault@gmail.com',
    to: email, // Use the email entered in the form as the recipient
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent:', info.response);
      res.render('index', {message: 'Email sent successfully!'});
    }
  });
});




//About route
// Error handling middleware
app.use(function (err, req, res, next) {
  if (err.name === 'Error' && err.message === 'Not allowed by CORS') {
    res.status(403).send('Forbidden');
  } else {
    next(err);
  }
  
});


// Catch-all route handler for non-existent routes
app.get('*', (req, res) => {
  res.redirect('/');
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});