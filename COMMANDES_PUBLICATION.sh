#!/bin/bash

# 🚀 Script de Publication - RH TUC v2.0
# Ce script vous guide pour publier l'application sur GitHub, Railway et Netlify

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         RH TUC - Script de Publication v2.0                 ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction de confirmation
confirm() {
    echo -e "${YELLOW}$1 (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        return 0
    else
        return 1
    fi
}

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}ÉTAPE 1: Initialisation Git${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [ ! -d .git ]; then
    if confirm "Initialiser Git ?"; then
        git init
        echo -e "${GREEN}✓ Git initialisé${NC}"
    fi
else
    echo -e "${GREEN}✓ Git déjà initialisé${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}ÉTAPE 2: Premier Commit${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if confirm "Créer le premier commit ?"; then
    git add .
    git commit -m "Initial commit - RH TUC v2.0 - Application complète de gestion RH"
    echo -e "${GREEN}✓ Commit créé${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}ÉTAPE 3: Configuration du Remote GitHub${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo -e "${YELLOW}Créez d'abord un repository sur GitHub :${NC}"
echo "1. Allez sur https://github.com/new"
echo "2. Nom: rh-tuc"
echo "3. Description: Application de gestion RH pour le TUC"
echo "4. Ne pas initialiser avec README, .gitignore ou license"
echo ""

if confirm "Repository GitHub créé ?"; then
    echo -e "${YELLOW}Entrez votre nom d'utilisateur GitHub:${NC}"
    read -r github_username
    
    git branch -M main
    git remote add origin "https://github.com/$github_username/rh-tuc.git"
    
    if confirm "Pousser sur GitHub ?"; then
        git push -u origin main
        echo -e "${GREEN}✓ Code publié sur GitHub${NC}"
        echo -e "${GREEN}✓ URL: https://github.com/$github_username/rh-tuc${NC}"
    fi
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}ÉTAPE 4: Déploiement Backend sur Railway${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo ""
echo -e "${YELLOW}Instructions Railway:${NC}"
echo "1. Allez sur https://railway.app"
echo "2. Login avec GitHub"
echo "3. New Project → Deploy from GitHub repo"
echo "4. Sélectionnez 'rh-tuc'"
echo "5. Settings → Root Directory: 'backend'"
echo "6. + New → Database → Add MongoDB"
echo "7. Variables → Ajoutez:"
echo "   - JWT_SECRET=<générez un secret sécurisé>"
echo "   - NODE_ENV=production"
echo "   - FRONTEND_URL=https://votre-site.netlify.app (à mettre à jour)"
echo "8. Settings → Generate Domain"
echo ""

if confirm "Backend déployé sur Railway ?"; then
    echo -e "${YELLOW}Entrez l'URL de votre backend Railway:${NC}"
    echo "Exemple: https://rh-tuc-production.up.railway.app"
    read -r railway_url
    
    # Mettre à jour frontend/config.js
    sed -i "s|https://votre-app-backend.up.railway.app|$railway_url|g" frontend/config.js
    
    echo -e "${GREEN}✓ URL Backend configurée: $railway_url${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}ÉTAPE 5: Commit de la configuration API${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if confirm "Commiter la configuration de l'API ?"; then
    git add frontend/config.js
    git commit -m "Configure production API URL"
    git push
    echo -e "${GREEN}✓ Configuration poussée sur GitHub${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}ÉTAPE 6: Déploiement Frontend sur Netlify${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo ""
echo -e "${YELLOW}Instructions Netlify:${NC}"
echo "1. Allez sur https://app.netlify.com"
echo "2. Add new site → Import an existing project"
echo "3. GitHub → Sélectionnez 'rh-tuc'"
echo "4. Configuration:"
echo "   - Base directory: frontend"
echo "   - Build command: (laisser vide)"
echo "   - Publish directory: ."
echo "5. Deploy site"
echo "6. (Optionnel) Site settings → Change site name → rh-tuc"
echo ""

if confirm "Frontend déployé sur Netlify ?"; then
    echo -e "${YELLOW}Entrez l'URL de votre frontend Netlify:${NC}"
    echo "Exemple: https://rh-tuc.netlify.app"
    read -r netlify_url
    
    echo -e "${GREEN}✓ URL Frontend: $netlify_url${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}ÉTAPE 7: Finalisation${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo ""
echo -e "${YELLOW}Dernières étapes:${NC}"
echo "1. Retournez sur Railway"
echo "2. Variables → FRONTEND_URL → Mettez: $netlify_url"
echo "3. Railway redéploiera automatiquement"
echo ""

if confirm "Configuration terminée ?"; then
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║           🎉 PUBLICATION RÉUSSIE ! 🎉                       ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${GREEN}✅ Backend (Railway):${NC} $railway_url"
    echo -e "${GREEN}✅ Frontend (Netlify):${NC} $netlify_url"
    echo -e "${GREEN}✅ Repository GitHub:${NC} https://github.com/$github_username/rh-tuc"
    echo ""
    echo -e "${BLUE}Prochaines étapes:${NC}"
    echo "1. Testez l'application sur $netlify_url"
    echo "2. Créez un compte admin"
    echo "3. Configurez les types de congés et documents"
    echo ""
    echo -e "${YELLOW}📖 Documentation complète: DEPLOIEMENT.md${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
