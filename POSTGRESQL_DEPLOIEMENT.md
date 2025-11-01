# 📘 Guide de Déploiement avec PostgreSQL - RH TUC v2.0

## 🎯 Important : Utilisation de PostgreSQL

Cette version utilise **PostgreSQL** au lieu de MongoDB. Railway fournit PostgreSQL gratuitement et automatiquement.

## 🚀 Étape 1 : Publier sur GitHub

```bash
git init
git add .
git commit -m "Initial commit - RH TUC v2.0 avec PostgreSQL"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/rh-tuc.git
git push -u origin main
```

## 🔧 Étape 2 : Déployer le Backend sur Railway (PostgreSQL)

### 2.1 Créer le projet Railway

1. Allez sur https://railway.app
2. Login avec GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Sélectionnez `rh-tuc`

### 2.2 Configurer le service Backend

1. **Settings** → Root Directory: `backend`
2. **Start Command** : `npm start`

### 2.3 Ajouter PostgreSQL

1. Cliquez sur "+ New" dans votre projet
2. Sélectionnez "Database"
3. Choisissez "Add PostgreSQL"
4. Railway créera automatiquement la base de données

⚠️ **IMPORTANT** : Railway ajoutera automatiquement la variable `DATABASE_URL` à votre service backend !

### 2.4 Configurer les Variables d'Environnement

Dans Railway → Variables → Raw Editor, ajoutez :

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=<générez-un-secret-sécurisé>
NODE_ENV=production
FRONTEND_URL=https://votre-site.netlify.app
```

💡 **Générer un JWT_SECRET sécurisé** :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.5 Générer le domaine et tester

1. Settings → "Generate Domain"
2. Notez l'URL (ex: `https://rh-tuc-production.up.railway.app`)
3. Testez :

```bash
curl https://VOTRE-URL.up.railway.app/health
```

Devrait retourner : `{"status":"ok","message":"RH TUC API is running with PostgreSQL"}`

✅ **Backend PostgreSQL déployé !**

## 🎨 Étape 3 : Déployer le Frontend sur Netlify

### 3.1 Configurer l'URL de l'API

Éditez `frontend/config.js` :

```javascript
const API_CONFIG = {
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://VOTRE-URL-RAILWAY.up.railway.app/api', // ⬅️ Changez ici !
  timeout: 10000
};
```

**Commit et push** :

```bash
git add frontend/config.js
git commit -m "Configure production API URL"
git push
```

### 3.2 Déployer sur Netlify

1. https://app.netlify.com
2. "Add new site" → "Import an existing project"
3. GitHub → Sélectionnez `rh-tuc`
4. Configuration :
   - **Base directory** : `frontend`
   - **Build command** : (laisser vide)
   - **Publish directory** : `.`
5. "Deploy site"

### 3.3 (Optionnel) Personnaliser le nom

1. Site settings → "Change site name"
2. Ex: `rh-tuc` → URL: `https://rh-tuc.netlify.app`

## 🔄 Étape 4 : Finaliser

### 4.1 Mettre à jour FRONTEND_URL dans Railway

1. Retournez sur Railway
2. Variables → `FRONTEND_URL` → Mettez votre URL Netlify
3. Railway redéploiera automatiquement

### 4.2 Tester l'application

Ouvrez votre URL Netlify :
- ✅ Page de connexion s'affiche
- ✅ Créez un compte
- ✅ Testez une demande de congé
- ✅ Testez upload de document

## 👤 Étape 5 : Créer le Premier Admin

### Via Railway PostgreSQL Console

1. Railway → PostgreSQL → Data
2. Table `users` → Trouvez votre utilisateur
3. Modifiez le champ `roles` :
   - Changez `["collaborateur"]` en `["admin","manager","collaborateur"]`

### Via psql (alternatif)

```bash
# Récupérez DATABASE_URL depuis Railway
psql "votre-database-url"

# SQL
UPDATE users 
SET roles = ARRAY['admin', 'manager', 'collaborateur']::varchar[] 
WHERE email = 'votre-email@example.com';
```

## ✅ CHECKLIST FINALE

- [ ] Backend déployé sur Railway
- [ ] PostgreSQL connecté et fonctionnel
- [ ] Frontend déployé sur Netlify
- [ ] API URL configurée dans config.js
- [ ] FRONTEND_URL configurée dans Railway
- [ ] Application accessible et fonctionnelle
- [ ] Compte admin créé
- [ ] Logo s'affiche correctement

## 🎉 FÉLICITATIONS !

Votre application RH TUC v2.0 avec PostgreSQL est en production !

### 📊 Avantages de PostgreSQL

- ✅ **Gratuit** sur Railway
- ✅ **Relationnel** - Meilleur pour les données structurées
- ✅ **JSONB** - Flexibilité pour documents, requests, reminders
- ✅ **Performance** - Excellent pour les requêtes complexes
- ✅ **Backup automatique** sur Railway

## 🔍 Vérifier PostgreSQL

### Logs

Railway → PostgreSQL → Deployments → View Logs

### Connexion directe

Railway → PostgreSQL → Connect → Utiliser la DATABASE_URL avec psql ou pgAdmin

### Tables créées automatiquement

- `users` - Utilisateurs avec champs JSONB pour documents
- `leaves` - Demandes de congés  
- `settings` - Configuration globale

## 🆘 Dépannage PostgreSQL

### Erreur: "relation does not exist"

**Solution** : Les tables seront créées automatiquement au premier démarrage grâce à Sequelize `sync()`.

### Erreur de connexion SSL

**Solution** : Vérifiez que `dialectOptions.ssl` est configuré dans `config/database.js`.

### Variables d'environnement

Vérifiez dans Railway que `DATABASE_URL` est bien présente et commence par `postgresql://`.

---

**Tout est prêt ! 🚀**
