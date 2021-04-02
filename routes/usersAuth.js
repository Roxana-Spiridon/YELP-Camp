const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/user');
const usersAuth = require('../controllers/usersAuth');

router.route('/register')
    .get(usersAuth.renderRegister)
    .post(catchAsync(usersAuth.register));

router.route('/login')
    .get(usersAuth.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersAuth.login);

router.get('/logout', usersAuth.logout);

module.exports = router;