const express = require('express');
const { Settings } = require('../models');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    console.error('Erreur récupération settings:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/', auth, isAdmin, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      await settings.update(req.body);
    }
    res.json(settings);
  } catch (error) {
    console.error('Erreur mise à jour settings:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
