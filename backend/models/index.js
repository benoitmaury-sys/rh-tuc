const sequelize = require('../config/database');
const User = require('./User');
const Leave = require('./Leave');
const Settings = require('./Settings');

// Relations
User.belongsTo(User, { as: 'manager', foreignKey: 'managerId' });
User.hasMany(User, { as: 'collaborators', foreignKey: 'managerId' });
Leave.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Leave, { foreignKey: 'userId', as: 'leaves' });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Base de données synchronisée');
    
    const settingsCount = await Settings.count();
    if (settingsCount === 0) {
      await Settings.create({});
      console.log('✅ Paramètres par défaut créés');
    }
  } catch (error) {
    console.error('❌ Erreur de synchronisation:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Leave,
  Settings,
  syncDatabase
};
