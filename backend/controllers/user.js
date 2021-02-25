const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require("../models");


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = {
        firstName: req.body.firstName.toUpperCase(),
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      }
      User.create(newUser)
        .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
        .catch(error => console.log(error))
    })
    .catch((error) => {
      console.log(error);
    })
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      console.log(user.dataValues);
      /*
      if (!user) {
        return res.status(401).json({error: 'Utilisateur non trouvé !'});
      }
      bcrypt.compare(res.data.password, user.data.password)
      */
    })
    .catch((error) => {
      console.log(error);
    })
};