var Thought = require('../models/thought.model.js');

exports.create = function(req, res) {
  // Create and save a new thought
  if (!req.body.content) {
    return res.status(400).send({message: "Empty thoughts are for empty minds."});
  }

  var thought = new Thought({ author: req.body.author || "No name", content: req.body.content, tags: req.body.tags, rep: 0, createdAt: new Date() });

  thought.save(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({message: "Your thought has created an error with our system."});
    } else {
      res.send(data);
    }
  });

};

exports.findAll = function(req, res) {
  // Retrieve and return all thoughts from the database
  Thought.find(function(err, thoughts) {
    if (err) {
      console.log(err);
      res.status(500).send({message: "Houston, we have a problem. All thoughts could not be retrieved."});
    } else {
      res.send(thoughts);
    }
  });

};

exports.findOne = function(req, res) {
  // Retrieve and return one thought with the specified thoughtId
  Thought.findById(req.params.thoughtId, function(err, thought) {
    if (err) {
      console.log(err);
      if(err.kind === 'ObjectId') {
        return res.status(404).send({message: "Thought with this id (" + req.params.thoughtId + ") not found."});
      }
      return res.status(500).send({message: "Error retrieving thought with id " + req.params.thoughtId});
    }

    if (!thought) {
      return res.status(404).send({message: "Thought not found with id " + req.params.thoughtId});
    }

    res.send(thought);

  });

};

exports.update = function(req, res) {
  // Update a thought with the specified thoughtId in the request
  Thought.findById(req.params.thoughtId, function(err, thought) {
    if (err) {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({message: "Thought not found with id " + req.params.thoughtId});
      }
      return res.status(500).send({message: "Error finding thought with id " + req.params.thoughtId});
    }

    if (!thought) {
      return res.status(404).send({message: "Thought not found with id " + req.params.thoughtId});
    }

    thought.author = req.body.author;
    thought.content = req.body.content;

    thought.save(function(err, data) {
      if (err) {
        res.status(500).send({message: "Could not update thought with id " + req.params.thoughtId});
      } else {
        res.send(data);
      }
    });
  });

};

exports.delete = function(req, res) {
  // Delete a thought with the specified thoughtId in the request
  Thought.findByIdAndRemove(req.params.thoughtId, function(err, thought) {
    if (err) {
      console.log(err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({message: "Thought not found with id " + req.params.thoughtId});
      }
      return res.status(500).send({message: "Could not delete thought with id " + req.params.thoughtId});
    }

    if (!thought) {
      return res.status(404).send({message: "Thought not found with id " + req.params.thoughtId});
    }

    res.send({message: "Thought successfully deleted."});
  });

};
