const mongoose = require('mongoose');

const migrationSchema = new mongoose.Schema({
  originalCode: {
    type: String,
    required: true,
  },
  migratedCode: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Migration', migrationSchema);
