# RH TUC - Backend API (PostgreSQL)

API REST pour l'application de gestion RH du Toulouse Université Club avec PostgreSQL.

## Installation

```bash
npm install
```

## Configuration

Créer un fichier `.env` :

```env
DATABASE_URL=postgresql://user:password@localhost:5432/rh_tuc
JWT_SECRET=votre_secret_jwt_super_securise
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
PORT=3000
```

## Démarrage

### Développement
```bash
npm run dev
```

### Production
```bash
npm start
```

## Déploiement sur Railway

1. Créer un nouveau projet Railway
2. Connecter le repository GitHub
3. Ajouter une base de données PostgreSQL
4. Configurer les variables d'environnement :
   - `DATABASE_URL` : Fourni automatiquement par Railway PostgreSQL
   - `JWT_SECRET` : Générer un secret sécurisé
   - `NODE_ENV` : production
   - `FRONTEND_URL` : URL Netlify

Railway détectera automatiquement Node.js et PostgreSQL.

## Technologies

- **Node.js 18+**
- **Express 4.18**
- **PostgreSQL** (via Sequelize 6.35)
- **JWT** pour l'authentification
- **bcryptjs** pour le hashing

## Base de Données

Sequelize créera automatiquement les tables au démarrage :
- `users` - Utilisateurs
- `leaves` - Congés
- `settings` - Paramètres globaux

Les champs JSONB sont utilisés pour :
- Documents utilisateur
- Demandes de documents
- Rappels
- Types de documents dans settings
