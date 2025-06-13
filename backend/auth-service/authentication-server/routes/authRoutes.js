const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start OAuth flow
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Handle callback
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/failure',
  successRedirect: '/auth/success' // This will redirect to the route below
}));

router.get('/success', (req, res) => {
  // Log the entire request object (can be very verbose)
  console.log('--- Entire Request Object ---');
  console.log(req);
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------');

  // Log the user object (more commonly what you want to inspect)
  console.log('--- User Object ---');
  console.log(req.user);
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------');

  // Log specific parts of the user object if known
  if (req.user) {
    console.log('User ID:', req.user.id);
    console.log('User Display Name:', req.user.displayName);
    console.log('User Emails:', req.user.emails);
  }

  res.send(`Welcome, ${req.user ? req.user.displayName : 'User'}`);
});

router.get('/failure', (req, res) => {
  console.log('--- Authentication Failure ---');
  console.log('Request object on failure:', req);
  console.log('-----------------------------');
  res.send('Authentication failed');
});

router.get('/logout', (req, res, next) => { // Added next for req.logout in newer passport versions
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return next(err);
    }
    console.log('User logged out');
    res.redirect('/');
  });
});

module.exports = router;
