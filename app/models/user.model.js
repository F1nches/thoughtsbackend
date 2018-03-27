var mongoose = require('mongoose');

// Create thought schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  rep: Number,
  createdAt: Date,
  wallet: Array
});

// Export thought schema
module.exports = mongoose.model('User', UserSchema);
