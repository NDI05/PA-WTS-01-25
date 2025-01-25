const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/app.middleware');
const router = require('express').Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/resetPassword', userController.resetPassword);
// router.get('/getuser', authMiddleware.isAuth, userController.getUser);

module.exports = router;