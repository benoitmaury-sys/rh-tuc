# 📁 Structure Complète du Projet RH TUC

## 🌳 Arborescence

```
rh-tuc/
│
├── 📂 backend/                          # API Node.js + Express
│   ├── 📂 models/                       # Modèles MongoDB (Mongoose)
│   │   ├── User.js                      # Modèle utilisateur
│   │   ├── Leave.js                     # Modèle congés
│   │   └── Settings.js                  # Modèle paramètres
│   │
│   ├── 📂 routes/                       # Routes API REST
│   │   ├── auth.js                      # Routes authentification
│   │   ├── users.js                     # Routes utilisateurs
│   │   ├── leaves.js                    # Routes congés
│   │   ├── documents.js                 # Routes documents
│   │   └── settings.js                  # Routes paramètres
│   │
│   ├── 📂 middleware/                   # Middlewares Express
│   │   └── auth.js                      # Middleware authentification JWT
│   │
│   ├── server.js                        # Point d'entrée serveur
│   ├── package.json                     # Dépendances Node.js
│   ├── .env.example                     # Exemple variables d'env
│   ├── .gitignore                       # Fichiers à ignorer
│   ├── railway.json                     # Configuration Railway
│   └── README.md                        # Documentation backend
│
├── 📂 frontend/                         # Interface Web
│   ├── index.html                       # Application principale SPA
│   ├── config.js                        # Configuration API
│   ├── api.js                           # Client API REST
│   ├── netlify.toml                     # Configuration Netlify
│   ├── .gitignore                       # Fichiers à ignorer
│   └── README.md                        # Documentation frontend
│
├── .gitignore                           # Gitignore global
├── README.md                            # Documentation principale
├── DEPLOIEMENT.md                       # Guide de déploiement
└── STRUCTURE.md                         # Ce fichier
```

## 📝 Description des Fichiers

### Backend

#### `server.js`
- Point d'entrée de l'API
- Configuration Express, CORS, MongoDB
- Montage des routes
- Gestion des erreurs globales

#### `models/User.js`
- Schéma utilisateur avec Mongoose
- Hash des mots de passe (bcryptjs)
- Méthode de comparaison de mot de passe
- Sous-schémas : documents, documentRequests, reminders

#### `models/Leave.js`
- Schéma des demandes de congés
- Référence vers User (userId)
- Statuts : pending, approved, rejected
- Calcul automatique du nombre de jours

#### `models/Settings.js`
- Configuration globale de l'application
- Types de congés personnalisables
- Types de documents requis
- Limites de jours de congés/RTT

#### `routes/auth.js`
- POST `/api/auth/register` - Inscription
- POST `/api/auth/login` - Connexion
- GET `/api/auth/me` - Utilisateur connecté

#### `routes/users.js`
- GET `/api/users` - Liste utilisateurs (admin)
- GET `/api/users/:id` - Détails utilisateur
- PUT `/api/users/:id` - Modifier utilisateur
- DELETE `/api/users/:id` - Supprimer (admin)
- GET `/api/users/manager/:id/collaborators` - Collaborateurs

#### `routes/leaves.js`
- POST `/api/leaves` - Créer demande
- GET `/api/leaves/my-leaves` - Mes congés
- GET `/api/leaves` - Tous les congés (manager)
- PUT `/api/leaves/:id/status` - Valider/Rejeter
- DELETE `/api/leaves/:id` - Supprimer

#### `routes/documents.js`
- POST `/api/documents/upload` - Upload document
- GET `/api/documents/my-documents` - Mes documents
- PUT `/api/documents/:userId/documents/:docId/validate` - Valider
- POST `/api/documents/request` - Demander document (manager)
- DELETE `/api/documents/:id` - Supprimer

#### `routes/settings.js`
- GET `/api/settings` - Récupérer paramètres
- PUT `/api/settings` - Modifier (admin)

#### `middleware/auth.js`
- Middleware d'authentification JWT
- Vérification du token
- Middlewares de rôles (isAdmin, isManager)

### Frontend

#### `index.html`
- Application Single Page (SPA)
- Interface complète avec TailwindCSS
- Gestion des vues (login, dashboard, profile, etc.)
- Mode sombre/clair
- Responsive mobile

#### `config.js`
- Configuration de l'URL de l'API
- Timeout des requêtes
- Différenciation localhost/production

#### `api.js`
- Client API pour communiquer avec le backend
- Méthodes pour tous les endpoints
- Gestion des tokens JWT
- Gestion des erreurs

#### `netlify.toml`
- Configuration du déploiement Netlify
- Redirections SPA
- Variables d'environnement de build

## 🔧 Technologies Utilisées

### Backend
| Technologie | Version | Usage |
|------------|---------|-------|
| Node.js | ≥18.0.0 | Runtime JavaScript |
| Express | ^4.18.2 | Framework web |
| MongoDB | - | Base de données NoSQL |
| Mongoose | ^8.0.3 | ODM MongoDB |
| bcryptjs | ^2.4.3 | Hash de mots de passe |
| jsonwebtoken | ^9.0.2 | Authentification JWT |
| cors | ^2.8.5 | Cross-Origin Resource Sharing |
| dotenv | ^16.3.1 | Variables d'environnement |
| express-validator | ^7.0.1 | Validation des données |

### Frontend
| Technologie | Version | Usage |
|------------|---------|-------|
| HTML5 | - | Structure |
| CSS3 | - | Style |
| JavaScript (ES6+) | - | Logique |
| TailwindCSS | CDN | Framework CSS |

## 📊 Modèles de Données

### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashé),
  firstName: String,
  lastName: String,
  roles: ['collaborateur', 'manager', 'admin'],
  photo: String (base64),
  phone: String,
  address: String,
  joinDate: Date,
  managerId: ObjectId (ref User),
  congesRestants: Number,
  rttRestants: Number,
  anciennete: Number,
  documents: [Document],
  documentRequests: [DocumentRequest],
  reminders: [Reminder],
  createdAt: Date,
  updatedAt: Date
}
```

### Leave
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref User),
  type: String (enum),
  startDate: Date,
  endDate: Date,
  reason: String,
  status: String (pending/approved/rejected),
  managerComment: String,
  daysCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Settings
```javascript
{
  _id: ObjectId,
  leaveTypes: [String],
  documentTypes: [{
    name: String,
    required: Boolean,
    requiredForRoles: [String]
  }],
  maxLeaveDays: Number,
  maxRTTDays: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Sécurité

### Authentification
- JWT (JSON Web Tokens)
- Tokens stockés dans localStorage
- Expiration : 7 jours
- Header Authorization: Bearer {token}

### Mots de Passe
- Hash bcrypt (salt rounds: 10)
- Jamais stockés en clair
- Validation : min 6 caractères

### Autorisations
- Middleware de vérification de rôle
- Routes protégées par authentification
- Vérification owner/admin pour modifications

### CORS
- Configuration stricte
- Whitelist du frontend
- Credentials autorisés

## 🚀 Déploiement

### Railway (Backend)
- Build automatique depuis GitHub
- Variables d'environnement sécurisées
- MongoDB managé inclus
- HTTPS automatique
- Scaling automatique

### Netlify (Frontend)
- Déploiement depuis GitHub
- Build automatique
- CDN global
- HTTPS automatique
- Redirections SPA

## 📈 Performance

### Backend
- Indexation MongoDB (email unique)
- Populate sélectif (pas de surcharge)
- Limite de taille des requêtes (10MB)
- Connection pooling MongoDB

### Frontend
- Assets minifiés
- Chargement asynchrone
- localStorage pour cache
- Lazy loading des images
- CSS inline (pas de fichier externe)

## 🔄 Workflow de Développement

```
1. Développement local
   ↓
2. Commit sur branche feature
   ↓
3. Push sur GitHub
   ↓
4. Merge vers main
   ↓
5. Déploiement automatique Railway + Netlify
   ↓
6. Tests en production
```

## 📞 Support

- **Documentation** : README.md, DEPLOIEMENT.md
- **Issues** : GitHub Issues
- **Logs** : Railway + Netlify dashboards
