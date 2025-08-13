# 🔄 Workflow Git - HORDEARII.CA

## 🎯 Vue d'ensemble
Workflow Git professionnel basé sur GitFlow pour assurer la traçabilité et la qualité du code.

---

## 🌿 Stratégie de Branches

### **1. Branches Principales**
```
main (production)
├── develop (intégration)
├── feature/feature-name
├── bugfix/bug-description
├── hotfix/critical-fix
└── release/version-number
```

### **2. Types de Branches**

#### **main (Production)**
- **Rôle** : Code en production
- **Protection** : Merge uniquement via PR
- **Tests** : Validation complète obligatoire
- **Déploiement** : Automatique après merge

#### **develop (Intégration)**
- **Rôle** : Intégration des features
- **Protection** : Merge uniquement via PR
- **Tests** : Tests d'intégration
- **Déploiement** : Environnement de staging

#### **feature/*** (Nouvelles fonctionnalités)
- **Rôle** : Développement de features
- **Source** : `develop`
- **Destination** : `develop`
- **Convention** : `feature/descriptive-name`

#### **bugfix/*** (Corrections de bugs)
- **Rôle** : Correction de bugs
- **Source** : `develop`
- **Destination** : `develop`
- **Convention** : `bugfix/issue-description`

#### **hotfix/*** (Corrections critiques)
- **Rôle** : Corrections urgentes en production
- **Source** : `main`
- **Destination** : `main` + `develop`
- **Convention** : `hotfix/critical-issue`

#### **release/*** (Préparation de release)
- **Rôle** : Finalisation de release
- **Source** : `develop`
- **Destination** : `main` + `develop`
- **Convention** : `release/v1.2.3`

---

## 📝 Conventions de Commits

### **1. Format des Messages**
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### **2. Types de Commits**
- **feat** : Nouvelle fonctionnalité
- **fix** : Correction de bug
- **docs** : Documentation
- **style** : Formatage, points-virgules manquants, etc.
- **refactor** : Refactoring de code
- **test** : Ajout ou modification de tests
- **chore** : Tâches de maintenance

### **3. Exemples**
```bash
# Nouvelle fonctionnalité
feat(auth): add JWT authentication system

# Correction de bug
fix(user): resolve email validation issue

# Documentation
docs(api): update API documentation

# Refactoring
refactor(services): extract user service logic

# Tests
test(auth): add unit tests for JWT validation

# Maintenance
chore(deps): update dependencies to latest versions
```

### **4. Règles Strictes**
- **Longueur** : ≤50 caractères pour le titre
- **Langue** : Anglais uniquement
- **Temps** : Impératif présent
- **Ponctuation** : Pas de point final

---

## 🔄 Workflow de Développement

### **1. Démarrage d'une Feature**
```bash
# 1. S'assurer que develop est à jour
git checkout develop
git pull origin develop

# 2. Créer la branche feature
git checkout -b feature/user-authentication

# 3. Développer et commiter régulièrement
git add .
git commit -m "feat(auth): implement JWT token generation"

# 4. Pousser la branche
git push origin feature/user-authentication
```

### **2. Finalisation d'une Feature**
```bash
# 1. Mettre à jour develop
git checkout develop
git pull origin develop

# 2. Rebaser la feature sur develop
git checkout feature/user-authentication
git rebase develop

# 3. Résoudre les conflits si nécessaire
git add .
git rebase --continue

# 4. Pousser les changements
git push origin feature/user-authentication --force-with-lease
```

### **3. Pull Request**
```markdown
## Description
Implémentation du système d'authentification JWT.

## Type de changement
- [ ] Bug fix
- [x] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests
- [x] Tests unitaires ajoutés
- [x] Tests d'intégration ajoutés
- [ ] Tests manuels effectués

## Checklist
- [x] Code conforme aux standards
- [x] Documentation mise à jour
- [x] Tests passent
- [x] Pas de régression

## Screenshots (si applicable)
[Insérer des captures d'écran]

## Informations supplémentaires
[Informations complémentaires]
```

---

## 🔍 Code Review

### **1. Critères de Review**
- **Fonctionnalité** : Le code fait-il ce qui est attendu ?
- **Qualité** : Respect des standards de code
- **Tests** : Couverture suffisante
- **Performance** : Impact sur les performances
- **Sécurité** : Vulnérabilités potentielles
- **Documentation** : Code auto-documenté

### **2. Processus de Review**
```bash
# 1. Créer la PR
gh pr create --title "feat: add user authentication" --body "..."

# 2. Assigner les reviewers
gh pr edit --add-reviewer @team/backend

# 3. Demander la review
gh pr request-review @username

# 4. Répondre aux commentaires
# [Répondre dans l'interface GitHub]

# 5. Merge après approbation
gh pr merge --squash
```

### **3. Règles de Merge**
- **Approbation** : Minimum 2 reviewers
- **Tests** : Tous les tests doivent passer
- **Coverage** : Couverture maintenue ou améliorée
- **Linting** : Aucune erreur de linting

---

## 🚀 Déploiement

### **1. Environnements**
```bash
# Développement (feature branches)
feature/* → develop → staging

# Production (main branch)
main → production
```

### **2. Pipeline CI/CD**
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Check coverage
        run: npm run test:coverage

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run linting
        run: npm run lint

  deploy-staging:
    needs: [test, lint]
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: echo "Deploy to staging"

  deploy-production:
    needs: [test, lint]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: echo "Deploy to production"
```

---

## 🛡️ Protection des Branches

### **1. Configuration GitHub**
```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["ci/tests", "ci/lint"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 2,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true
  },
  "restrictions": {
    "users": [],
    "teams": ["@team/backend", "@team/frontend"]
  }
}
```

### **2. CODEOWNERS**
```bash
# .github/CODEOWNERS
# Backend
/src/backend/ @team/backend

# Frontend
/src/frontend/ @team/frontend

# Infrastructure
/infrastructure/ @team/devops

# Documentation
/docs/ @team/backend @team/frontend
```

---

## 📊 Métriques et Reporting

### **1. Métriques de Qualité**
- **Temps de review** : ≤24h
- **Taux d'approbation** : ≥95%
- **Temps de merge** : ≤48h
- **Taux de régression** : ≤2%

### **2. Outils de Monitoring**
- **GitHub Insights** : Métriques de repository
- **SonarQube** : Qualité du code
- **Coveralls** : Couverture de tests
- **Dependabot** : Mises à jour de sécurité

---

## 🔧 Outils et Extensions

### **1. Git Hooks**
```bash
# .git/hooks/pre-commit
#!/bin/sh
npm run lint
npm run test:unit
```

### **2. Extensions VS Code**
- **GitLens** : Historique Git avancé
- **Git Graph** : Visualisation des branches
- **Conventional Commits** : Formatage des commits

### **3. Scripts Utilitaires**
```bash
# scripts/git-utils.sh
#!/bin/bash

# Créer une feature branch
create_feature() {
    local feature_name=$1
    git checkout develop
    git pull origin develop
    git checkout -b "feature/$feature_name"
    echo "Feature branch 'feature/$feature_name' created"
}

# Finaliser une feature
finish_feature() {
    local feature_name=$1
    git checkout develop
    git pull origin develop
    git checkout "feature/$feature_name"
    git rebase develop
    git checkout develop
    git merge "feature/$feature_name"
    git branch -d "feature/$feature_name"
    git push origin develop
    echo "Feature '$feature_name' merged to develop"
}
```

---

*Ce workflow garantit la qualité, la traçabilité et la collaboration efficace*
