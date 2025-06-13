const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./passport'); // initialize passport config

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send(`<h1>Home</h1><a href="/auth/google">Login with Google</a>`);
});

app.use('/auth', authRoutes);

app.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Protected Page</h1><p>Welcome ${req.user.displayName}</p>`);
  } else {
    res.status(401).send('Unauthorized');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
