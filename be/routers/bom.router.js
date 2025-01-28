const router = require('express').Router();
const bomController = require('../controllers/bom.controller');
const authMiddleware = require('../middleware/app.middleware');

router.post('/create', authMiddleware.isAuth, bomController.createBom);
router.get('/getBom', authMiddleware.isAuth, bomController.getBom);
router.put('/update', authMiddleware.isAuth, bomController.updateBom);

module.exports = router;