var User = require('../models/user.model.js');

exports.create = function(req, res) {
  // Create and save a new user
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).send({message: "Empty field somewhere."});
  }

  var user = new User({ username: req.body.username, password: req.body.password, email: req.body.email, rep: 0, createdAt: new Date() });

  user.save(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({message: "Error when saving new user."});
    } else {
      res.send(data);
    }
  });

};

// exports.findOne = function(req, res) {
//   // Retrieve and return one user with the specified id
//   User.findById(req.params.userId, function(err, user) {
//     if (err) {
//       console.log(err);
//       if(err.kind === 'ObjectId') {
//         return res.status(404).send({message: "User with this id (" + req.params.userId + ") not found."});
//       }
//       return res.status(500).send({message: "Error retrieving user with id " + req.params.userId});
//     }
//
//     if (!user) {
//       return res.status(404).send({message: "User not found with id " + req.params.userId});
//     }
//
//     res.send(user);
//
//   });
//
// };

exports.delete = function(req, res) {
  // Delete a user with the specified id
  User.findByIdAndRemove(req.params.userId, function(err, user) {
    if (err) {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({message: "User not found with id " + req.params.userId});
      }
      return res.status(500).send({message: "Could not delete user with id " + req.params.userId});
    }

    if (!user) {
      return res.status(404).send({message: "User not found with id " + req.params.userId});
    }

    res.send({message: "User successfully deleted."});
  });

};
