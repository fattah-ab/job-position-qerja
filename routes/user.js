const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/User');
const { Authentication } = require('../middlewares/auth');

router.get('/', UserController.getUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/detail', Authentication, UserController.detailUser);


module.exports = router;
