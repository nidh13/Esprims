var express = require('express');
var router = express.Router();
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');
const isAuthenticated = require('../policies/isAuthenticated');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
//
// router.post('/login', authController.login);
// router.post('/token', authController.token);
// router.post('/sendEmail', emailController.sendEmail);

module.exports = router;
