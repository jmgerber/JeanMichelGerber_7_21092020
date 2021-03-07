const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const postControl = require('../controllers/post');

router.get('/posts', auth, postControl.getPosts);
router.post('/posts', auth, postControl.createPost);
router.post('/posts/like', auth, postControl.likePost);

module.exports = router;