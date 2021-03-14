const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer_config');

const postControl = require('../controllers/post');

router.get('/posts/:id', auth, postControl.getPosts);
router.post('/posts', auth, multer, postControl.createPost);
router.post('/posts/like', auth, postControl.likePost);
router.delete('/posts/:id', auth, postControl.deletePost);
router.post('/posts/comment', auth, postControl.commentPost);
router.delete('/posts/comment/:id', auth, postControl.deleteComment);
router.put('/posts/comment', auth, postControl.modifyComment);

module.exports = router;