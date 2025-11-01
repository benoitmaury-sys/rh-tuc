const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ['collaborateur']
  },
  photo: {
    type: DataTypes.TEXT
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  joinDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  managerId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  congesRestants: {
    type: DataTypes.INTEGER,
    defaultValue: 25
  },
  rttRestants: {
    type: DataTypes.INTEGER,
    defaultValue: 12
  },
  anciennete: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  documents: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  documentRequests: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  reminders: {
    type: DataTypes.JSONB,
    defaultValue: []
  }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

User.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
