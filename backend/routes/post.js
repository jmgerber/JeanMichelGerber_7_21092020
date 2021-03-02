const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const postControl = require('../controllers/post');

router.get('/posts', auth, postControl.getPosts);
router.post('/posts', postControl.createPost);

module.exports = router;