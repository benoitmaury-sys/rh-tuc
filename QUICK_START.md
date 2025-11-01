# 🚀 Quick Start - RH TUC

Guide rapide pour démarrer avec l'application RH TUC.

## ⚡ En 5 minutes

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/rh-tuc.git
cd rh-tuc
```

### 2. Déployer le Backend (Railway)

1. Aller sur [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Sélectionner `rh-tuc`
4. Settings → Root Directory: `backend`
5. "+ New" → Database → MongoDB
6. Variables → Ajouter :
   ```
   JWT_SECRET=votre_secret_ici
   NODE_ENV=production
   FRONTEND_URL=https://votre-site.netlify.app
   ```
7. Generate Domain → Noter l'URL

### 3. Déployer le Frontend (Netlify)

1. Modifier `frontend/config.js` avec l'URL Railway
2. Commit et push :
   ```bash
   git add .
   git commit -m "Configure API URL"
   git push
   ```
3. Aller sur [netlify.com](https://netlify.com)
4. "Add new site" → GitHub → `rh-tuc`
5. Base directory: `frontend`
6. Deploy!

### 4. Finaliser

1. Copier l'URL Netlify
2. Railway → Variables → `FRONTEND_URL` = URL Netlify
3. Créer un compte admin
4. ✅ C'est prêt !

## 📖 Documentation Complète

- **Installation détaillée** : [DEPLOIEMENT.md](DEPLOIEMENT.md)
- **Architecture** : [STRUCTURE.md](STRUCTURE.md)
- **Utilisation** : [README.md](README.md)

## 🆘 Besoin d'aide ?

Consultez [DEPLOIEMENT.md](DEPLOIEMENT.md) section "Dépannage"
