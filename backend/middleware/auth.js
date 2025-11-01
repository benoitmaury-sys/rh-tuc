const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authentification requise' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.roles.includes('admin')) {
    return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
  }
  next();
};

const isManager = (req, res, next) => {
  if (!req.user.roles.includes('manager') && !req.user.roles.includes('admin')) {
    return res.status(403).json({ error: 'Accès réservé aux managers' });
  }
  next();
};

module.exports = { auth, isAdmin, isManager };
