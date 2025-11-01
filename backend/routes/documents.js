const express = require('express');
const { User } = require('../models');
const { auth, isManager } = require('../middleware/auth');
const router = express.Router();

router.post('/upload', auth, async (req, res) => {
  try {
    const { name, type, fileData } = req.body;
    const document = {
      id: Date.now().toString(), name, type, uploadDate: new Date(),
      fileData, validationStatus: 'pending', userPhoto: req.user.photo
    };
    const documents = req.user.documents || [];
    documents.push(document);
    await req.user.update({ documents });
    res.status(201).json(document);
  } catch (error) {
    console.error('Erreur upload document:', error);
    res.status(500).json({ error: 'Erreur lors de l\'upload' });
  }
});

router.get('/my-documents', auth, async (req, res) => {
  try {
    res.json(req.user.documents || []);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/:userId/documents/:documentId/validate', auth, isManager, async (req, res) => {
  try {
    const { userId, documentId } = req.params;
    const { validationStatus, rejectionReason } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    const documents = user.documents || [];
    const document = documents.find(d => d.id === documentId);
    if (!document) return res.status(404).json({ error: 'Document non trouvé' });
    document.validationStatus = validationStatus;
    if (rejectionReason) document.rejectionReason = rejectionReason;
    await user.update({ documents });
    res.json(document);
  } catch (error) {
    console.error('Erreur validation document:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/request', auth, isManager, async (req, res) => {
  try {
    const { userId, documentType, reason } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    const request = {
      id: Date.now(), documentType, requestDate: new Date(),
      reason, status: 'pending'
    };
    const documentRequests = user.documentRequests || [];
    documentRequests.push(request);
    await user.update({ documentRequests });
    res.status(201).json(request);
  } catch (error) {
    console.error('Erreur demande document:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/:documentId', auth, async (req, res) => {
  try {
    const { documentId } = req.params;
    const documents = (req.user.documents || []).filter(d => d.id !== documentId);
    await req.user.update({ documents });
    res.json({ message: 'Document supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
