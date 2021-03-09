const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require("../models");


exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname.toUpperCase(),
        email: req.body.email,
        password: hash
      }
      User.create(newUser)
        .then(() => res.status(200).json({ message: 'Utilisateur crée !' }))
        .catch(() => res.status(400).json({ error: "Cet email est déjà utilisé" }))
    })
    .catch((error) => {
      console.log(error);
    })
};

exports.login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.dataValues.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect ! " });
          }
          console.log('Connexion réussie');
          res.status(200).json({
            userId: user.dataValues.id,
            token: jwt.sign(
              { userId: user.dataValues.id },
              process.env.SECRET_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch((error) => {
      console.log(error);
    })
};

exports.getOneUser = (req, res) => {
  User.scope('nopassword').findOne({ where: { id: req.body.id } })
    .then(user => res.status(200).json(user))
    .catch((error) => {
      console.log(error)
    })
}

exports.changePassword = (req, res) => {
  User.findOne({ where: { id: req.body.id } })
    .then(user => {
      bcrypt.compare(req.body.oldPassword, user.dataValues.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: "Ancien mot de passe incorrect !" })
          }
          bcrypt.hash(req.body.newPassword, 10)
            .then(newHash => {
              User.update({ password: newHash }, { where: { id: req.body.id } })
              res.status(200).json({ message: "Mot de passe changé avec succès" })
            })
            .catch(error => {
              res.status(500).json({ error });
            })
        })
        .catch(error => res.status(400).json({ error }))
    })
    .catch(() => res.status(500).json({ error: "L'utilisateur n'a pas été trouvé !" }))
}

exports.deleteUser = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
    .catch(error => console.log(error));
}