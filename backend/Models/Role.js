const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  permissions: { type: [String], default: [] }, // e.g., ['READ', 'WRITE', 'DELETE']
  customAttributes: { type: Map, of: String }, // Key-value pairs
});

module.exports = mongoose.model('Role', roleSchema);
