const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, syncDatabase } = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connecté à PostgreSQL');
    return syncDatabase();
  })
  .catch(err => console.error('❌ Erreur PostgreSQL:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/leaves', require('./routes/leaves'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/settings', require('./routes/settings'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'RH TUC API is running with PostgreSQL' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Erreur serveur interne'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
