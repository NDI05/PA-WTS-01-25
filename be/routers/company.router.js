const router = require('express').Router()
const companyController = require('../controllers/company.controller')
const authMiddleware = require('../middleware/app.middleware')

router.post('/create', authMiddleware.isAuth, companyController.createCompany)

module.exports = router