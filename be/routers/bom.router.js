const router = require('express').Router();
const bomController = require('../controllers/bom.controller');
const authMiddleware = require('../middleware/app.middleware');

router.post('/create', authMiddleware.isAuth, bomController.createBom);

module.exports = router;