# 📋 CAHIER DES CHARGES - HORDEARII.CA

## 🎯 VISION GLOBALE DU PROJET

### **Objectif Principal**
Créer un portfolio professionnel moderne et performant qui démontre vos compétences techniques et votre profil unique, avec une section dédiée aux applications.

### **Points Clés**
- Portfolio synchronisé avec LinkedIn
- Architecture moderne et performante
- Hébergement sur infrastructure personnelle (HiveOS)
- Gestion Git professionnelle
- Sécurité et monitoring avancés

## ✅ CONFORMITÉ OPEN‑SOURCE & STANDARDS

Technologies libres et largement adoptées en production:
- Frontend: Next.js 14 (MIT), React 18 (MIT), TypeScript (Apache-2.0), Tailwind CSS (MIT), Framer Motion (MIT)
- Backend: Node.js (OpenJS), Express.js (MIT), PostgreSQL (PostgreSQL License), Prisma (Apache-2.0), Redis (BSD-3-Clause)
- Infra: Nginx (BSD-2-Clause), PM2 (AGPL-3.0)
- Observabilité: Prometheus (Apache-2.0), Grafana (AGPL-3.0), Sentry SDK (MIT)
- Web analytics: GA4 (hébergé) ou self‑hosted (Matomo GPL‑3.0, Umami MIT, Plausible AGPL‑3.0)

## 🏗 ARCHITECTURE GLOBALE

### **1. Frontend (Next.js + Tailwind CSS)**
```
Frontend (Next.js 14)
├── Interface utilisateur
│   ├── Portfolio public
│   │   ├── Sections principales (Hero, About, Skills, Projects, Contact)
│   │   ├── Section applications
│   │   └── Blog technique
│   └── Interface admin
│       ├── Gestion du contenu
│       ├── Synchronisation LinkedIn
│       └── Analytics
├── PWA
│   ├── Installation mobile
│   ├── Offline functionality
│   └── Push notifications
└── Monitoring
    ├── Performance
    ├── Analytics
    └── Error tracking
```

### **2. Backend (Express.js + PostgreSQL)**
```
Backend (Express.js)
├── API RESTful
│   ├── Authentification
│   ├── Gestion contenu
│   ├── Synchronisation LinkedIn
│   └── Analytics
├── Base de données
│   ├── PostgreSQL (Prisma ORM)
│   └── Redis (Cache)
└── Services
    ├── Email
    ├── Notifications
    └── Webhooks
```

### **3. Infrastructure (HiveOS Standard + Docker)**
```
Infrastructure
├── HiveOS Standard (Minage + Serveur)
│   ├── Docker Engine
│   ├── Containers
│   │   ├── Nginx (reverse proxy + TLS 1.3)
│   │   ├── Next.js app (frontend)
│   │   ├── Express.js API (backend)
│   │   ├── PostgreSQL (database)
│   │   ├── Redis (cache)
│   │   └── Prometheus/Grafana (monitoring)
│   └── PM2 (process manager pour containers)
├── SSL/TLS
│   └── Let's Encrypt (auto-renewal via Nginx)
└── Monitoring
    ├── Prometheus (node_exporter, nginx_exporter, docker_exporter)
    ├── Grafana (dashboards)
    └── Uptime Kuma (uptime/alerting)
```

## 📊 SPÉCIFICATIONS TECHNIQUES

### **1. Frontend**
- **Framework** : Next.js 14
- **CSS** : Tailwind CSS
- **State Management** : React Query
- **Animations** : Framer Motion
- **PWA** : next-pwa
- **i18n** : next-intl
- **Analytics** : GA4, Hotjar, Sentry

### **2. Backend**
- **Runtime** : Node.js 18+
- **Framework** : Express.js 4
- **Database** : PostgreSQL 15
- **ORM** : Prisma
- **Cache** : Redis
- **Auth** : JWT + bcrypt
- **Documentation** : Swagger/OpenAPI

### **3. Infrastructure**
- **Serveur** : HiveOS Standard rig (Minage + Serveur)
- **Containerization** : Docker Engine
- **Process Manager** : PM2 (pour orchestration containers)
- **Reverse Proxy** : Nginx (containerisé)
- **SSL** : Let's Encrypt (TLS 1.3 via Nginx)
- **Monitoring** : Prometheus/Grafana (avec docker_exporter)

### **4. Architecture Docker**
- **Containerization** : Docker Engine sur HiveOS Standard
- **Orchestration** : Docker Compose pour multi-containers
- **Networking** : Docker networks isolées
- **Volumes** : Persistance des données (DB, logs, SSL)
- **Health Checks** : Monitoring automatique des containers
- **Auto-restart** : Récupération automatique en cas de crash

## 🛠 FONCTIONNALITÉS PRINCIPALES

### **1. Portfolio Public**
- **Hero Section** : Présentation personnelle impactante
- **About** : Parcours et compétences uniques
- **Skills** : Compétences techniques et soft skills
- **Projects** : Réalisations et projets
- **Applications** : Section dédiée aux applications
- **Contact** : Formulaire et informations

### **2. Administration**
- **Dashboard** : Vue d'ensemble
- **Gestion Contenu** : Interface d'édition
- **Sync LinkedIn** : Synchronisation automatique
- **Analytics** : Métriques et statistiques
- **Monitoring** : Performance et erreurs

### **3. Fonctionnalités Techniques**
- **PWA** : Installation mobile et offline
- **i18n** : Support multilingue (FR/EN)
- **SEO** : Optimisation pour moteurs
- **Performance** : Lighthouse 100/100
- **Sécurité** : Headers, CORS, Rate limiting

## 🔒 SÉCURITÉ

### **1. Frontend**
- Content Security Policy (CSP)
- HTTPS strict (HSTS)
- XSS Protection
- CSRF Protection
- Cookie Security

### **2. Backend**
- JWT Authentication
- Rate Limiting
- Input Validation
- Data Sanitization
- SQL Injection Protection

### **3. Infrastructure**
- SSL/TLS
- Firewall Configuration
- DDoS Protection
- Monitoring temps réel
- Backup automatisé
- **Docker Security** :
  - Images sécurisées (non-root users)
  - Secrets management
  - Container isolation
  - Network segmentation
  - Image scanning (vulnérabilités)

## 📈 MONITORING ET ANALYTICS

### **1. Performance**
- Core Web Vitals
- Temps de réponse API
- Database performance
- **Docker Monitoring** :
  - Container health
  - Resource usage (CPU, RAM, disk)
  - Network traffic
  - Container logs
  - Image vulnerabilities
- Cache hit ratio
- Resource utilization

### **2. User Analytics**
- Google Analytics 4 (ou alternatives self‑hosted: Matomo/Umami/Plausible)
- Hotjar heatmaps (ou PostHog self‑hosted)
- User behavior & conversion tracking
- Error tracking (Sentry)

### **3. Infrastructure**
- Uptime monitoring (Uptime Kuma)
- Resource monitoring (Prometheus + Grafana)
- Error alerting (Sentry, alertmanager/Email/Slack)
- Security alerts
- Backup monitoring

## 🚀 WORKFLOW DE DÉVELOPPEMENT

### **1. Git Flow**
```
main (production)
└── develop
    ├── feature/*
    ├── hotfix/*
    └── release/*
```

### **2. Convention de Commits**
- feat: Nouvelles fonctionnalités
- fix: Corrections de bugs
- perf: Optimisations
- docs: Documentation
- style: Formatage
- refactor: Refactoring
- test: Tests
- chore: Maintenance

### **3. CI/CD Pipeline**
- Tests automatisés
- Lint checking
- Build optimization
- Déploiement automatique
- Monitoring post-déploiement

## 📅 PLANNING DE DÉVELOPPEMENT DÉTAILLÉ

### **PHASE 1 : FRONTEND (10 jours)**

#### **Phase 1.1 : FONDATIONS (Jours 1-2)**
- **Jour 1 - Matin** : Setup Next.js et Configuration Initiale
  - Initialisation du projet Next.js avec TypeScript
  - Configuration Tailwind CSS et dépendances de base
  - Structure des dossiers et Git professionnel

- **Jour 1 - Après-midi** : Configuration API et Services
  - Configuration Axios pour les appels API
  - Mise en place React Query pour la gestion d'état
  - Préparation intégration backend

- **Jour 2 - Matin** : Layout et Navigation
  - Création du layout principal avec Next.js App Router
  - Implémentation de la navigation responsive
  - Configuration du smooth scrolling

#### **Phase 1.2 : SECTIONS PRINCIPALES (Jours 2-4)**
- **Jour 2 - Après-midi** : Hero Section
  - Section hero impactante avec contenu LinkedIn
  - Layout grid responsive avec Tailwind
  - Animations Framer Motion

- **Jour 3 - Matin** : About Section
  - Section à propos avec highlight cards
  - Intégration expérience LinkedIn (musicien, athlète, pâtissier)
  - Animations au scroll

- **Jour 3 - Après-midi** : Skills Section
  - Barres de progression animées
  - Compétences LinkedIn validées
  - Organisation par catégories

- **Jour 4 - Matin** : Projects Section
  - Grille de projets responsive
  - Images optimisées avec Next.js Image
  - Projets LinkedIn (Todo AI App, Infrastructure Web)

- **Jour 4 - Après-midi** : Contact Section et Footer
  - Informations de contact LinkedIn
  - Liens sociaux (GitHub, LinkedIn)
  - Footer professionnel

#### **Phase 1.3 : FONCTIONNALITÉS AVANCÉES (Jours 5-6)**
- **Jour 5 - Matin** : Pages Additionnelles
  - Page descriptive Todo AI App
  - Page de téléchargement
  - Navigation et SEO

- **Jour 5 - Après-midi** : Interface d'Administration LinkedIn
  - Interface d'administration pour le contenu
  - Synchronisation avec l'API LinkedIn
  - Système de versioning

- **Jour 6 - Matin** : Configuration PWA
  - Progressive Web App
  - Service Worker pour cache offline
  - Installation mobile

- **Jour 6 - Après-midi** : Internationalisation (i18n)
  - Support multilingue (FR/EN)
  - Routing multilingue
  - SEO optimisé par langue

#### **Phase 1.4 : OPTIMISATIONS ET QUALITÉ (Jours 7-8)**
- **Jour 7 - Matin** : Accessibilité avancée
  - WCAG 2.1 AA complète
  - Navigation au clavier
  - Screen readers compatibility

- **Jour 7 - Après-midi** : Analytics et Monitoring
  - Google Analytics 4
  - Hotjar pour UX
  - Sentry pour error tracking

- **Jour 8 - Matin** : Optimisations finales
  - Performance Lighthouse 100/100
  - SEO complet
  - Tests cross-browser

#### **Phase 1.5 : DÉPLOIEMENT ET INFRASTRUCTURE (Jours 8-9)**
- **Jour 8 - Après-midi** : Déploiement sur HiveOS Rig
  - Configuration environnement HiveOS
  - Déploiement Next.js
  - Configuration domaine hordearii.ca

- **Jour 9 - Matin** : CI/CD Pipeline pour HiveOS
  - GitHub Actions automatisé
  - Tests automatisés
  - Déploiement automatisé

- **Jour 9 - Après-midi** : Sécurité et Compliance
  - Conformité GDPR
  - Security headers avancés
  - Protection des données

- **Jour 9 - Soir** : Monitoring et Analytics avancé
  - Uptime monitoring
  - Métriques de performance
  - Error alerting

#### **Phase 1.6 : FINALISATION ET RELEASE (Jour 10)**
- **Jour 10 - Matin** : Tests complets et validation
  - Tests de régression
  - Validation performances
  - Tests d'accessibilité

- **Jour 10 - Après-midi** : Documentation et finalisation
  - Documentation technique
  - Guides d'utilisation
  - Release v1.0.0

### **PHASE 2 : BACKEND (10 jours)**

#### **Phase 2.1 : FONDATIONS (Jours 1-2)**
- **Jour 1 - Matin** : Setup initial et configuration
  - Initialisation Node.js avec TypeScript
  - Configuration Express.js
  - Structure des dossiers

- **Jour 1 - Après-midi** : Configuration de la base de données
  - Installation PostgreSQL
  - Configuration Prisma ORM
  - Schéma de base de données

- **Jour 2 - Matin** : Configuration de sécurité de base
  - Middleware de sécurité essentiels
  - Authentification JWT de base
  - Rate limiting

#### **Phase 2.2 : ARCHITECTURE ET SERVICES (Jours 2-4)**
- **Jour 2 - Après-midi** : Middleware et gestion d'erreurs
  - Middleware personnalisés
  - Gestion d'erreurs centralisée
  - Logging avec Winston

- **Jour 3 - Matin** : Services et logique métier
  - Service d'authentification
  - Service utilisateur
  - Service de projets

- **Jour 3 - Après-midi** : Controllers et routes
  - Controllers pour chaque entité
  - Routes API complètes
  - Documentation de base

- **Jour 4 - Matin** : Configuration Nginx et PM2
  - Nginx reverse proxy
  - PM2 process manager
  - Load balancing

#### **Phase 2.3 : FONCTIONNALITÉS AVANCÉES (Jours 4-6)**
- **Jour 4 - Après-midi** : Tests et validation
  - Tests unitaires avec Jest
  - Tests d'intégration
  - Validation sécurité OWASP

- **Jour 5 - Matin** : Cache et Performance
  - Configuration Redis
  - Optimisation performances
  - Database connection pooling

- **Jour 5 - Après-midi** : Email et Notifications
  - Service d'email robuste
  - Templates d'email
  - Notifications push

- **Jour 6 - Matin** : API Documentation
  - Documentation Swagger/OpenAPI
  - Collection Postman
  - API versioning

#### **Phase 2.4 : OPTIMISATIONS ET QUALITÉ (Jours 6-8)**
- **Jour 6 - Après-midi** : Monitoring et logging avancé
  - Prometheus pour métriques
  - Dashboards Grafana
  - Alertes Slack/Email

- **Jour 7 - Matin** : Base de données avancée
  - Migrations automatiques
  - Backup automatisé
  - Monitoring performances DB

- **Jour 7 - Après-midi** : Sécurité avancée
  - Certificate pinning
  - Audit trail complet
  - Détection d'intrusion

- **Jour 8 - Matin** : Optimisations finales
  - Performance globales
  - Sécurité renforcée
  - Tests cross-platform

#### **Phase 2.5 : DÉPLOIEMENT ET INFRASTRUCTURE (Jours 8-9)**
- **Jour 8 - Après-midi** : Déploiement et CI/CD avancé
  - GitHub Actions automatisé
  - Tests automatisés
  - Backups automatisés

- **Jour 9 - Matin** : SSL et Domain Configuration
  - Certificats SSL automatiques
  - Configuration domaine hordearii.ca
  - Performance HTTPS

- **Jour 9 - Après-midi** : Monitoring et Alerting complet
  - Uptime monitoring
  - Métriques de performance
  - Error alerting

- **Jour 9 - Soir** : Sécurité et Compliance
  - Conformité GDPR
  - Security headers avancés
  - Protection des données

#### **Phase 2.6 : FINALISATION ET RELEASE (Jour 10)**
- **Jour 10 - Matin** : Tests complets et validation
  - Tests de régression
  - Validation performances
  - Tests de sécurité

- **Jour 10 - Après-midi** : Documentation et finalisation
  - Documentation API complète
  - Guides d'utilisation
  - Release v1.0.0

### **PHASE 3 : INTÉGRATION ET TESTS FINAUX (5 jours)**

#### **Phase 3.1 : Intégration Frontend-Backend (Jours 1-2)**
- **Jour 1** : Intégration API
  - Tests d'intégration complets
  - Validation des endpoints
  - Optimisation des performances

- **Jour 2** : Tests de charge et performance
  - Load testing
  - Stress testing
  - Optimisation finale

#### **Phase 3.2 : Infrastructure et Déploiement (Jours 3-4)**
- **Jour 3** : Configuration HiveOS finale
  - Setup complet de l'infrastructure
  - Configuration monitoring
  - Tests de déploiement

- **Jour 4** : Tests de production
  - Tests en environnement réel
  - Validation monitoring
  - Optimisations finales

#### **Phase 3.3 : Finalisation (Jour 5)**
- **Jour 5** : Livraison finale
  - Documentation complète
  - Formation utilisateur
  - Handover et support

## 🎯 LIVRABLES

### **1. Code Source**
- Repository Git complet avec historique professionnel
- Documentation technique détaillée
- Tests automatisés complets
- Guide de déploiement étape par étape

### **2. Infrastructure**
- Configuration serveur HiveOS optimisée
- Scripts de déploiement automatisés
- Monitoring Prometheus/Grafana
- Système de backup automatisé

### **3. Documentation**
- Documentation API Swagger/OpenAPI
- Guide utilisateur complet
- Guide administrateur détaillé
- Documentation technique architecturale

## ⚡ PERFORMANCE CIBLE

### **1. Frontend**
- Lighthouse score : 100/100
- First paint < 1s
- TTI < 2s
- Bundle size < 100KB (gzipped)
- PWA installable
- Accessibilité WCAG 2.1 AA

### **2. Backend**
- Réponse API < 100ms
- Uptime > 99.9%
- Rate limit : 100 req/min
- Cache hit ratio > 80%
- Sécurité OWASP compliant

### **3. Infrastructure**
- SSL Grade A+
- Uptime > 99.9%
- Backup quotidien automatisé
- Monitoring 24/7 avec alertes
- Performance optimisée pour HiveOS

## 🔄 MAINTENANCE ET ÉVOLUTION

### **1. Maintenance**
- Mises à jour de sécurité automatiques
- Optimisations performances continues
- Backup réguliers avec rotation
- Monitoring continu avec alertes

### **2. Évolution**
- Nouvelles applications et projets
- Fonctionnalités additionnelles
- Améliorations UX basées sur analytics
- Optimisations SEO continues

## 🧪 TESTS ET QUALITÉ

### **1. Tests Automatisés**
- **Tests unitaires** : Jest/Vitest avec coverage > 80%
- **Tests d'intégration** : Supertest pour API testing
- **Tests E2E** : Playwright pour user journeys
- **Tests de performance** : k6 pour load testing
- **Tests de sécurité** : OWASP ZAP pour vulnerability scanning
- **Tests d'accessibilité** : axe-core pour WCAG compliance

### **2. Qualité du Code**
- **ESLint** avec règles strictes
- **Prettier** pour formatting
- **Husky** pour pre-commit hooks
- **SonarQube** pour code quality
- **TypeScript strict mode**
- **Code coverage** reporting

### **3. Tests de Performance**
- **Lighthouse CI** pour performance monitoring
- **WebPageTest** pour Core Web Vitals
- **k6** pour API load testing
- **Artillery** pour stress testing
- **Performance budgets** définis

### **4. Tests de Sécurité**
- **OWASP ZAP** pour vulnerability scanning
- **Snyk** pour dependency scanning
- **npm audit** pour package vulnerabilities
- **Security headers** testing
- **Penetration testing** planifié

## 🐳 CONTAINERIZATION ET ORCHESTRATION

### **1. Docker Configuration**
- **Dockerfile** optimisé pour production
- **Multi-stage builds** pour optimisation
- **Docker Compose** pour développement
- **Container registry** (GitHub Container Registry)
- **Image scanning** pour sécurité

### **2. Orchestration Ready**
- **Kubernetes manifests** préparés
- **Helm charts** pour déploiement
- **Horizontal Pod Autoscaling**
- **Ingress configuration**
- **Service mesh** ready (Istio)

### **3. Infrastructure as Code**
- **Terraform** pour infrastructure
- **Ansible** pour configuration
- **Cloud native** ready (AWS/GCP/Azure)
- **Infrastructure monitoring**
- **Auto-scaling** configuration

## 🔍 OBSERVABILITÉ AVANCÉE

### **1. Distributed Tracing**
- **Jaeger** pour tracing distribué
- **OpenTelemetry** pour instrumentation
- **Trace correlation** avec logs
- **Performance analysis** par service

### **2. APM (Application Performance Monitoring)**
- **New Relic** ou **DataDog** pour APM
- **Real User Monitoring (RUM)**
- **Business metrics** tracking
- **SLO/SLI** definition et monitoring

### **3. Logging Avancé**
- **Structured logging** avec Winston
- **Log aggregation** (ELK Stack)
- **Log correlation** avec traces
- **Log retention** policies

## 🔐 SÉCURITÉ AVANCÉE

### **1. Secrets Management**
- **HashiCorp Vault** pour secrets
- **Environment-based** secrets
- **Rotation automatique** des clés
- **Access control** pour secrets

### **2. Vulnerability Management**
- **SAST/DAST** scanning automatisé
- **Dependency scanning** avec Snyk
- **Container scanning** avec Trivy
- **Security patching** automatisé

### **3. Zero-Trust Architecture**
- **Identity verification** à chaque requête
- **Least privilege** access
- **Network segmentation**
- **Continuous verification**

## 🌐 API MANAGEMENT

### **1. API Gateway**
- **Kong** ou **AWS API Gateway**
- **Rate limiting** avancé
- **Authentication** centralisée
- **API analytics** et monitoring

### **2. API Strategy**
- **API versioning** strategy
- **GraphQL** support (optionnel)
- **API documentation** interactive
- **API monetization** ready

### **3. API Security**
- **OAuth 2.0** implementation
- **API key management**
- **Request/Response validation**
- **API rate limiting** par utilisateur

## 📊 STANDARDS ENTREPRISE MODERNES

### **✅ ÉLÉMENTS ENTREPRISE STANDARDS PRÉSENTS**

**Gestion de Projet Professionnelle :**
- Git Flow avec branches structurées
- Convention de commits standardisée
- CI/CD Pipeline automatisé
- Code review intégré

**Architecture Moderne :**
- Microservices-ready
- API-first approach
- Database migrations
- Environment management

**Sécurité Enterprise :**
- OWASP compliance
- GDPR compliance
- Certificate pinning
- Audit trail

**Monitoring et Observabilité :**
- Prometheus/Grafana
- Sentry pour error tracking
- Uptime monitoring
- Performance monitoring

### **✅ ÉLÉMENTS MODERNES DU MARCHÉ COUVERTS**

**Technologies Modernes :**
- Next.js 14 (App Router, Server Components)
- TypeScript pour type safety
- Tailwind CSS pour styling moderne
- React Query pour state management

**Performance et SEO :**
- Lighthouse 100/100 target
- Core Web Vitals optimization
- SSR/SSG automatique
- Image optimization

**DevOps et Infrastructure :**
- Containerization ready
- Infrastructure as Code approach
- Automated deployment
- Monitoring et alerting

### **✅ ÉLÉMENTS AJOUTÉS POUR COMPLÉTER**

**Tests et Qualité :**
- Tests unitaires avec Jest/Vitest
- Tests d'intégration avec Supertest
- Tests E2E avec Playwright
- Tests de performance avec k6
- Tests de sécurité avec OWASP ZAP

**Containerization :**
- Dockerfile optimisé
- Multi-stage builds
- Docker Compose
- Kubernetes ready

**Observabilité Avancée :**
- Distributed tracing
- APM (Application Performance Monitoring)
- Real User Monitoring (RUM)
- SLO/SLI definition

**Sécurité Avancée :**
- SAST/DAST scanning
- Dependency vulnerability scanning
- Secrets management
- Zero-trust architecture

## 📝 CONCLUSION

Ce projet démontre une approche professionnelle du développement web moderne avec :
- **Architecture robuste et scalable** : Frontend Next.js + Backend Express.js
- **Sécurité et performance optimales** : Lighthouse 100/100 + OWASP compliant
- **Workflow Git professionnel** : Convention de commits et branches structurées
- **Infrastructure personnelle optimisée** : HiveOS avec monitoring complet
- **Monitoring et maintenance complets** : Prometheus/Grafana + alertes automatiques
- **Développement structuré** : 6 phases frontend + 6 phases backend + intégration
- **Qualité garantie** : Tests automatisés + accessibilité + performance
- **Standards entreprise** : Containerization, Observabilité, Sécurité avancée
- **Technologies modernes** : Next.js 14, TypeScript, Tailwind CSS, React Query
- **DevOps complet** : CI/CD, Infrastructure as Code, Monitoring avancé

---
## 📚 DOCUMENTS DE RÉFÉRENCE

### **Guides (Vision, Architecture, Design, Sécurité, Déploiement)**
- `FRONTEND_DEV_GUIDE.md` - Guide complet du développement frontend
- `BACKEND_DEV_GUIDE.md` - Guide complet du développement backend
- `PROFILE_GUIDE.md` - Guide du profil professionnel (LinkedIn, CV, interviews)
- `GUIDE_DEPLOIEMENT_HIVEOS.md` - Guide spécifique au déploiement HiveOS

### **Plans (Exécution quotidienne, étapes, commandes)**
- `FRONTEND_DEV_PLAN.md` - Plan d'exécution détaillé frontend (phases 1-6)
- `BACKEND_DEV_PLAN.md` - Plan d'exécution détaillé backend (phases 1-6)
- `ORDRE_LOGIQUE_FE_BE.md` - Ordre successif d'exécution FE/BE

### **Références techniques**
- `GLOSSAIRE_TECHNIQUE_MODERNE.md` - Glossaire des technologies et concepts
- `CAHIER_DES_CHARGES.md` - Ce document (spécifications globales)

### **Spécifications Techniques Professionnelles (Niveau Entreprise)**
- `API_SPECIFICATIONS.md` - Spécifications complètes de l'API (OpenAPI/Swagger)
- `ENVIRONMENT_CONFIGURATION.md` - Configuration des environnements et variables
- `TEST_SPECIFICATIONS.md` - Spécifications des tests (unitaires, intégration, E2E)
- `SECURITY_SPECIFICATIONS.md` - Spécifications de sécurité complètes
- `DEPLOYMENT_SPECIFICATIONS.md` - Spécifications de déploiement Docker/PM2
