const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Settings = sequelize.define('Settings', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  leaveTypes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ['Congés payés', 'RTT', 'Maladie', 'Télétravail', 'Congé sans solde', 'Autre']
  },
  documentTypes: {
    type: DataTypes.JSONB,
    defaultValue: [
      { name: "Carte d'identité", required: true, requiredForRoles: ['collaborateur'] },
      { name: 'Passeport', required: false, requiredForRoles: [] },
      { name: 'Permis de conduire', required: false, requiredForRoles: [] },
      { name: 'Carte vitale', required: true, requiredForRoles: ['collaborateur'] },
      { name: 'RIB', required: true, requiredForRoles: ['collaborateur'] },
      { name: 'Attestation de sécurité sociale', required: true, requiredForRoles: ['collaborateur'] },
      { name: 'Justificatif de domicile', required: true, requiredForRoles: ['collaborateur'] },
      { name: 'Diplômes', required: false, requiredForRoles: [] },
      { name: 'Certificat de travail', required: false, requiredForRoles: [] }
    ]
  },
  maxLeaveDays: {
    type: DataTypes.INTEGER,
    defaultValue: 25
  },
  maxRTTDays: {
    type: DataTypes.INTEGER,
    defaultValue: 12
  }
}, {
  tableName: 'settings',
  timestamps: true
});

module.exports = Settings;
