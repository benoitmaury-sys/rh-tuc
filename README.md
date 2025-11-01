# 🏢 RH TUC - Application de Gestion RH

Application complète de gestion des ressources humaines pour le Toulouse Université Club.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Fonctionnalités

### 👤 Espace Collaborateur
- ✅ Demande de congés (Congés payés, RTT, Maladie, Télétravail)
- ✅ Suivi des demandes en temps réel
- ✅ Gestion des documents (upload, validation)
- ✅ Rappels automatiques pour documents manquants
- ✅ Historique complet des congés
- ✅ Dashboard personnalisé

### 👔 Espace Manager
- ✅ Validation des demandes de congés
- ✅ Validation des documents
- ✅ Demande de documents aux collaborateurs
- ✅ Vue d'ensemble de l'équipe
- ✅ Statistiques et rapports

### ⚙️ Espace Admin
- ✅ Gestion complète des utilisateurs
- ✅ Configuration des types de congés
- ✅ Configuration des types de documents
- ✅ Gestion des rôles et permissions
- ✅ Vue globale de l'organisation

### 🎨 Interface
- ✅ Design moderne et épuré
- ✅ Mode sombre / clair
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Animations fluides
- ✅ Notifications en temps réel

## 🏗️ Architecture

### Backend
- **Node.js** + **Express**
- **MongoDB** (base de données)
- **JWT** (authentification)
- **bcryptjs** (sécurité des mots de passe)

### Frontend
- **HTML5** / **CSS3** / **JavaScript**
- **TailwindCSS** (framework CSS)
- **API REST** (communication avec le backend)

## 📦 Structure du Projet

```
rh-tuc/
├── backend/              # API Node.js
│   ├── models/          # Modèles MongoDB
│   ├── routes/          # Routes API
│   ├── middleware/      # Middlewares (auth, etc.)
│   ├── server.js        # Point d'entrée
│   ├── package.json
│   └── README.md
│
├── frontend/            # Interface web
│   ├── index.html       # Application principale
│   ├── config.js        # Configuration API
│   ├── api.js           # Client API
│   ├── netlify.toml     # Config Netlify
│   └── README.md
│
└── README.md            # Ce fichier
```

## 🚀 Installation & Déploiement

### 1. Backend sur Railway

#### Créer le projet Railway

1. Aller sur [railway.app](https://railway.app)
2. Se connecter avec GitHub
3. Créer un nouveau projet
4. Cliquer sur "Deploy from GitHub repo"
5. Sélectionner votre repository

#### Ajouter MongoDB

1. Dans votre projet Railway, cliquer sur "+ New"
2. Sélectionner "Database" → "Add MongoDB"
3. Railway créera automatiquement la base de données

#### Configurer les variables d'environnement

Dans Railway, ajouter ces variables :

```env
MONGODB_URI=<url_fournie_par_railway>
JWT_SECRET=votre_secret_jwt_super_securise
NODE_ENV=production
FRONTEND_URL=https://votre-app.netlify.app
```

#### Configuration du déploiement

Railway détectera automatiquement que c'est une app Node.js.

**Settings à vérifier :**
- **Root Directory** : `backend`
- **Start Command** : `npm start`

Le déploiement se fera automatiquement à chaque push sur GitHub !

### 2. Frontend sur Netlify

#### Méthode 1 : Via l'interface Netlify

1. Aller sur [netlify.com](https://netlify.com)
2. Se connecter avec GitHub
3. Cliquer sur "Add new site" → "Import an existing project"
4. Sélectionner votre repository GitHub
5. Configurer :
   - **Base directory** : `frontend`
   - **Build command** : (laisser vide)
   - **Publish directory** : `.`
6. Cliquer sur "Deploy site"

#### Méthode 2 : Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
cd frontend
netlify deploy --prod --dir=.
```

#### Configurer l'URL de l'API

1. Une fois le backend déployé sur Railway, copier l'URL
2. Modifier `frontend/config.js` :

```javascript
const API_CONFIG = {
  baseURL: 'https://votre-app-backend.up.railway.app/api',
  timeout: 10000
};
```

3. Commit et push les modifications
4. Netlify redéploiera automatiquement

### 3. Connexion Backend ↔ Frontend

**Important :** Vérifier que les URLs sont correctement configurées :

✅ Dans Railway (backend) :
- `FRONTEND_URL` = URL Netlify (ex: `https://rh-tuc.netlify.app`)

✅ Dans Netlify (frontend) :
- `config.js` → `baseURL` = URL Railway (ex: `https://rh-tuc-api.up.railway.app/api`)

## 🧪 Test en Local

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Éditer .env avec vos configurations
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

### Frontend

```bash
cd frontend
# Ouvrir index.html dans un navigateur
# Ou utiliser un serveur local :
npx http-server -p 8080
```

L'application est accessible sur `http://localhost:8080`

## 👥 Comptes par Défaut

Après le premier déploiement, créer un compte admin via l'interface d'inscription puis modifier directement dans MongoDB pour ajouter le rôle `admin`.

Ou créer via MongoDB directement :

```javascript
{
  email: "admin@tuc.fr",
  password: "$2a$10$...", // hashé avec bcrypt
  firstName: "Admin",
  lastName: "TUC",
  roles: ["admin", "manager", "collaborateur"]
}
```

## 🔧 Configuration Avancée

### Personnalisation

- **Logo** : Modifier le SVG dans `frontend/index.html` (ligne ~676, 820, 869)
- **Couleurs** : Modifier les classes Tailwind dans `index.html`
- **Types de congés** : Via l'interface admin ou dans `backend/models/Settings.js`
- **Documents requis** : Via l'interface admin ou dans `backend/models/Settings.js`

### Sécurité

- ✅ Mots de passe hashés (bcryptjs)
- ✅ Tokens JWT sécurisés
- ✅ CORS configuré
- ✅ Validation des entrées
- ✅ Protection contre les injections

## 📝 API Endpoints

Voir la documentation complète dans `backend/README.md`

## 🐛 Dépannage

### Le frontend ne se connecte pas au backend

1. Vérifier que l'URL dans `config.js` est correcte
2. Vérifier les CORS dans Railway (variable `FRONTEND_URL`)
3. Vérifier les logs Railway pour les erreurs

### Erreur MongoDB

1. Vérifier que MongoDB est bien démarré dans Railway
2. Vérifier la variable `MONGODB_URI`
3. Consulter les logs Railway

### Déploiement échoue

1. Vérifier que `package.json` est présent
2. Vérifier les logs de déploiement
3. Vérifier les versions Node.js compatibles

## 📄 Licence

MIT License - Voir le fichier LICENSE

## 🙏 Support

Pour toute question ou problème, créer une issue sur GitHub.

---

**Fait avec ❤️ pour le Toulouse Université Club**
