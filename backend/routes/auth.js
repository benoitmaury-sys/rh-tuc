const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, firstName, lastName, phone, address, managerId } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }

      const user = await User.create({
        email, password, firstName, lastName, phone, address, managerId,
        roles: ['collaborateur']
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        user: {
          id: user.id, email: user.email, firstName: user.firstName,
          lastName: user.lastName, roles: user.roles
        },
        token
      });
    } catch (error) {
      console.error('Erreur inscription:', error);
      res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
  }
);

router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.json({
        user: {
          id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName,
          roles: user.roles, photo: user.photo, congesRestants: user.congesRestants,
          rttRestants: user.rttRestants, documents: user.documents,
          documentRequests: user.documentRequests, reminders: user.reminders,
          managerId: user.managerId
        },
        token
      });
    } catch (error) {
      console.error('Erreur connexion:', error);
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
  }
);

router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName,
        roles: req.user.roles, photo: req.user.photo, phone: req.user.phone, address: req.user.address,
        congesRestants: req.user.congesRestants, rttRestants: req.user.rttRestants,
        documents: req.user.documents, documentRequests: req.user.documentRequests,
        reminders: req.user.reminders, managerId: req.user.managerId
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
