# 🔧 Guide de Dépannage - HORDEARII.CA

## 📋 Erreurs Rencontrées et Solutions

### Erreurs TypeScript et ESLint

#### 1. Erreur `@typescript-eslint/no-explicit-any`
**Problème :** ESLint interdit l'utilisation du type `any`

**Fichier :** `src/lib/api/services.ts`
```typescript
// ❌ Incorrect
trackEvent: async (event: string, data?: any) => {
  const response = await api.post('/analytics/event', { event, data });
  return response.data;
}

// ✅ Solution
trackEvent: async (event: string, data?: Record<string, unknown>) => {
  const response = await api.post('/analytics/event', { event, data });
  return response.data;
}
```

#### 2. Erreur dans React Query Provider
**Problème :** Type `any` dans la fonction retry

**Fichier :** `src/lib/providers/query-provider.tsx`
```typescript
// ❌ Incorrect
retry: (failureCount, error: any) => {
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    // ...
  }
}

// ✅ Solution
retry: (failureCount, error: unknown) => {
  const axiosError = error as { response?: { status?: number } };
  if (axiosError?.response?.status && axiosError.response.status >= 400 && axiosError.response.status < 500) {
    if (axiosError.response.status === 408 || axiosError.response.status === 429) {
      return failureCount < 3;
    }
    return false;
  }
  return failureCount < 3;
}
```

#### 3. Warnings Metadata Next.js 15
**Problème :** Warnings sur viewport et themeColor dans metadata

**Fichier :** `src/app/layout.tsx`
```typescript
// ❌ Incorrect - Next.js 15
export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  // ...
}

// ✅ Solution - Next.js 15
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://hordearii.ca'),
  // ... autres métadonnées
};
```

### Erreurs Backend

#### 1. Erreur `ts-node: not found`
**Problème :** Nodemon ne trouve pas ts-node

**Solution :**
```bash
# Installer ts-node
npm install --save-dev ts-node

# Corriger le script dans package.json
"dev": "nodemon --exec ts-node src/index.ts"
```

#### 2. Erreur `@types/morgan` manquant
**Problème :** Types TypeScript manquants pour morgan

**Solution :**
```bash
npm install --save-dev @types/morgan
```

#### 3. Erreur d'accès aux variables d'environnement
**Problème :** TypeScript strict avec process.env

**Solution :**
```typescript
// ❌ Incorrect
const PORT = process.env.PORT || 3001;

// ✅ Correct
const PORT = process.env['PORT'] || 3001;
```

#### 4. Variables non utilisées
**Problème :** TypeScript strict avec variables non utilisées

**Solution :**
```typescript
// ❌ Incorrect
app.get('/', (req, res) => {
  // req non utilisé
});

// ✅ Correct
app.get('/', (_req, res) => {
  // _req indique que c'est intentionnellement non utilisé
});
```

### Erreurs de Build

#### Build échoue avec erreurs TypeScript
```bash
# Solution
npm run build

# Si erreurs persistantes
rm -rf .next
npm run build
```

#### Warnings de metadata
- Ajouter `metadataBase` pour les images Open Graph
- Utiliser l'export `viewport` séparé
- Vérifier les URLs des images

---

## 🚀 Configuration GitHub Repository

### 1. Créer le Repository GitHub

1. **Aller sur GitHub.com** et se connecter
2. **Cliquer sur "New repository"** (bouton vert)
3. **Configurer le repository :**
   - **Repository name :** `hordearii-website`
   - **Description :** `Portfolio professionnel de Johan Dominguez - Développeur Full Stack, Musicien, Athlète et Pâtissier`
   - **Visibilité :** Public (ou Private selon préférence)
   - **Ne pas initialiser** avec README, .gitignore, ou license

### 2. Configuration GitHub CLI (Recommandé)

```bash
# Installer GitHub CLI
sudo apt update && sudo apt install gh -y

# Authentifier
gh auth login
# Suivre les instructions interactives

# Configurer le remote
git remote add origin https://github.com/ComeToM3/Portfolio-website.git
git branch -M main

# Pousser le code
git push -u origin main
```

### 3. Structure Monorepo

```bash
# Réorganisation en monorepo
mkdir frontend backend
mv hordearii-website/* frontend/
mv .git frontend/
mv frontend/.git .
mv frontend/.gitignore .gitignore.frontend

# Créer .gitignore unifié
# Ajouter tous les fichiers
git add .
git commit -m "feat: Réorganisation en monorepo"
```

### 4. Vérification

```bash
# Vérifier les remotes
git remote -v

# Vérifier le statut
git status

# Vérifier les branches
git branch -a
```

### 5. Commandes Utiles

```bash
# Pousser les changements
git add .
git commit -m "feat: description"
git push

# Créer une nouvelle branche
git checkout -b feature/nom-feature

# Fusionner une branche
git checkout main
git merge feature/nom-feature
```

---

## 🔍 Vérifications Pré-Déploiement

### 1. Build de Production
```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build
```

### 2. Tests Locaux
```bash
# Frontend
cd frontend && npm run dev
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000

# Backend
cd backend && npm run dev
curl -s http://localhost:3001/health
```

### 3. Vérifications Code
```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 📝 Notes Importantes

### Conventions de Nommage
- **Composants :** PascalCase (`Header.tsx`)
- **Fichiers :** kebab-case (`api-services.ts`)
- **Variables :** camelCase (`userName`)
- **Constantes :** UPPER_SNAKE_CASE (`API_BASE_URL`)

### Commits
- **Format :** `feat: description` ou `fix: description`
- **Exemples :**
  - `feat: Initialisation du projet Next.js avec Tailwind CSS`
  - `fix: Correction des erreurs TypeScript dans services API`

### Structure du Projet
```
jobcv/
├── frontend/          # Code Next.js
├── backend/           # Code Node.js
├── docs/             # Documentation
└── README.md         # Documentation principale
```

---

## 🆘 Support

En cas de problème :
1. Vérifier ce guide de dépannage
2. Consulter la documentation officielle
3. Vérifier les issues GitHub
4. Contacter l'équipe de développement
