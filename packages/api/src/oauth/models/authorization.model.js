const mongoose = require('mongoose');

const authorizationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', index: true },
  allowedScopes: [String],
});

module.exports = mongoose.model('Authorization', authorizationSchema);
