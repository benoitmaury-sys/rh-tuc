const express = require('express');
const { User } = require('../models');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: User, as: 'manager', attributes: ['id', 'firstName', 'lastName', 'email'] }]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: User, as: 'manager', attributes: ['id', 'firstName', 'lastName', 'email'] }]
    });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id && !req.user.roles.includes('admin')) {
      return res.status(403).json({ error: 'Non autorisé' });
    }
    const updates = req.body;
    delete updates.password;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    await user.update(updates);
    const updatedUser = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    await user.destroy();
    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/manager/:managerId/collaborators', auth, async (req, res) => {
  try {
    const collaborators = await User.findAll({
      where: { managerId: req.params.managerId },
      attributes: { exclude: ['password'] }
    });
    res.json(collaborators);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
