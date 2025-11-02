# RH TUC - Frontend

Interface web pour l'application de gestion RH du Toulouse Université Club.

## Configuration

1. Modifier `config.js` pour pointer vers votre API Railway :
```javascript
baseURL: 'https://votre-app-backend.up.railway.app/api'
```

## Déploiement sur Netlify

### Via GitHub

1. Pusher votre code sur GitHub
2. Se connecter à Netlify
3. Cliquer sur "New site from Git"
4. Sélectionner votre repository
5. Configurer :
   - **Build command** : (laisser vide)
   - **Publish directory** : `frontend`
6. Déployer

### Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
cd frontend
netlify deploy --prod
```

## Structure

- `index.html` - Application principale
- `config.js` - Configuration de l'API
- `api.js` - Client API pour communiquer avec le backend
- `netlify.toml` - Configuration Netlify

## Fonctionnalités

- ✅ Gestion des congés
- ✅ Gestion des documents
- ✅ Validation hiérarchique
- ✅ Dashboard collaborateur
- ✅ Espace manager
- ✅ Panneau admin
- ✅ Mode sombre
- ✅ Responsive mobile
