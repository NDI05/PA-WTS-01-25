const router = require('express').Router()

const emailController = require('../controllers/email.controller')

router.post('/sendResetPassword', emailController.sendResetPassword)

module.exports = router

