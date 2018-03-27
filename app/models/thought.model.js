var mongoose = require('mongoose');

// Create thought schema
var ThoughtSchema = mongoose.Schema({
  author: String,
  content: String,
  tags: Array,
  rep: Number,
  createdAt: Date
});

// Export thought schema
module.exports = mongoose.model('Thought', ThoughtSchema);
