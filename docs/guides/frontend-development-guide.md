# 🚀 GUIDE DE DÉVELOPPEMENT - HORDEARII.CA

## 🎯 Vue d'ensemble du projet

**Site web portfolio professionnel moderne** avec Next.js et Tailwind CSS pour héberger votre profil tech avec section applications.

### **Objectifs :**
- ✅ **Portfolio professionnel** moderne avec stack technique avancée
- ✅ **Reprise des éléments ** pour édition et mise à jour facile
- ✅ **Section applications** avec pages descriptives
- ✅ **Présentation de vos compétences** tech et soft skills
- ✅ **Design épuré** mais impactant avec Tailwind CSS
- ✅ **Performance optimée** avec Next.js (Lighthouse 100/100)
- ✅ **SEO-friendly** avec SSR/SSG automatique
- ✅ **Déploiement auto‑hébergé** sur rig HiveOS Standard (Docker + Nginx + PM2)

---
## ✅ CONFORMITÉ OPEN-SOURCE ET STANDARDS INDUSTRIE

Technologies choisies, ouvertes et couramment utilisées en production:
- Frontend: **Next.js 14** (MIT), **React 18** (MIT), **TypeScript** (Apache-2.0), **Tailwind CSS** (MIT), **Framer Motion** (MIT)
- Data/API: **Axios** (MIT), **TanStack React Query** (MIT), **next-intl** (MIT)
- Analytics/Monitoring: **Google Analytics 4** (hébergé), alternatives self-hosted: **Matomo** (GPL-3.0), **Umami** (MIT), **Plausible** (AGPL-3.0); **Sentry SDK** (MIT); **Prometheus** (Apache-2.0), **Grafana** (AGPL-3.0), **Uptime Kuma** (MIT)
- Serveur/Infra: **Node.js** (OpenJS), **Docker** (Apache-2.0), **Nginx** (BSD-2-Clause), **PM2** (AGPL-3.0)
- Base de données/cache (si backend): **PostgreSQL** (PostgreSQL License), **Redis** (BSD-3-Clause)

Ces choix sont standards et largement adoptés par l’industrie.

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
## 🖥️ HÉBERGEMENT HIVEOS STANDARD + DOCKER

### **1. Configuration de l'infrastructure :**
- **Rig de minage** : Utilisation de votre infrastructure existante
- **HiveOS Standard** : Système d'exploitation pour minage + serveur
- **Docker Engine** : Containerization pour isolation et gestion
- **Ressources** : CPU/GPU disponibles pour le web hosting
- **Réseau** : Configuration réseau pour le domaine

### **2. Stack technique sur HiveOS Standard :**
- **Docker Engine** : Containerization et orchestration
- **Docker Compose** : Multi-container management
- **Node.js** : Runtime JavaScript sur le rig (containerisé)
- **PM2** : Process manager pour orchestration des containers
- **Nginx** : Reverse proxy et load balancer (containerisé)
- **SSL/TLS** : Certificats Let's Encrypt automatiques
- **Monitoring** : Prometheus/Grafana pour surveillance

### **3. Avantages de l'hébergement personnel :**
- **Contrôle total** : Infrastructure sous votre contrôle
- **Coût optimisé** : Utilisation des ressources existantes
- **Performance** : Optimisation pour vos besoins spécifiques
- **Sécurité** : Contrôle complet de la sécurité
- **Flexibilité** : Personnalisation complète de l'environnement

---
## 📋 GESTION DU CONTENU 

### **1. Synchronisation  :**
- **Profil ** : Source de vérité pour le contenu
- **Mise à jour automatique** : Synchronisation périodique
- **Édition facile** : Interface d'administration pour modifier le contenu
- **Versioning** : Historique des modifications

### **2. Éléments repris de  :**
- **Informations personnelles** : Nom, titre, localisation
- **Expérience professionnelle** : Postes, entreprises, descriptions
- **Formation** : Diplômes, certifications, institutions
- **Compétences** : Skills validés et endorsements
- **Publications** : Articles et posts 
- **Recommandations** : Témoignages et références
- **Projets** : Réalisations documentées

### **3. Interface d'administration :**
- **Dashboard admin** : Gestion du contenu
- **Édition en temps réel** : Modification directe
- **Prévisualisation** : Aperçu des changements
- **Synchronisation** : Mise à jour depuis 
- **Backup** : Sauvegarde du contenu

---
## 🏗 ARCHITECTURE TECHNIQUE

### **Stack technologique moderne :**
- **Next.js 14** : Framework React avec SSR/SSG automatique
- **React 18** : Composants modernes et hooks
- **TypeScript** : Typage statique pour code robuste
- **Tailwind CSS** : CSS utility-first pour design rapide
- **Framer Motion** : Animations fluides et professionnelles
- **Axios + React Query** : Gestion des API et cache
- **next-intl** : Internationalisation
- **PWA** : Progressive Web App
- **Analytics** : GA4, Hotjar, Sentry
- **CI/CD** : GitHub Actions
- **Security** : CSP, HSTS, GDPR compliance
- **Monitoring** : Uptime, performance, error alerting
- **HiveOS Rig** : Hébergement sur votre infrastructure de minage

### **Structure des fichiers :**
```
hordearii-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── skills/page.tsx
│   │   │   └── projects/page.tsx
│   │   ├── hordearii-app/page.tsx
│   │   └── download/page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Navigation.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Contact.tsx
│   │   ├── admin/
│   │   │   ├── ProfileEditor.tsx
│   │   │   ├── SkillsEditor.tsx
│   │   │   ├── ProjectsEditor.tsx
│   │   │   └── Sync.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   └── projects.ts
│   │   ├── /
│   │   │   ├── sync.ts
│   │   │   ├── profile.ts
│   │   │   └── skills.ts
│   │   ├── analytics/
│   │   │   ├── ga4.ts
│   │   │   ├── hotjar.ts
│   │   │   └── sentry.ts
│   │   ├── i18n/
│   │   │   ├── locales/
│   │   │   │   ├── fr.json
│   │   │   │   └── en.json
│   │   │   └── config.ts
│   │   ├── security/
│   │   │   ├── csp.ts
│   │   │   ├── gdpr.ts
│   │   │   └── cookies.ts
│   │   └── monitoring/
│   │       ├── uptime.ts
│   │       ├── performance.ts
│   │       └── alerts.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── public/
│   ├── images/
│   ├── icons/
│   ├── manifest.json
│   └── sw.js
├── hiveos/
│   ├── ecosystem.config.js
│   ├── nginx.conf
│   └── deploy.sh
├── tailwind.config.js
├── next.config.js
├── package.json
└── tsconfig.json
```

---
## 🎨 DESIGN SYSTEM & THÈME

### **Palette de couleurs (Tailwind) :**
- **Bleu tech moderne** : blue-600, blue-700 pour l'identité tech
- **Vert durable** : emerald-500, emerald-600 pour l'aspect écologique
- **Orange créatif** : amber-500, amber-600 pour la créativité
- **Neutres** : gray-50 à gray-900 pour les textes et arrière-plans
- **États** : green-500 (succès), yellow-500 (attention), red-500 (erreur)

### **Typographie (Tailwind) :**
- **Police principale** : Inter (Google Fonts) via Tailwind
- **Hiérarchie** : text-xs à text-6xl avec font-weight
- **Responsive** : text-sm md:text-base lg:text-lg
- **Poids** : font-light à font-bold

### **Espacement (Tailwind) :**
- **Système cohérent** : p-1 à p-16, m-1 à m-16
- **Responsive** : p-4 md:p-6 lg:p-8
- **Grilles** : gap-4, gap-6, gap-8 pour l'espacement

---
## 📱 COMPOSANTS MODULAIRES

### **1. Header/Navigation (Next.js Component)**
**Fonctionnalités :**
- Navigation fixe avec backdrop-blur
- Logo et branding Hordearii
- Menu responsive avec Framer Motion
- Liens vers toutes les sections
- Bouton spécial pour la section applications
- Dark mode toggle optionnel

**Contenu :**
- Logo et nom du site
- Liens : À propos, Compétences, Projets, Contact
- Bouton CTA pour l'application mobile (Phase 2)
- Menu hamburger animé pour mobile
- Smooth scrolling avec react-scroll

### **2. Hero Section (Next.js Component)**
**Fonctionnalités :**
- Layout en deux colonnes avec Tailwind Grid
- Gradient de fond avec Tailwind
- Typographie impactante responsive
- Boutons d'action avec hover effects
- Image optimisée avec Next.js Image
- Animations d'entrée avec Framer Motion

**Contenu (profil professionnel) :**
- Titre principal : "Johan Dominguez"
- Sous-titre : "Développeur Junior Full-Stack"
- Description : "Kinésiologue • Musicien • Athlète"
- Boutons : "Voir mes projets" et "Voir mes applications"
- Photo de profil professionnelle optimisée
- Localisation : "Montréal, Québec, Canada"

### **3. About Section (Next.js Component)**
**Fonctionnalités :**
- Section avec titre centré et Tailwind
- Grille de highlights responsive
- Icônes emoji pour chaque point
- Animations au scroll avec Framer Motion
- Design cards modernes avec Tailwind
- Intersection Observer pour animations

**Contenu (profil professionnel) :**
- Introduction : "JUNIOR TECH UNIQUE"
- Highlight 1 : "15+ années musicien" avec icône 🎵
- Highlight 2 : "Athlète déterminé" avec icône 🏃‍♂️
- Highlight 3 : "Pâtissier professionnel" avec icône 🍰
- Descriptions détaillées du parcours professionnel
- Résumé professionnel unique

### **4. Skills Section (Next.js Component)**
**Fonctionnalités :**
- Grille de catégories avec Tailwind Grid
- Barres de progression animées avec Framer Motion
- Niveaux de compétence visuels
- Animations au scroll avec Intersection Observer
- Design cards avec Tailwind shadows
- Progress bars avec gradients Tailwind

**Contenu (compétences professionnelles) :**
- Catégorie "Développement Web" : HTML5, CSS3, JavaScript
- Catégorie "Développement Mobile" : Flutter, Dart
- Catégorie "Infrastructure" : Linux, HiveOS, Web Server
- Niveaux basés sur l'expertise réelle
- Compétences validées par l'expérience
- Évaluation personnelle des compétences

### **5. Projects Section (Next.js Component)**
**Fonctionnalités :**
- Grille de cartes avec Tailwind Grid responsive
- Images optimisées avec Next.js Image
- Tags technologiques avec Tailwind badges
- Boutons d'action avec hover effects
- Effets hover élégants avec Framer Motion
- Lazy loading des images

**Contenu (projets professionnels) :**
- Projet 1 : "Portfolio Hordearii" avec screenshot optimisé
- Projet 2 : "Infrastructure Web" avec image
- Technologies : Tags colorés pour chaque tech
- Actions : "En savoir plus" et "Télécharger"
- Descriptions détaillées des projets
- Réalisations documentées

### **6. Contact Section (Next.js Component)**
**Fonctionnalités :**
- Informations de contact claires avec Tailwind
- Liens sociaux avec hover effects
- Icônes pour chaque type de contact
- Design épuré et accessible
- Animations d'entrée avec Framer Motion

**Contenu (informations de contact) :**
- Email : johan_dominguez@hotmail.com
- Téléphone : (514) 777-1269
- Localisation : Montréal, Québec, Canada
- Liens sociaux : GitHub et 
- Icônes emoji pour chaque élément
- Informations de contact professionnelles

### **7. Footer (Next.js Component)**
**Fonctionnalités :**
- Logo et branding avec Tailwind
- Liens de navigation avec hover effects
- Copyright
- Design simple et professionnel
- Responsive layout

**Contenu :**
- Logo Hordearii
- Texte : "Développeur Junior Full-Stack • Montréal"
- Liens de navigation
- Copyright : "© 2024 Johan Dominguez"

### **8. API Integration (Next.js Services)**
**Fonctionnalités :**
- Configuration Axios avec intercepteurs
- Gestion d'état avec React Query
- Authentification JWT côté client
- Gestion des erreurs API
- Cache intelligent des requêtes

**Structure :**
- **apiClient.ts** : Configuration Axios
- **authService.ts** : Gestion authentification
- **projectService.ts** : Appels API projets
- **contactService.ts** : Envoi formulaires
- **queryClient.ts** : Configuration React Query

### **9. PWA Configuration (Next.js PWA)**
**Fonctionnalités :**
- Manifest.json avec métadonnées complètes
- Service Worker pour cache offline
- Installation sur mobile
- Splash screen personnalisé
- Notifications push (optionnel)

**Configuration :**
- **manifest.json** : Métadonnées PWA
- **sw.js** : Service Worker
- **Icons** : 192x192, 512x512, maskable
- **Theme colors** : Couleurs cohérentes
- **Display** : standalone

### **10. Analytics & Monitoring (Next.js Analytics)**
**Fonctionnalités :**
- Google Analytics 4 intégré
- Hotjar pour heatmaps UX
- Sentry pour error tracking
- Performance monitoring (self-hosted dashboards)
- User behavior analytics

**Configuration :**
- **GA4** : Tracking des événements
- **Hotjar** : Heatmaps et recordings
- **Sentry** : Error monitoring
- **Self-hosted dashboards** : Grafana/Prometheus
- **Custom events** : Tracking spécifique

### **11. Accessibility (Next.js A11y)**
**Fonctionnalités :**
- Navigation au clavier complète
- ARIA labels et descriptions
- Contrastes WCAG 2.1 AA
- Screen reader compatibility
- Focus management

**Implémentation :**
- **Keyboard navigation** : Tab, Enter, Escape
- **ARIA attributes** : Labels, descriptions, roles
- **Color contrast** : Minimum 4.5:1
- **Screen reader** : NVDA, JAWS, VoiceOver
- **Focus indicators** : Visible focus rings

### **12. Internationalization (Next.js i18n)**
**Fonctionnalités :**
- Support français et anglais
- Routing multilingue
- Traductions dynamiques
- SEO optimisé par langue
- Language switcher

**Configuration :**
- **Locales** : fr, en
- **Routing** : /fr/, /en/
- **Translations** : JSON files
- **SEO** : Meta tags par langue
- **Fallback** : Gestion des traductions manquantes

### **13. CI/CD Pipeline (Next.js Deployment)**
**Fonctionnalités :**
- GitHub Actions automatisé
- Tests automatisés
- Build optimization
- Deployment strategies
- Rollback procedures

**Configuration :**
- **Workflows** : CI/CD automatisé
- **Environnements** : dev/staging/prod
- **Cache** : Build cache optimization
- **Security** : Security scanning
- **Monitoring** : Deployment monitoring

### **14. Security et Compliance (Next.js Security)**
**Fonctionnalités :**
- GDPR compliance
- Cookie consent
- Security headers
- Privacy policy
- Legal requirements

**Configuration :**
- **CSP** : Content Security Policy
- **HSTS** : HTTP Strict Transport Security
- **Cookies** : Consent management
- **Privacy** : Data retention policies
- **Legal** : Terms of service, privacy policy

### **15. Monitoring avancé (Next.js Monitoring)**
**Fonctionnalités :**
- Uptime monitoring
- Performance metrics
- Error alerting
- User analytics
- Real-time dashboards

**Configuration :**
- **Uptime** : Service monitoring
- **Performance** : Core Web Vitals
- **Errors** : Sentry integration
- **Analytics** : User behavior tracking
- **Alerts** : Slack/Email notifications

### **16. Déploiement HiveOS Standard + Docker (Next.js Containerisé)**
**Fonctionnalités :**
- Déploiement sur rig de minage avec Docker
- Configuration Docker Engine sur HiveOS Standard
- Docker Compose pour multi-containers
- PM2 pour orchestration des containers
- Nginx reverse proxy (containerisé)
- SSL automatique avec Let's Encrypt
- Monitoring Prometheus/Grafana (containerisé)

**Configuration :**
- **HiveOS Standard** : Infrastructure de minage + serveur
- **Docker Engine** : Containerization et isolation
- **Docker Compose** : Multi-container orchestration
- **PM2** : Process manager pour orchestration containers
- **Nginx** : Reverse proxy et load balancer (containerisé)
- **SSL** : Certificats automatiques
- **Monitoring** : Surveillance infrastructure personnelle

---
## 🎨 STYLES ET DESIGN (TAILWIND CSS)

### **1. Configuration Tailwind**
**Caractéristiques :**
- Configuration personnalisée dans tailwind.config.js
- Variables CSS pour couleurs et espacement
- Typographie Google Fonts Inter intégrée
- Container responsive avec max-width
- Boutons avec hover effects Tailwind

**Éléments :**
- Classes utilitaires Tailwind
- Variables pour couleurs, polices, espacement
- Container centré avec padding responsive
- Boutons primaires et secondaires avec Tailwind
- Transitions fluides avec Tailwind

### **2. Styles des composants (Tailwind)**
**Header :**
- Position fixe avec backdrop-blur
- Navigation flex avec espacement Tailwind
- Menu mobile avec toggle animé
- Liens avec hover effects Tailwind

**Hero :**
- Gradient de fond avec Tailwind
- Grid layout responsive avec Tailwind
- Typographie blanche impactante
- Image avec border-radius et shadow Tailwind

**Skills :**
- Grille responsive avec Tailwind Grid
- Cards avec ombres Tailwind
- Barres de progression animées
- Espacement cohérent avec Tailwind

**Projects :**
- Grille de cards responsive avec Tailwind
- Images optimisées avec Next.js Image
- Tags technologiques avec Tailwind badges
- Hover effects avec Tailwind et Framer Motion

### **3. Design responsive (Tailwind)**
**Mobile (sm: 640px et moins) :**
- Navigation en menu hamburger
- Hero en une colonne centrée
- Grilles en une colonne
- Boutons empilés verticalement

**Tablet (md: 768px et plus) :**
- Hero en deux colonnes
- Grilles de projets en deux colonnes
- Navigation horizontale visible

**Desktop (lg: 1024px et plus) :**
- Grilles de projets en trois colonnes
- Grilles de compétences en deux colonnes
- Espacement optimisé

**Large Desktop (xl: 1280px et plus) :**
- Container max-width avec Tailwind
- Espacement généreux
- Optimisations visuelles

---
## ⚡ INTERACTIVITÉ ET ANIMATIONS (FRAMER MOTION)

### **1. Navigation et scrolling**
**Fonctionnalités :**
- Smooth scrolling avec react-scroll
- Navigation mobile avec Framer Motion
- Header avec backdrop blur
- Liens actifs avec indicateurs
- Animations de page transitions

**Comportements :**
- Scroll fluide vers les sections
- Menu mobile animé qui s'ouvre/ferme
- Header qui reste visible avec animations
- Liens qui changent de couleur au hover
- Transitions de page fluides

### **2. Animations au scroll (Framer Motion)**
**Fonctionnalités :**
- Intersection Observer avec Framer Motion
- Animations fadeInUp pour les éléments
- Animations décalées pour les listes
- Skill bars animées avec Framer Motion
- Stagger animations pour les grilles

**Comportements :**
- Éléments qui apparaissent progressivement
- Skill bars qui se remplissent avec animations
- Cards qui montent légèrement
- Effets de stagger pour les listes
- Animations fluides et professionnelles

### **3. Effets hover (Framer Motion + Tailwind)**
**Fonctionnalités :**
- Boutons qui se soulèvent avec Framer Motion
- Cards de projets qui montent
- Liens qui changent de couleur
- Ombres qui s'intensifient
- Micro-interactions fluides

**Comportements :**
- Transform translateY pour les boutons
- Box-shadow qui augmente avec Tailwind
- Couleurs qui changent avec Tailwind
- Transitions fluides avec Framer Motion
- Feedback visuel immédiat

---

---
## 🧰 PLAYBOOK DÉPLOIEMENT (DOCKER + NGINX + PM2)

Note: les fichiers ci-dessous sont des modèles (templates). Ils seront créés et versionnés pendant la **PHASE 5** (déploiement), pas avant.

### 1) Script de déploiement Docker `hiveos/deploy.sh` (modèle)
```bash
#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/hordearii
DOCKER_COMPOSE_FILE=$APP_DIR/docker-compose.yml
LOG_DIR=/var/log/hordearii

mkdir -p "$LOG_DIR"

# 1. Pull du code (Git)
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" pull --rebase
fi

# 2. Build et déploiement Docker
cd "$APP_DIR"
docker-compose -f "$DOCKER_COMPOSE_FILE" build --no-cache
docker-compose -f "$DOCKER_COMPOSE_FILE" up -d

# 3. Vérifications des containers
docker-compose -f "$DOCKER_COMPOSE_FILE" ps
docker-compose -f "$DOCKER_COMPOSE_FILE" logs --tail=50

# 4. Health checks
curl -I localhost:3000 || true
curl -I localhost:3001 || true
curl -I localhost:80 || true
```

### 2) Configuration Docker Compose `hiveos/docker-compose.yml` (modèle)
```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    container_name: hordearii-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: hordearii-frontend
    environment:
      - NODE_ENV=production
      - PORT=3000
    ports:
      - "3000:3000"
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: hordearii-backend
    environment:
      - NODE_ENV=production
      - PORT=3001
      - DATABASE_URL=postgresql://user:password@postgres:5432/hordearii
      - REDIS_URL=redis://redis:6379
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    container_name: hordearii-postgres
    environment:
      - POSTGRES_DB=hordearii
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: hordearii-redis
    restart: unless-stopped

  prometheus:
    image: prom/prometheus:latest
    container_name: hordearii-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    container_name: hordearii-grafana
    ports:
      - "3002:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
    restart: unless-stopped

volumes:
  postgres_data:
  grafana_data:
```

### 3) Configuration PM2 `hiveos/ecosystem.config.js` (modèle)
```javascript
module.exports = {
  apps: [
    {
      name: 'hordearii-frontend',
      cwd: '/var/www/hordearii/frontend',
      script: 'npm', args: 'start',
      instances: 2, exec_mode: 'cluster',
      env: { NODE_ENV: 'production', PORT: 3000 },
      error_file: '/var/log/hordearii/frontend-error.log',
      out_file: '/var/log/hordearii/frontend-out.log',
      time: true
    },
    {
      name: 'hordearii-backend',
      cwd: '/var/www/hordearii/backend',
      script: 'dist/server.js',
      instances: 2, exec_mode: 'cluster',
      env: { NODE_ENV: 'production', PORT: 3001 },
      error_file: '/var/log/hordearii/backend-error.log',
      out_file: '/var/log/hordearii/backend-out.log',
      time: true
    }
  ]
}
```

### 4) Configuration Nginx `hiveos/nginx.conf` (modèle)
```nginx
server {
    listen 80;
    server_name hordearii.ca www.hordearii.ca;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name hordearii.ca www.hordearii.ca;

    ssl_certificate /etc/letsencrypt/live/hordearii.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hordearii.ca/privkey.pem;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' https: data: blob: 'unsafe-inline'" always;

    location / { proxy_pass http://localhost:3000; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; }
    location /api/ { proxy_pass http://localhost:3001/; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; }

    gzip on; gzip_vary on; gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
```

Checklist rapide:
- Créer ces fichiers en **PHASE 5** puis les **versionner** dans le repo (`/hiveos/...`)
- Installer Docker sur HiveOS Standard: `curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh`
- Installer Docker Compose: `sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose`
- Déployer: `cd /var/www/hordearii && ./hiveos/deploy.sh`
- Exécuter `deploy.sh` à chaque release

---
## 📊 ANALYTICS POUR SITE DE PROFIL (REMPLACER VERCEL ANALYTICS)

Objectif: mesurer la visibilité et l’engagement sans alourdir le site ni violer la vie privée.

### 1) Web analytics (comportement utilisateur)
- Option 1 (hébergé): **Google Analytics 4** (pageviews, events CTA, sorties vers GitHub/)
- Option 2 (self‑hosted): **Matomo** ou **Umami/Plausible (self‑hosted)** pour respect vie privée

Implémentation (recommandé minimal):
- Pageviews automatiques + events:
  - CTA “Télécharger l’app”, “Voir GitHub/”, “Contact”
  - Scroll depth sur la page d’accueil
- Anonymisation IP + consentement cookies (bannière) si GA4/Hotjar

### 2) UX/Heatmaps (optionnel)
- **Hotjar** (hébergé) pour heatmaps et feedback widgets
- Alternative self‑hosted: **PostHog**

Usage: activer sur 1-2 pages clés (Home, Application Mobile) pour limiter le poids

### 3) Error tracking
- **Sentry** (frontend + backend) pour erreurs en production
- Alertes e‑mail/Slack sur erreurs 5xx/JS uncaught

### 4) Metrics serveur et uptime (self‑hosted)
- **Prometheus + Grafana**: dashboards Core Web Vitals côté backend (via logs Nginx) + ressources (CPU, RAM)
- **docker_exporter / node_exporter / nginx_exporter** sur le rig
- **Container monitoring**: health checks, resource usage, logs
- **Uptime Kuma**: ping HTTP/SSL et alertes e‑mail/Slack

### 5) Plan d’implémentation (Next.js)
- Intégrer GA4 via `@next/third-parties` (tag global) + events CTA
- Ajouter Sentry SDK Next.js (DSN secret) pour erreurs
- Déployer Uptime Kuma et exporters (Docker containers) sur HiveOS Standard
- Créer dashboards Grafana (panels: requêtes/min, 4xx/5xx, latence, CPU/RAM, free disk)
- Mettre en place consentement cookies (bannière) si GA4/Hotjar

KPI essentiels pour un site de profil:
- Visites uniques, pays, source de trafic
- Click‑through sur “Télécharger”, “GitHub”, “”, “Contact”
- Temps sur page / scroll depth (hero → projects → contact)
- Erreurs JS et 5xx, disponibilité (SLA personnel ≥ 99.5%)

---
## 🎯 RÉSULTAT ATTENDU

Un site web moderne, responsive et professionnel qui :

**Présentation professionnelle :**
- Design épuré mais impactant avec Tailwind CSS
- Navigation fluide et intuitive avec Next.js
- Typographie claire et hiérarchisée
- Couleurs cohérentes avec votre identité

**Contenu optimisé :**
- Présentation claire de votre profil
- Mise en avant de vos projets (Portfolio Hordearii)
- Démonstration visuelle de vos compétences
- Informations de contact facilement accessibles

**Fonctionnalités techniques :**
- Responsive design pour tous les appareils
- Performance optimisée et chargement rapide (< 2s)
- SEO-friendly avec SSR/SSG automatique
- Accessibilité respectée (ARIA, contrastes)

**Expérience utilisateur :**
- Animations fluides et engageantes avec Framer Motion
- Navigation intuitive et logique
- Call-to-action clairs pour les applications
- Contact facile et professionnel

**💼 VALEUR AJOUTÉE POUR VOTRE CARRIÈRE :**
- **Portfolio différenciant** avec stack moderne
- **Gestion de contenu** autonome et professionnelle
- **Interface d'administration** pour édition facile
- **Compétences full-stack** démontrées
- **Performance optimale** (Lighthouse 100/100)
- **SEO moderne** pour visibilité maximale
- **PWA** pour expérience mobile native
- **Accessibilité** WCAG 2.1 AA complète
- **Internationalisation** multilingue
- **Analytics** et monitoring professionnels
- **Hébergement personnel** sur infrastructure HiveOS
- **Code maintenable** et scalable

**Le site sera votre vitrine professionnelle par excellence, reflétant parfaitement votre profil unique et vos compétences exceptionnelles avec une stack technique moderne et recherchée, incluant toutes les bonnes pratiques de l'industrie !**

---
## 🎨 Guide de Développement Frontend - HORDEARII.CA

## 📋 Vue d'ensemble
Guide complet pour le développement frontend du portfolio professionnel de Johan Dominguez, utilisant Next.js 15, TypeScript, Tailwind CSS et les meilleures pratiques modernes.

---

## 🚀 Configuration Initiale

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git
- VS Code (recommandé)

### Installation et Setup
```bash
# Créer le projet Next.js
npx create-next-app@latest hordearii-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Installer les dépendances de base
npm install framer-motion react-scroll @types/react-scroll lucide-react

# Installer les dépendances API
npm install axios @tanstack/react-query @tanstack/react-query-devtools
```

---

## 🛠️ Configuration et Erreurs Courantes

### Erreurs TypeScript et Solutions

#### 1. Erreur `@typescript-eslint/no-explicit-any`
**Problème :** ESLint interdit l'utilisation du type `any`

**Solution :** Remplacer `any` par des types appropriés

```typescript
// ❌ Incorrect
trackEvent: async (event: string, data?: any) => {
  // ...
}

// ✅ Correct
trackEvent: async (event: string, data?: Record<string, unknown>) => {
  // ...
}
```

#### 2. Erreur dans React Query Provider
**Problème :** Type `any` dans la fonction retry

**Solution :** Utiliser le type casting approprié

```typescript
// ❌ Incorrect
retry: (failureCount, error: any) => {
  if (error?.response?.status >= 400) {
    // ...
  }
}

// ✅ Correct
retry: (failureCount, error: unknown) => {
  const axiosError = error as { response?: { status?: number } };
  if (axiosError?.response?.status && axiosError.response.status >= 400) {
    // ...
  }
}
```

#### 3. Warnings Metadata Next.js 15
**Problème :** Warnings sur viewport et themeColor dans metadata

**Solution :** Utiliser l'export `viewport` séparé

```typescript
// ✅ Correct - Next.js 15
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

### Configuration GitHub Repository

#### 1. Créer le Repository
1. Aller sur [GitHub.com](https://github.com)
2. Cliquer sur "New repository" (bouton vert)
3. Configurer :
   - **Repository name :** `hordearii-website`
   - **Description :** `Portfolio professionnel de Johan Dominguez - Développeur Full Stack, Musicien, Athlète et Pâtissier`
   - **Visibilité :** Public ou Private
   - **Ne pas initialiser** avec README, .gitignore, ou license

#### 2. Configurer le Remote
```bash
# Ajouter le remote
git remote add origin https://github.com/ComeToM3/Portfolio-website.git

# Renommer la branche principale
git branch -M main

# Pousser le code
git push -u origin main
```

#### 3. Vérification
```bash
# Vérifier les remotes
git remote -v

# Vérifier le statut
git status
```

---

## 🏗️ Architecture du Projet

### Structure des Dossiers
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── layout/           # Composants de layout
│   ├── sections/         # Sections du portfolio
│   └── ui/               # Composants UI réutilisables
├── lib/                  # Utilitaires et configurations
│   ├── api/              # Configuration API
│   └── providers/        # Providers React
└── types/                # Types TypeScript
```

### Configuration API
- **Axios** : Client HTTP avec intercepteurs
- **React Query** : Gestion d'état et cache
- **Services** : Couche d'abstraction pour les appels API

---

## 🎯 Bonnes Pratiques

### TypeScript
- ✅ Utiliser des types stricts
- ✅ Éviter `any`, préférer `unknown` ou types spécifiques
- ✅ Utiliser les interfaces pour les objets
- ✅ Typer les props des composants

### Performance
- ✅ Utiliser `next/image` pour l'optimisation des images
- ✅ Implémenter le lazy loading
- ✅ Optimiser les bundles avec le code splitting
- ✅ Utiliser React Query pour le cache intelligent

### Accessibilité
- ✅ Utiliser les balises sémantiques
- ✅ Ajouter les attributs ARIA
- ✅ Tester avec les screen readers
- ✅ Respecter les contrastes WCAG

### SEO
- ✅ Configurer les meta tags
- ✅ Utiliser les balises Open Graph
- ✅ Optimiser les images avec alt text
- ✅ Structurer les données avec JSON-LD

---

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
npm run type-check   # Vérification TypeScript
```

---

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Query](https://tanstack.com/query/latest)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

## 🚨 Dépannage

### Problèmes Courants

#### Build échoue
```bash
# Nettoyer le cache
rm -rf .next
npm run build
```

#### Erreurs de types
```bash
# Vérifier les types
npm run type-check

# Régénérer les types Next.js
npx next build
```

#### Problèmes de dépendances
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Notes de Développement

### Conventions de Nommage
- **Composants :** PascalCase (`Header.tsx`)
- **Fichiers :** kebab-case (`api-services.ts`)
- **Variables :** camelCase (`userName`)
- **Constantes :** UPPER_SNAKE_CASE (`API_BASE_URL`)

### Commits
- **Format :** `feat: description` ou `fix: description`
- **Exemple :** `feat: Implémentation de la section Hero`

### Tests
- Tester sur différents navigateurs
- Vérifier la responsivité
- Tester l'accessibilité
- Valider les performances

---
## 🌐 Internationalisation (i18n) - Solution Personnalisée

### Vue d'ensemble
Le projet utilise un système de traductions personnalisé plutôt que `next-intl` pour une meilleure fiabilité et simplicité.

### Architecture de l'i18n

#### 1. Structure des URLs
```
/fr - Contenu en français (locale par défaut)
/en - Contenu en anglais
```

#### 2. Hook personnalisé `useTranslations`
```typescript
// src/lib/i18n/useTranslations.ts
import { useParams } from 'next/navigation';

const messages = {
  fr: {
    hero: { /* traductions françaises */ },
    navigation: { /* traductions françaises */ },
    about: { /* traductions françaises */ },
    skills: { /* traductions françaises */ },
    projects: { /* traductions françaises */ },
    contact: { /* traductions françaises */ }
  },
  en: {
    hero: { /* traductions anglaises */ },
    navigation: { /* traductions anglaises */ },
    about: { /* traductions anglaises */ },
    skills: { /* traductions anglaises */ },
    projects: { /* traductions anglaises */ },
    contact: { /* traductions anglaises */ }
  }
};

export function useTranslations(namespace: string) {
  const params = useParams();
  const locale = params?.locale as string || 'fr';
  
  const t = (key: string) => {
    const namespaceMessages = messages[locale as keyof typeof messages]?.[namespace as keyof typeof messages.fr];
    return namespaceMessages?.[key as keyof typeof namespaceMessages] || key;
  };
  
  return t;
}
```

#### 3. Configuration Next.js
```typescript
// next.config.ts - Configuration minimale
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // Configuration de base uniquement
  }
};

export default nextConfig;
```

#### 4. Layout avec support des locales
```typescript
// src/app/[locale]/layout.tsx
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });
const locales = ['en', 'fr'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    return null;
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
```

#### 5. Utilisation dans les composants
```typescript
// Dans Hero.tsx, Header.tsx, etc.
import { useTranslations } from '@/lib/i18n/useTranslations';

const Hero = () => {
  const t = useTranslations('hero');
  
  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('cta_primary')}</button>
    </section>
  );
};
```

### Avantages de cette approche

1. **Simplicité** : Pas de dépendances externes complexes
2. **Fiabilité** : Contrôle total sur les traductions
3. **Performance** : Pas de surcharge de plugins
4. **Maintenabilité** : Code centralisé et facile à comprendre
5. **Flexibilité** : Facile d'ajouter de nouvelles langues

### Gestion des traductions

#### Ajouter une nouvelle langue
1. Ajouter la locale dans le tableau `locales`
2. Ajouter les traductions dans l'objet `messages`
3. Tester les URLs avec la nouvelle locale

#### Ajouter de nouvelles traductions
1. Ajouter les clés dans l'objet `messages` pour chaque langue
2. Utiliser `t('nouvelle_cle')` dans les composants
3. Vérifier que les traductions s'affichent correctement

### Commandes de test
```bash
# Tester les URLs
curl -I http://localhost:3000/fr
curl -I http://localhost:3000/en

# Nettoyer le cache si nécessaire
rm -rf .next
npm run dev
```

### Dépannage
Voir le guide de dépannage complet : `docs/guides/troubleshooting-guide.md`

---
