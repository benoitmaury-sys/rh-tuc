# 📘 Guide de Déploiement Complet - RH TUC

Ce guide vous accompagne étape par étape pour déployer l'application RH TUC en production.

## 🎯 Vue d'ensemble

- **Backend** : Railway (avec MongoDB)
- **Frontend** : Netlify
- **Repository** : GitHub

## 📋 Prérequis

- [ ] Compte GitHub
- [ ] Compte Railway ([railway.app](https://railway.app))
- [ ] Compte Netlify ([netlify.com](https://netlify.com))
- [ ] Git installé localement

## 🚀 Étape 1 : Préparer le Repository GitHub

### 1.1 Créer le repository

```bash
# Initialiser git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - RH TUC v2.0"

# Créer le repository sur GitHub (via l'interface web)
# Puis ajouter le remote
git remote add origin https://github.com/votre-username/rh-tuc.git

# Pousser le code
git push -u origin main
```

### 1.2 Vérifier la structure

Votre repository doit contenir :
```
rh-tuc/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── index.html
│   ├── config.js
│   ├── api.js
│   └── netlify.toml
└── README.md
```

## 🔧 Étape 2 : Déployer le Backend sur Railway

### 2.1 Créer le projet Railway

1. Aller sur [railway.app](https://railway.app)
2. Cliquer sur **"Login"** → Se connecter avec GitHub
3. Cliquer sur **"New Project"**
4. Sélectionner **"Deploy from GitHub repo"**
5. Autoriser Railway à accéder à vos repositories
6. Sélectionner le repository **rh-tuc**

### 2.2 Configurer le service Backend

1. Railway va détecter automatiquement Node.js
2. Aller dans **Settings** du service
3. Configurer :
   - **Root Directory** : `backend`
   - **Start Command** : `npm start`
   - **Watch Paths** : `backend/**`

### 2.3 Ajouter MongoDB

1. Dans votre projet Railway, cliquer sur **"+ New"**
2. Sélectionner **"Database"**
3. Choisir **"Add MongoDB"**
4. Railway créera automatiquement la base de données
5. Noter l'URL de connexion (elle sera dans les variables d'environnement)

### 2.4 Configurer les Variables d'Environnement

1. Aller dans l'onglet **"Variables"** de votre service backend
2. Ajouter ces variables :

```env
MONGODB_URI=${{MongoDB.MONGO_URL}}
JWT_SECRET=RH_TUC_SECRET_2024_CHANGE_ME_SUPER_SECURE
NODE_ENV=production
FRONTEND_URL=https://rh-tuc.netlify.app
PORT=3000
```

**💡 Astuce** :
- `${{MongoDB.MONGO_URL}}` sera automatiquement remplacé par Railway
- Générer un JWT_SECRET sécurisé : `openssl rand -base64 32`

### 2.5 Déployer

1. Railway déploiera automatiquement
2. Attendre que le déploiement soit terminé (🟢 vert)
3. Cliquer sur **"Settings"** → **"Generate Domain"**
4. Noter l'URL générée (ex: `https://rh-tuc-production.up.railway.app`)

### 2.6 Tester le Backend

```bash
# Tester la route de santé
curl https://votre-url.up.railway.app/health
# Devrait retourner : {"status":"ok","message":"RH TUC API is running"}
```

## 🎨 Étape 3 : Déployer le Frontend sur Netlify

### 3.1 Configurer l'URL de l'API

1. Modifier `frontend/config.js` :

```javascript
const API_CONFIG = {
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://VOTRE-URL-RAILWAY.up.railway.app/api', // ⬅️ Remplacer ici
  timeout: 10000
};
```

2. Commit et push :

```bash
git add frontend/config.js
git commit -m "Configure production API URL"
git push
```

### 3.2 Déployer sur Netlify (Méthode Interface)

1. Aller sur [netlify.com](https://netlify.com)
2. Cliquer sur **"Add new site"** → **"Import an existing project"**
3. Choisir **"GitHub"** et autoriser Netlify
4. Sélectionner le repository **rh-tuc**
5. Configurer :
   - **Branch to deploy** : `main`
   - **Base directory** : `frontend`
   - **Build command** : *(laisser vide)*
   - **Publish directory** : `.`
6. Cliquer sur **"Deploy site"**

### 3.3 Configurer le nom de domaine (Optionnel)

1. Dans Netlify, aller dans **"Site settings"**
2. Cliquer sur **"Change site name"**
3. Choisir un nom (ex: `rh-tuc`)
4. L'URL sera : `https://rh-tuc.netlify.app`

### 3.4 Mettre à jour la variable FRONTEND_URL dans Railway

1. Retourner sur Railway
2. Aller dans **"Variables"** du service backend
3. Modifier `FRONTEND_URL` avec l'URL Netlify :

```env
FRONTEND_URL=https://rh-tuc.netlify.app
```

4. Railway redéploiera automatiquement

## ✅ Étape 4 : Vérification Finale

### 4.1 Checklist Backend ✓

- [ ] Le backend est déployé sur Railway
- [ ] MongoDB est connecté
- [ ] Les variables d'environnement sont configurées
- [ ] L'URL du backend fonctionne : `https://votre-url.up.railway.app/health`
- [ ] Les logs ne montrent pas d'erreur

### 4.2 Checklist Frontend ✓

- [ ] Le frontend est déployé sur Netlify
- [ ] L'URL de l'API dans `config.js` est correcte
- [ ] L'application charge sans erreur
- [ ] Le logo s'affiche correctement

### 4.3 Tester l'Application

1. Aller sur votre URL Netlify
2. Créer un compte (inscription)
3. Se connecter
4. Tester :
   - [ ] Demande de congé
   - [ ] Upload de document
   - [ ] Profil utilisateur
   - [ ] Dashboard

## 🔐 Étape 5 : Créer le Premier Admin

### Méthode 1 : Via MongoDB Atlas/Railway

1. Aller dans Railway → MongoDB → **"Connect"**
2. Utiliser MongoDB Compass ou la CLI
3. Se connecter à la base de données
4. Aller dans la collection `users`
5. Créer un utilisateur :

```javascript
{
  "email": "admin@tuc.fr",
  "password": "$2a$10$example...", // Générer via bcrypt
  "firstName": "Admin",
  "lastName": "TUC",
  "roles": ["admin", "manager", "collaborateur"],
  "congesRestants": 25,
  "rttRestants": 12,
  "documents": [],
  "documentRequests": [],
  "reminders": []
}
```

### Méthode 2 : Modifier un compte existant

1. S'inscrire normalement sur l'application
2. Aller dans MongoDB
3. Modifier le document de l'utilisateur :
   - Ajouter `"admin"` et `"manager"` dans le tableau `roles`

## 🔄 Étape 6 : Déploiement Continu

### 6.1 Configuration

Une fois tout configuré, les déploiements sont automatiques :

- **Push sur GitHub** → Railway redéploie le backend
- **Push sur GitHub** → Netlify redéploie le frontend

### 6.2 Workflow

```bash
# Faire des modifications
git add .
git commit -m "Nouvelle fonctionnalité"
git push

# Railway et Netlify déploient automatiquement ! ✨
```

## 🐛 Dépannage

### Erreur : "Cannot connect to API"

**Solution** :
1. Vérifier que `FRONTEND_URL` dans Railway correspond à l'URL Netlify
2. Vérifier que l'URL API dans `frontend/config.js` est correcte
3. Vérifier les logs Railway pour les erreurs CORS

### Erreur : "MongoServerError: Authentication failed"

**Solution** :
1. Vérifier que `MONGODB_URI` est correcte dans Railway
2. Vérifier que MongoDB est bien démarré
3. Consulter les logs Railway → MongoDB

### Erreur 404 sur Netlify

**Solution** :
1. Vérifier que `netlify.toml` est présent dans le dossier `frontend`
2. Vérifier la configuration "Publish directory" dans Netlify

### Les modifications ne s'affichent pas

**Solution** :
1. Vider le cache du navigateur (Ctrl+Shift+R)
2. Vérifier que le commit a bien été pushé sur GitHub
3. Vérifier les logs de déploiement Netlify/Railway

## 📊 Monitoring

### Railway

- **Logs** : Railway → Service → Deployments → View Logs
- **Métriques** : Railway → Service → Metrics

### Netlify

- **Logs** : Netlify → Site → Deploys → Logs
- **Analytics** : Netlify → Site → Analytics

## 🔒 Sécurité Post-Déploiement

- [ ] Changer le `JWT_SECRET` par une valeur unique
- [ ] Activer HTTPS uniquement
- [ ] Configurer un nom de domaine personnalisé (optionnel)
- [ ] Activer les backups MongoDB
- [ ] Mettre en place des alertes de monitoring

## 🎉 Félicitations !

Votre application RH TUC est maintenant en production ! 🚀

**URLs importantes** :
- Frontend : `https://votre-site.netlify.app`
- Backend : `https://votre-api.up.railway.app`
- GitHub : `https://github.com/votre-username/rh-tuc`

---

**Besoin d'aide ?** Consulter la documentation ou créer une issue sur GitHub.
