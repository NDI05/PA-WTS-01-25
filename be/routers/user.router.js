const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/sendEmail', userController.sendResetPassword);
router.post('/resetPassword', userController.resetPassword);

module.exports = router;