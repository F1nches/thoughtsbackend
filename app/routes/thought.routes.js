module.exports = function(app) {
  var thoughts = require('../controllers/thought.controller.js');

  // Create a new thought
  app.post('/api/thoughts', thoughts.create);

  // Retrieve all thoughts
  app.get('/api/thoughts', thoughts.findAll);

  // Retrieve a single thought by thoughtId
  app.get('/api/thoughts/:thoughtId', thoughts.findOne);

  // Update a single thought by thoughtId
  app.put('/api/thoughts/:thoughtId', thoughts.update);

  // Delete a single thought by thoughtId
  app.delete('/api/thoughts/:thoughtId', thoughts.delete);
}
