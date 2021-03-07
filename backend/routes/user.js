const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userControl = require('../controllers/user');

router.post('/signup', userControl.signup);
router.post('/login', userControl.login);
router.post('/user', auth, userControl.getOneUser);

module.exports = router;