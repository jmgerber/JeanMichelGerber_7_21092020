const { Post } = require("../models");


exports.getPosts = (req, res) => {
  Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

exports.createPost = (req, res) => {
  const newPost = {
    img_url: req.body.img_url,
    user_id: req.body.user_id
  }
  Post.create(newPost)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }));
}
