// server/models/Role.js
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: [{
    type: String,
  }],
});

module.exports = mongoose.model('role', RoleSchema);
