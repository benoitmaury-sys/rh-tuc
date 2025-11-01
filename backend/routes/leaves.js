const express = require('express');
const { Leave, User } = require('../models');
const { auth, isManager } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { type, startDate, endDate, reason } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const leave = await Leave.create({
      userId: req.user.id, type, startDate: new Date(startDate),
      endDate: new Date(endDate), reason, status: 'pending', daysCount: days
    });
    res.status(201).json(leave);
  } catch (error) {
    console.error('Erreur création congé:', error);
    res.status(500).json({ error: 'Erreur lors de la création du congé' });
  }
});

router.get('/my-leaves', auth, async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/', auth, isManager, async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email', 'photo'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/manager/:managerId', auth, async (req, res) => {
  try {
    const collaborators = await User.findAll({ where: { managerId: req.params.managerId }, attributes: ['id'] });
    const collaboratorIds = collaborators.map(c => c.id);
    const leaves = await Leave.findAll({
      where: { userId: collaboratorIds },
      include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email', 'photo'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/:id/status', auth, isManager, async (req, res) => {
  try {
    const { status, managerComment } = req.body;
    const leave = await Leave.findByPk(req.params.id);
    if (!leave) return res.status(404).json({ error: 'Congé non trouvé' });
    leave.status = status;
    if (managerComment) leave.managerComment = managerComment;
    await leave.save();
    if (status === 'approved') {
      const user = await User.findByPk(leave.userId);
      if (leave.type === 'Congés payés') user.congesRestants -= leave.daysCount;
      else if (leave.type === 'RTT') user.rttRestants -= leave.daysCount;
      await user.save();
    }
    res.json(leave);
  } catch (error) {
    console.error('Erreur mise à jour congé:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);
    if (!leave) return res.status(404).json({ error: 'Congé non trouvé' });
    if (leave.userId !== req.user.id && !req.user.roles.includes('admin')) {
      return res.status(403).json({ error: 'Non autorisé' });
    }
    await leave.destroy();
    res.json({ message: 'Congé supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
