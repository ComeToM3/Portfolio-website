# 🚀 GUIDE DE DÉVELOPPEMENT BACKEND - HORDEARII.CA

## 🎯 Vue d'ensemble du projet

**Backend API robuste et sécurisé** avec Express.js, PostgreSQL, Prisma et Docker pour supporter le portfolio et les applications.

### **Objectifs :**
- ✅ **API RESTful** moderne avec Express.js et TypeScript
- ✅ **Base de données** PostgreSQL avec Prisma ORM
- ✅ **Sécurité renforcée** avec validation, sanitization, rate limiting
- ✅ **Performance optimisée** avec Docker et PM2
- ✅ **Architecture modulaire** avec séparation des responsabilités
- ✅ **Monitoring et logging** professionnels
- ✅ **Déploiement automatisé** avec CI/CD

---
## ✅ CONFORMITÉ OPEN‑SOURCE & STANDARDS INDUSTRIE

Technologies libres et largement utilisées en production:
- **Node.js** (OpenJS), **Express.js** (MIT), **TypeScript** (Apache-2.0)
- **PostgreSQL** (PostgreSQL License), **Prisma** (Apache-2.0)
- **Redis** (BSD-3-Clause) pour cache/session
- **Docker** (Apache-2.0) containerization, **Nginx** (BSD-2-Clause) reverse proxy, **PM2** (AGPL-3.0) process manager
- Monitoring/observabilité: **Prometheus** (Apache-2.0), **Grafana** (AGPL-3.0)
- Error tracking: **Sentry SDK** (MIT)
- Web analytics (si nécessaire pour endpoints): **Matomo/Umami** (self‑hosted) ou **GA4** (hébergé)

Ces choix sont standards et conformes aux pratiques de l’industrie.

---
## 🏗 ARCHITECTURE TECHNIQUE

### **Stack technologique :**
- **Node.js 18+** : Runtime JavaScript moderne
- **Express.js 4** : Framework web minimaliste et flexible
- **TypeScript** : Typage statique pour code robuste
- **PostgreSQL 15** : Base de données relationnelle robuste
- **Prisma ORM** : Client de base de données type-safe
- **Redis** : Cache et session store
- **Docker** : Containerization et isolation
- **Nginx** : Reverse proxy et load balancer (containerisé)
- **PM2** : Process manager pour orchestration containers
- **JWT** : Authentification stateless
- **bcrypt** : Hachage sécurisé des mots de passe
- **Swagger/OpenAPI** : Documentation API
- **Prometheus/Grafana** : Monitoring et métriques

### **Structure des fichiers :**
```
hordearii-backend/
├── src/
│   ├── app.js                 # Point d'entrée de l'application
│   ├── server.js              # Configuration du serveur HTTP
│   ├── config/
│   │   ├── database.js        # Configuration Prisma
│   │   ├── environment.js     # Variables d'environnement
│   │   ├── security.js        # Configuration sécurité
│   │   ├── redis.js          # Configuration Redis
│   │   └── monitoring.js      # Configuration monitoring
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── projectController.js
│   │   ├── contactController.js
│   │   └── webhookController.js
│   ├── middleware/
│   │   ├── auth.js           # Middleware d'authentification
│   │   ├── validation.js     # Validation des données
│   │   ├── sanitization.js   # Sanitization des inputs
│   │   ├── rateLimit.js      # Rate limiting
│   │   ├── errorHandler.js   # Gestion d'erreurs centralisée
│   │   ├── cors.js          # Configuration CORS
│   │   ├── logging.js       # Logging des requêtes
│   │   ├── audit.js         # Audit trail
│   │   ├── security.js      # Security headers
│   │   ├── cache.js         # Cache middleware
│   │   ├── gdpr.js          # GDPR compliance
│   │   └── monitoring.js    # Monitoring middleware
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── projects.js
│   │   ├── contact.js
│   │   ├── webhooks.js
│   │   ├── api.js           # API versioning
│   │   ├── monitoring.js    # Monitoring endpoints
│   │   ├── compliance.js    # GDPR endpoints
│   │   └── health.js        # Health checks
│   ├── services/
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── projectService.js
│   │   ├── emailService.js
│   │   ├── validationService.js
│   │   ├── cacheService.js
│   │   ├── notificationService.js
│   │   ├── webhookService.js
│   │   ├── monitoringService.js
│   │   ├── complianceService.js
│   │   └── securityService.js
│   ├── models/
│   │   └── prisma/
│   │       └── schema.prisma
│   ├── utils/
│   │   ├── logger.js
│   │   ├── encryption.js
│   │   ├── validation.js
│   │   ├── helpers.js
│   │   ├── audit.js
│   │   └── metrics.js
│   ├── docs/
│   │   ├── swagger.js
│   │   └── postman/
│   └── types/
│       └── index.ts
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── nginx/
│   └── nginx.conf
├── pm2/
│   └── ecosystem.config.js
├── scripts/
│   ├── deploy.sh
│   └── backup.sh
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── logs/
├── .env.example
├── .env
├── package.json
├── tsconfig.json
├── prisma/
│   └── schema.prisma
└── docker-compose.yml
```

---
## 🔒 SÉCURITÉ ET VALIDATION

### **1. Middleware de sécurité :**
- **Helmet.js** : Headers de sécurité HTTP
- **CORS** : Configuration stricte des origines
- **Rate Limiting** : Protection contre les attaques DDoS
- **Input Validation** : Validation des données avec Joi/Zod
- **Input Sanitization** : Nettoyage des données utilisateur
- **SQL Injection Protection** : Avec Prisma ORM
- **XSS Protection** : Sanitization des inputs
- **CSRF Protection** : Protection cross-site request forgery

### **2. Authentification et autorisation :**
- **JWT Tokens** : Authentification stateless
- **Refresh Tokens** : Renouvellement sécurisé
- **bcrypt** : Hachage des mots de passe (12 rounds)
- **Session Management** : Gestion des sessions
- **Role-based Access Control** : Contrôle d'accès par rôles

### **3. Validation et sanitization :**
- **Joi/Zod** : Validation des schémas
- **express-validator** : Validation des requêtes
- **xss-clean** : Protection XSS
- **express-rate-limit** : Rate limiting
- **helmet** : Headers de sécurité

### **4. Sécurité avancée :**
- **Certificate pinning** : Protection contre les attaques MITM
- **Security headers personnalisés** : Headers de sécurité avancés
- **Audit trail complet** : Journalisation de toutes les activités
- **Détection d'intrusion** : Monitoring des activités suspectes
- **CSRF protection** : Protection cross-site request forgery
- **SQL injection protection** : Avec Prisma ORM

---
## 📝 GESTION GIT PROFESSIONNELLE

### **1. Convention de commits :**
- **feat:** : Nouvelles fonctionnalités
- **fix:** : Corrections de bugs
- **perf:** : Optimisations de performance
- **docs:** : Documentation
- **style:** : Formatage du code
- **refactor:** : Refactoring du code
- **test:** : Ajout de tests
- **chore:** : Tâches de maintenance

### **2. Structure des messages de commit :**
```
type(scope): description courte

- Détail 1
- Détail 2
- Détail 3
```

### **3. Branches Git :**
- **main** : Code de production
- **develop** : Branche de développement
- **feature/*** : Nouvelles fonctionnalités
- **hotfix/*** : Corrections urgentes
- **release/*** : Préparations de release

### **4. Workflow Git :**
- **Feature branches** : Développement isolé
- **Pull requests** : Code review
- **Merge strategy** : Squash and merge
- **Versioning** : Semantic versioning
- **Tags** : Releases marquées

---
## 🔐 SÉCURITÉ AVANCÉE

### **1. Certificate Pinning :**
- **Implémentation** : Vérification des certificats SSL
- **Protection** : Contre les attaques MITM
- **Configuration** : Headers de sécurité personnalisés
- **Monitoring** : Détection des tentatives d'attaque

### **2. Audit Trail Complet :**
- **Journalisation** : Toutes les activités utilisateur
- **Stockage** : Base de données sécurisée
- **Rétention** : Politique de rétention configurable
- **Recherche** : Interface de recherche avancée

### **3. Détection d'Intrusion :**
- **Monitoring** : Surveillance des activités suspectes
- **Alertes** : Notifications en temps réel
- **Blocage** : Blocage automatique des IPs suspectes
- **Rapports** : Rapports de sécurité détaillés

---
## 📊 BASE DE DONNÉES ET PRISMA

### **1. Configuration PostgreSQL :**
- **Version** : PostgreSQL 15+
- **Pool de connexions** : Configuration optimisée
- **Indexation** : Indices pour les requêtes fréquentes
- **Backup automatique** : Scripts de sauvegarde
- **Monitoring** : Surveillance des performances

### **2. Schéma Prisma :**
- **Users** : Gestion des utilisateurs
- **Projects** : Portfolio et projets
- **Skills** : Compétences techniques
- **Contact** : Messages de contact
- **Sessions** : Gestion des sessions
- **Logs** : Journalisation des activités

### **3. Migrations et seeding :**
- **Migrations automatiques** : Avec Prisma Migrate
- **Seed data** : Données de test
- **Rollback** : Capacité de retour en arrière
- **Versioning** : Contrôle de version du schéma

---
## ⚡ CACHE ET PERFORMANCES

### **1. Configuration Redis :**
- **Cache intelligent** : Cache des requêtes fréquentes
- **Session store** : Stockage des sessions utilisateur
- **Rate limiting** : Limitation de débit avec Redis
- **Pub/Sub** : Communication entre services

### **2. Optimisation des Performances :**
- **Database connection pooling** : Pool de connexions optimisé
- **Query optimization** : Optimisation des requêtes SQL
- **Indexing** : Indices pour les requêtes fréquentes
- **CDN configuration** : Cache statique avec CDN

### **3. Monitoring des Performances :**
- **Prometheus** : Collecte des métriques
- **Grafana** : Dashboards de monitoring
- **Alertes** : Alertes de performance
- **Tracing** : Traçage distribué des requêtes

---
## 🏗 ARCHITECTURE DES COMPOSANTS

### **1. Controllers (Gestion des requêtes) :**
**Responsabilités :**
- Réception des requêtes HTTP
- Validation des paramètres
- Appel des services appropriés
- Retour des réponses formatées
- Gestion des erreurs HTTP

**Structure :**
- **authController** : Authentification et autorisation
- **userController** : Gestion des utilisateurs
- **projectController** : Gestion des projets
- **contactController** : Gestion des contacts
- **skillController** : Gestion des compétences

### **2. Services (Logique métier) :**
**Responsabilités :**
- Logique métier complexe
- Interactions avec la base de données
- Appels aux APIs externes
- Traitement des données
- Validation métier

**Structure :**
- **authService** : Logique d'authentification
- **userService** : Gestion des utilisateurs
- **projectService** : Gestion des projets
- **emailService** : Envoi d'emails avec templates
- **validationService** : Validation métier
- **cacheService** : Gestion du cache Redis
- **notificationService** : Notifications push
- **webhookService** : Gestion des webhooks
- **auditService** : Audit trail complet

### **3. Middleware (Couche intermédiaire) :**
**Responsabilités :**
- Authentification des requêtes
- Validation des données
- Sanitization des inputs
- Rate limiting
- Logging des requêtes
- Gestion d'erreurs

**Structure :**
- **auth.js** : Middleware d'authentification
- **validation.js** : Validation des données
- **sanitization.js** : Nettoyage des inputs
- **rateLimit.js** : Limitation de débit
- **errorHandler.js** : Gestion d'erreurs
- **cors.js** : Configuration CORS
- **logging.js** : Journalisation
- **audit.js** : Audit trail
- **security.js** : Security headers avancés
- **cache.js** : Middleware de cache

### **4. Routes (Définition des endpoints) :**
**Responsabilités :**
- Définition des routes API
- Association avec les controllers
- Application des middleware
- Documentation des endpoints

**Structure :**
- **/api/v1/auth** : Endpoints d'authentification
- **/api/v1/users** : Gestion des utilisateurs
- **/api/v1/projects** : Gestion des projets
- **/api/v1/contact** : Gestion des contacts
- **/api/v1/skills** : Gestion des compétences
- **/api/v1/webhooks** : Gestion des webhooks
- **/api/v1/notifications** : Notifications push
- **/docs** : Documentation Swagger
- **/metrics** : Métriques Prometheus

---
## 📧 EMAIL ET NOTIFICATIONS

### **1. Service d'Email Robuste :**
- **Nodemailer** : Service d'envoi d'emails
- **Templates Handlebars** : Templates HTML/CSS
- **Queue system** : File d'attente pour les emails
- **Retry logic** : Logique de retry en cas d'échec

### **2. Notifications Push :**
- **Web Push API** : Notifications push navigateur
- **Service Workers** : Gestion des notifications
- **Subscription management** : Gestion des abonnements
- **Targeting** : Envoi ciblé des notifications

### **3. Webhook Handling :**
- **Endpoint sécurisé** : Validation des webhooks
- **Signature verification** : Vérification des signatures
- **Retry mechanism** : Mécanisme de retry
- **Event processing** : Traitement des événements

---
## 🔧 CONFIGURATION ET ENVIRONNEMENT

### **1. Configuration par environnement :**
- **Development** : Configuration locale
- **Staging** : Environnement de test
- **Production** : Configuration optimisée
- **Testing** : Configuration pour tests

### **2. Variables d'environnement :**
- **Database** : URLs et credentials
- **JWT** : Clés secrètes
- **Email** : Configuration SMTP
- **External APIs** : Clés API
- **Security** : Clés de chiffrement

### **3. Configuration Docker :**
- **Reverse Proxy** : Redirection vers Node.js
- **SSL/TLS** : Certificats HTTPS automatiques (Let's Encrypt)
- **Load Balancing** : Distribution de charge
- **Caching** : Cache statique
- **Compression** : Gzip compression
- **Redirects** : www/non-www redirects
- **Security Headers** : Headers de sécurité avancés

---
## 🧰 PLAYBOOK DÉPLOIEMENT BACKEND (MODÈLES)

Note: ces fichiers seront créés et versionnés à la **PHASE 5** (déploiement) dans le dossier du repo `hiveos/`.

- `hiveos/docker-compose.yml` (extrait backend):
  - App name: `hordearii-backend`
  - CWD: `/var/www/hordearii/backend`
  - Script: `dist/server.js`
  - Instances: 2, `exec_mode: cluster`, `PORT=3001`
  - Logs: `/var/log/hordearii/backend-*.log`

- `hiveos/nginx.conf` (extrait backend - containerisé):
  - Bloc `location /api/ { proxy_pass http://localhost:3001/; ... }`
  - SSL via Let’s Encrypt, headers de sécurité stricts, gzip activé

- `hiveos/deploy.sh` (extrait backend - Docker):
  - `npm ci && npm run build` dans `/var/www/hordearii/backend`
  - `pm2 reload all && pm2 save`, vérification `curl -I localhost:3001`

---
## 📋 PLAN OPÉRATIONNEL (exécution)

Le plan détaillé d'exécution (phases 1 à 6, étapes et commandes) est centralisé dans `jobcv/BACKEND_DEV_PLAN` afin d'éviter les duplications.

Ce guide reste la référence pour:
- Vision, architecture et structure des composants
- Sécurité et conformité
- Monitoring/observabilité
- Playbook de déploiement (modèles HiveOS/Docker/PM2/Nginx)

### **PHASE 5 : DÉPLOIEMENT ET INFRASTRUCTURE (Jours 8-9)**
**Objectif :** Déploiement sur infrastructure HiveOS Standard + Docker et configuration production

#### **ÉTAPE 5.1 : Déploiement et CI/CD avancé (Jour 8 - Après-midi)**
**Objectifs :**
- Configurer le déploiement automatisé
- Mettre en place les tests automatisés
- Configurer les backups automatisés
- Optimiser pour la production

**Tâches :**
```bash
# Configurer GitHub Actions
# Créer les workflows CI/CD
# Configurer les tests automatisés
# Mettre en place les backups automatisés
# Configurer les variables de production
# Optimiser les performances
# Tester le déploiement complet

# Créer et versionner les artefacts HiveOS (repo ./hiveos/)
# - hiveos/deploy.sh (script Docker build/reload)
# - hiveos/docker-compose.yml (service "hordearii-backend")
# - hiveos/nginx.conf (bloc /api/, SSL, headers - containerisé)
```

```bash
# Commit - Déploiement et CI/CD avancé
git add .
git commit -m "feat: Configuration déploiement et CI/CD avancé

- GitHub Actions pour déploiement automatisé
- Workflows CI/CD complets
- Tests automatisés
- Backups automatisés
- Variables de production
- Optimisation pour production"
```

#### **ÉTAPE 5.2 : SSL et Domain Configuration (Jour 9 - Matin)**
**Objectifs :**
- Configurer les certificats SSL automatiques
- Mettre en place les redirects (www/non-www)
- Configurer le domaine personnalisé
- Optimiser la configuration Docker et Nginx

**Tâches :**
```bash
# Configurer Let's Encrypt pour SSL automatique
# Configurer les redirects www/non-www
# Optimiser la configuration Docker et Nginx
# Configurer le domaine hordearii.ca
# Tester la configuration SSL
# Vérifier les performances HTTPS
```

```bash
# Commit - SSL et Domain Configuration
git add .
git commit -m "feat: Configuration SSL et domaine

- Certificats SSL automatiques (Let's Encrypt)
- Redirects www/non-www
- Configuration Nginx optimisée
- Domaine hordearii.ca
- Tests de configuration SSL
- Performance HTTPS"
```

#### **ÉTAPE 5.3 : Monitoring et Alerting complet (Jour 9 - Après-midi)**
**Objectifs :**
- Mettre en place l'uptime monitoring
- Configurer les métriques de performance
- Implémenter l'error alerting
- Configurer les analytics utilisateur

**Tâches :**
```bash
# Configurer l'uptime monitoring
# Mettre en place les métriques de performance
# Configurer l'error alerting avec Sentry (SDK Node)
# Exposer /metrics (prom-client) pour Prometheus
# Configurer les dashboards Grafana
# Mettre en place les alertes Slack/Email
# Tester le monitoring complet
```

```bash
# Commit - Monitoring et Alerting complet
git add .
git commit -m "feat: Configuration monitoring et alerting complet

- Uptime monitoring en temps réel
- Métriques de performance détaillées
- Error alerting avec Sentry
- Analytics utilisateur avancés
- Dashboards Grafana personnalisés
- Alertes Slack/Email automatisées
- Tests complets du monitoring"
```

#### **ÉTAPE 5.4 : Sécurité et Compliance (Jour 9 - Soir)**
**Objectifs :**
- Implémenter la conformité GDPR
- Configurer les security headers avancés
- Créer les politiques légales
- Mettre en place la protection des données

**Tâches :**
```bash
# Configurer les security headers (CSP, HSTS)
# Implémenter la conformité GDPR
# Créer les politiques de rétention
# Configurer l'export des données utilisateur
# Créer les terms of service
# Implémenter la conformité légale
# Configurer la protection des données
```

```bash
# Commit - Sécurité et Compliance
git add .
git commit -m "feat: Implémentation sécurité et compliance GDPR

- Security headers avancés (CSP, HSTS)
- Conformité GDPR complète
- Politiques de rétention des données
- Export des données utilisateur
- Terms of service
- Conformité légale
- Protection des données"
```

### **PHASE 6 : FINALISATION ET RELEASE (Jour 10)**
**Objectif :** Finalisation, tests complets et release

#### **ÉTAPE 6.1 : Tests complets et validation (Jour 10 - Matin)**
**Objectifs :**
- Tests de régression complets
- Validation des performances
- Tests de sécurité finaux
- Validation de la conformité

**Tâches :**
- Tests de régression sur toutes les fonctionnalités
- Validation des performances avec load testing
- Tests de sécurité avec OWASP
- Validation de la conformité GDPR
- Tests cross-platform complets
- Tests de l'API complète
- Validation du monitoring
- Tests de backup et recovery

#### **ÉTAPE 6.2 : Documentation et finalisation (Jour 10 - Après-midi)**
**Objectifs :**
- Créer la documentation API complète
- Documenter l'architecture
- Créer les guides d'utilisation
- Finaliser le projet

**Tâches :**
- Créer la documentation Swagger complète
- Documenter l'architecture détaillée
- Créer les guides d'utilisation
- Finaliser la documentation
- Créer le README complet
- Préparer la présentation du projet

```bash
# Tag de release v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0 - Backend API robuste et sécurisé

- API RESTful avec Express.js et TypeScript
- Base de données PostgreSQL avec Prisma ORM
- Sécurité renforcée avec validation et sanitization
- Performance optimisée avec Redis, Docker et Nginx
- Monitoring complet avec Prometheus/Grafana
- Déploiement automatisé avec CI/CD
- Conformité GDPR et sécurité avancée"
```

---
## 🎯 RÉSULTAT ATTENDU

Un backend robuste, sécurisé et performant qui :

**Architecture professionnelle :**
- Code modulaire et maintenable
- Séparation claire des responsabilités
- Configuration par environnement
- Documentation complète

**Sécurité renforcée :**
- Protection contre toutes les attaques courantes
- Validation et sanitization complètes
- Authentification sécurisée
- Monitoring des activités

**Performance optimisée :**
- Base de données optimisée
- Cache intelligent
- Load balancing
- Monitoring des performances

**Déploiement moderne :**
- CI/CD automatisé
- Monitoring en temps réel
- Backups automatiques
- Rollback en cas de problème

**Sécurité renforcée :**
- Certificate pinning
- Audit trail complet
- Détection d'intrusion
- Security headers avancés

**Performance optimisée :**
- Cache Redis intelligent
- CDN configuration
- Database connection pooling
- Monitoring Prometheus/Grafana

**Documentation complète :**
- Swagger/OpenAPI interactive
- Collection Postman
- API versioning
- Guides d'utilisation

**SSL et Domain :**
- Certificats SSL automatiques (Let's Encrypt)
- Redirects www/non-www
- Configuration Nginx optimisée
- Performance HTTPS

**Monitoring complet :**
- Uptime monitoring
- Performance metrics
- Error alerting
- User analytics

**Sécurité et Compliance :**
- GDPR/Privacy compliance
- Security headers avancés
- Legal requirements
- Data protection

**Le backend sera une base solide pour toutes vos applications, démontrant des compétences techniques avancées et une approche professionnelle du développement avec toutes les bonnes pratiques de l'industrie !**

---
## ✅ DÉVELOPPEMENTS COMPLÉTÉS

### Phase 1 - Fondations ✅
- **ÉTAPE 1.1** : Setup initial et configuration
  - Configuration TypeScript et ESLint
  - Structure de projet et dépendances
  - Configuration environnement

- **ÉTAPE 1.2** : Configuration de la base de données
  - Base de données PostgreSQL `profilejd`
  - Schéma Prisma avec modèles User, Project, Skill, Session, Contact
  - Seeding des données initiales

- **ÉTAPE 1.3** : Configuration de sécurité de base
  - Middleware de sécurité (Helmet, CORS, Rate Limiting)
  - Validation et sanitization des inputs
  - Gestion d'erreurs centralisée
  - Headers de sécurité avancés

### Phase 2 - Services et API ✅
- **ÉTAPE 2.1** : Services et logique métier
  - AuthService : Authentification JWT, bcrypt, sessions
  - ProjectService : CRUD complet, filtres, pagination, statistiques
  - SkillService : Gestion par catégories, niveaux, recherche

- **ÉTAPE 2.2** : Controllers et routes
  - AuthController : Inscription, connexion, profil, changement mot de passe
  - ProjectController : Routes publiques (projets, featured, recherche)
  - SkillController : Routes publiques (compétences, top, par catégorie)
  - Routes API avec middleware de sécurité et validation

### 🎯 Fonctionnalités Disponibles

**API Publique :**
- `GET /api/projects/public` - Projets publics
- `GET /api/projects/featured` - Projets mis en avant
- `GET /api/projects/search` - Recherche de projets
- `GET /api/skills/public` - Compétences publiques
- `GET /api/skills/top` - Top compétences
- `GET /api/skills/by-category` - Compétences par catégorie

**API Authentifiée :**
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Rafraîchir token
- `GET /api/auth/profile` - Profil utilisateur
- `PUT /api/auth/change-password` - Changer mot de passe
- `GET /api/auth/verify` - Vérifier authentification

### 🔒 Sécurité Implémentée
- **Rate Limiting** : Protection contre DDoS
- **CORS** : Configuration stricte des origines
- **Helmet** : Headers de sécurité HTTP
- **JWT** : Authentification sécurisée
- **bcrypt** : Hachage des mots de passe (12 rounds)
- **Validation** : Validation des données d'entrée
- **Sanitization** : Nettoyage des inputs
- **Error Handling** : Gestion centralisée des erreurs

---
