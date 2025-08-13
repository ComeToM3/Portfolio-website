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

### 3. Vérification

```bash
# Vérifier les remotes
git remote -v

# Vérifier le statut
git status

# Vérifier les branches
git branch -a
```

### 4. Commandes Utiles

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
npm run build
```

### 2. Tests Locaux
```bash
# Serveur de développement
npm run dev

# Vérifier l'URL
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
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
hordearii-website/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Composants React
│   └── lib/             # Utilitaires et configurations
├── docs/                # Documentation
└── README.md           # Documentation principale
```

---

## 🆘 Support

En cas de problème :
1. Vérifier ce guide de dépannage
2. Consulter la documentation officielle
3. Vérifier les issues GitHub
4. Contacter l'équipe de développement
