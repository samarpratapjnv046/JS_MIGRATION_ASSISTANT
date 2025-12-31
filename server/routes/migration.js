const express = require('express');
const router = express.Router();
const { migrateCode } = require('../services/aiService');
const Migration = require('../models/Migration');

router.post('/migrate', async (req, res) => {
  try {
    const { code } = req.body;
    const migratedCode = await migrateCode(code);

    const migration = new Migration({
      originalCode: code,
      migratedCode,
      timestamp: new Date(),
    });

    await migration.save();

    res.json({ migratedCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const migrations = await Migration.find().sort({ timestamp: -1 });
    res.json(migrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
