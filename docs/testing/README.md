# 🧪 Tests

Ce dossier contient toutes les spécifications et stratégies de tests pour le projet HORDEARII.CA.

## 📄 Fichiers

### 🧪 [testing-specifications.md](./testing-specifications.md)
**Spécifications de tests** - Définit la stratégie complète de tests du projet.

**Contenu :**
- Stratégie de tests globale
- Tests unitaires
- Tests d'intégration
- Tests de performance
- Tests de sécurité
- Tests d'accessibilité

## 🚀 Utilisation

### Pour le développement :
- Implémentez les tests en parallèle du développement
- Suivez les spécifications de couverture
- Validez chaque fonctionnalité avec des tests

### Pour la CI/CD :
- Intégrez les tests dans le pipeline
- Maintenez la qualité du code
- Assurez la régression

## 🧪 Types de Tests

### Tests Unitaires
- **Frontend** : Composants React, hooks, utilitaires
- **Backend** : Contrôleurs, services, modèles
- **Couverture** : ≥80% minimum

### Tests d'Intégration
- **API** : Endpoints et workflows
- **Base de données** : Requêtes et transactions
- **Services externes** :  API, email

### Tests de Performance
- **Frontend** : Lighthouse, Core Web Vitals
- **Backend** : Load testing, stress testing
- **Base de données** : Optimisation des requêtes

### Tests de Sécurité
- **Tests de pénétration** : Vulnérabilités
- **Tests d'authentification** : JWT, permissions
- **Tests de chiffrement** : Données sensibles

### Tests d'Accessibilité
- **WCAG 2.1** : Conformité niveau AA
- **Tests manuels** : Navigation clavier, lecteurs d'écran
- **Tests automatisés** : axe-core, jest-axe

## 🔗 Liens utiles

- **Spécifications** : `../specifications/`
- **Guides de développement** : `../guides/`
- **Sécurité** : `../security/`

## 📝 Notes importantes

- **Tests first** : Développement piloté par les tests
- **Couverture** : Maintenir ≥80% de couverture
- **Automatisation** : Intégration dans CI/CD
- **Qualité** : Tests comme documentation vivante

---

*Les tests garantissent la qualité, la fiabilité et la maintenabilité du code*
