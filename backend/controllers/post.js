///////////////////////////////////////////////////////////////////
//   Contrôleur permettant de gérer les actions liées aux posts  //
///////////////////////////////////////////////////////////////////

const { Post, User, Like, Comment } = require("../models");
const { Op } = require("sequelize");
const fs = require('fs');

exports.getPosts = (req, res) => {
  // Cherche tous les posts en incluant les utilisateurs correspondants, récupère les likes ainsi que les commentaires
  // dans l'ordre décroissant des dates
  Post.scope('formatted_date').findAll({
    include: [{ model: User, as: 'User', attributes: ['firstname', 'lastname', 'avatar_url'] },
    { model: Like },
    {
      model: Comment,
      include: [{ model: User, attributes: ['firstname', 'lastname', 'avatar_url'] }],
    }
    ],
    order: [
      ['date_publication', 'DESC'],
      [Comment, 'createdAt', 'DESC']
    ]
  })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
}

exports.createPost = (req, res) => {
  const newPost = {
    img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    UserId: req.body.userId
  }
  Post.create(newPost)
    .then(post => res.status(201).json(post))
    .catch(error => res.status(500).json({ error }));
}

exports.deletePost = (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      // On supprime l'image du post du serveur puis on supprime le post
      const filename = post.img_url.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Post supprimé !' }))
          .catch(error => res.status(500).json({ error }));
      })
    })
    .catch(error => res.status(500).json({ error }));
}

exports.likePost = (req, res) => {
  Like.findOne({
    where: {
      userId: req.body.userId,
      postId: req.body.postId
    }
  })
    .then(response => {
      // Si l'utilisateur n'a aucun like ou dislike sur le post
      if (response == null) {
        // et qu'il appuie sur like
        if (req.body.likeValue == 1) {
          Like.create({ liked: req.body.likeValue, postId: req.body.postId, userId: req.body.userId });
          Post.increment({ likes: 1 }, { where: { id: req.body.postId } })
          res.status(201).json({ message: 'Like ajouté au post' })
        }
        // et qu'il appuie sur dislike
        else if (req.body.likeValue == -1) {
          Like.create({ liked: req.body.likeValue, postId: req.body.postId, userId: req.body.userId });
          Post.increment({ dislikes: 1 }, { where: { id: req.body.postId } })
          res.status(201).json({ message: 'Dislike ajouté au post' })
        }
      }
      // Si l'utilsateur a déjà like le post
      else if (response.dataValues.liked == 1) {
        // et appuie sur dislike
        if (req.body.likeValue == -1) {
          Like.update({ liked: -1 }, {
            where: {
              [Op.and]: [{ postId: req.body.postId }, { userId: req.body.userId }]
            }
          })
          Post.increment({ dislikes: 1 }, { where: { id: req.body.postId } });
          Post.decrement({ likes: 1 }, { where: { id: req.body.postId } });
          res.status(201).json({ message: 'Like retiré et dislike ajouté au post' })
        }
        // et appuie sur like
        else {
          Like.destroy({
            where: {
              [Op.and]: [{ postId: req.body.postId }, { userId: req.body.userId }]
            }
          });
          Post.decrement({ likes: 1 }, { where: { id: req.body.postId } });
          res.status(201).json({ message: 'Like retiré du post' })
        }
      }
      // Si l'utilisateur a déjà dislike le post
      else if (response.dataValues.liked == -1) {
        // et appuie sur like
        if (req.body.likeValue == 1) {
          Like.update({ liked: 1 }, {
            where: {
              [Op.and]: [{ postId: req.body.postId }, { userId: req.body.userId }]
            }
          })
          Post.decrement({ dislikes: 1 }, { where: { id: req.body.postId } });
          Post.increment({ likes: 1 }, { where: { id: req.body.postId } });
          res.status(201).json({ message: 'Dislike retiré et like ajouté au post' })
        }
        // et appuie sur dislike
        else {
          Like.destroy({
            where: {
              [Op.and]: [{ postId: req.body.postId }, { userId: req.body.userId }]
            }
          });
          Post.decrement({ dislikes: 1 }, { where: { id: req.body.postId } });
          res.status(201).json({ message: 'Dislike retiré du post' })
        }
      }
    })
    .catch(error => res.status(500).json({ error }));
}