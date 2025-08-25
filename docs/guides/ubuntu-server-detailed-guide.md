# 🚀 GUIDE DÉTAILLÉ DE DÉPLOIEMENT UBUNTU SERVER - HORDEARII.CA
## Pour Programmeurs en Études

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis et Concepts](#prérequis-et-concepts)
2. [Architecture du Système](#architecture-du-système)
3. [Préparation de l'Environnement](#préparation-de-lenvironnement)
4. [Installation des Outils](#installation-des-outils)
5. [Configuration du Projet](#configuration-du-projet)
6. [Déploiement Docker](#déploiement-docker)
7. [Configuration SSL](#configuration-ssl)
8. [Monitoring et Maintenance](#monitoring-et-maintenance)
9. [Dépannage](#dépannage)
10. [Glossaire Technique](#glossaire-technique)

---

## 🎯 PRÉREQUIS ET CONCEPTS

### **1.1 Ce que vous devez savoir**

**Concepts de base requis :**
- **Linux** : Commandes de base (ls, cd, nano, chmod)
- **SSH** : Connexion à distance sécurisée
- **Docker** : Conteneurisation d'applications
- **Git** : Gestion de versions
- **Réseau** : Ports, DNS, SSL/TLS

**Concepts avancés (optionnels) :**
- **Microservices** : Architecture distribuée
- **Reverse Proxy** : Nginx comme intermédiaire
- **Monitoring** : Surveillance des performances
- **CI/CD** : Intégration et déploiement continu

### **1.2 Matériel nécessaire**

**Ubuntu Server :**
- CPU : 4 cœurs minimum
- RAM : 8GB minimum (16GB recommandé)
- Stockage : 50GB minimum
- Connexion : Internet stable
- OS : Ubuntu Server 20.04+

**Ordinateur de développement :**
- OS : Linux (Debian/Ubuntu recommandé)
- Outils : Terminal, éditeur de code
- Connexion : SSH vers le rig

### **1.3 Architecture générale**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Internet      │    │   Rig HiveOS    │    │   Votre PC      │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   DNS       │ │    │ │   Nginx     │ │    │ │   SSH       │ │
│ │hordearii.ca │ │───▶│ │  Port 80/443│ │◀───│ │  Terminal   │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    │ ┌─────────────┐ │    └─────────────────┘
                       │ │  Frontend   │ │
                       │ │  Port 3000  │ │
                       │ └─────────────┘ │
                       │ ┌─────────────┐ │
                       │ │  Backend    │ │
                       │ │  Port 3001  │ │
                       │ └─────────────┘ │
                       │ ┌─────────────┐ │
                       │ │ PostgreSQL  │ │
                       │ │  Port 5432  │ │
                       │ └─────────────┘ │
                       │ ┌─────────────┐ │
                       │ │   Redis     │ │
                       │ │  Port 6379  │ │
                       │ └─────────────┘ │
                       └─────────────────┘
```

---

## 🏗️ ARCHITECTURE DU SYSTÈME

### **2.1 Stack technologique**

**Frontend :**
- **Next.js** : Framework React pour le rendu côté serveur
- **TypeScript** : Typage statique pour JavaScript
- **Tailwind CSS** : Framework CSS utilitaire
- **PWA** : Application web progressive

**Backend :**
- **Node.js** : Runtime JavaScript côté serveur
- **Express.js** : Framework web minimaliste
- **Prisma** : ORM pour base de données
- **JWT** : Authentification par tokens

**Base de données :**
- **PostgreSQL** : Base de données relationnelle
- **Redis** : Cache en mémoire

**Infrastructure :**
- **Docker** : Conteneurisation
- **Docker Compose** : Orchestration multi-conteneurs
- **Nginx** : Serveur web et reverse proxy
- **Let's Encrypt** : Certificats SSL gratuits

**Monitoring :**
- **Prometheus** : Collecte de métriques
- **Grafana** : Visualisation des données
- **PM2** : Gestionnaire de processus Node.js

### **2.2 Flux de données**

```
1. Utilisateur visite hordearii.ca
   ↓
2. DNS redirige vers l'IP du rig
   ↓
3. Nginx reçoit la requête (port 80/443)
   ↓
4. Nginx redirige vers Frontend (port 3000)
   ↓
5. Frontend fait des appels API vers Backend (port 3001)
   ↓
6. Backend interroge PostgreSQL et Redis
   ↓
7. Réponse remonte la chaîne jusqu'à l'utilisateur
```

---

## 🛠️ PRÉPARATION DE L'ENVIRONNEMENT

### **3.1 Accès au serveur Ubuntu**

**Étape 1 : Trouver l'IP du serveur**
```bash
# Sur le serveur Ubuntu, afficher l'IP
ip addr show

# Ou utiliser
hostname -I
```

**Étape 2 : Vérifier SSH sur Ubuntu Server**
```bash
# SSH est généralement déjà activé sur Ubuntu Server
# Vérifier que SSH fonctionne
systemctl status ssh

# Si SSH n'est pas activé, l'activer
sudo systemctl enable ssh
sudo systemctl start ssh
```

**Étape 3 : Connexion depuis votre PC**
```bash
# Se connecter au serveur (utilisateur non-root)
ssh [utilisateur]@[IP_DU_SERVEUR]

# Exemple :
ssh jiuba@192.168.0.19

# Puis passer en root si nécessaire
sudo su -
```

### **3.2 Configuration SSH avancée**

**Créer une configuration SSH persistante :**
```bash
# Sur votre PC, créer le fichier de config SSH
nano ~/.ssh/config

# Ajouter cette configuration
Host ubuntu-server
    HostName [IP_DU_SERVEUR]
    User [votre_utilisateur]
    Port 22
    ServerAliveInterval 60
    ServerAliveCountMax 3
    Compression yes
    TCPKeepAlive yes
```

**Maintenant vous pouvez vous connecter avec :**
```bash
ssh ubuntu-server
```

### **3.3 Vérification de l'environnement**

```bash
# Vérifier l'OS
uname -a

# Vérifier l'espace disque
df -h

# Vérifier la mémoire
free -h

# Vérifier les processus en cours
ps aux | head -20

# Vérifier les ports ouverts
netstat -tlnp | head -20
```

---

## 📦 INSTALLATION DES OUTILS

### **4.1 Mise à jour du système**

```bash
# Mettre à jour la liste des paquets
apt update

# Mettre à jour les paquets installés
apt upgrade -y

# Installer les outils de base
apt install -y curl wget git nano htop ufw

# Vérifier que sudo est installé (normalement déjà présent sur Ubuntu Server)
which sudo || apt install -y sudo
```

### **4.2 Installation de Docker**

**Méthode officielle :**
```bash
# Télécharger le script d'installation Docker
curl -fsSL https://get.docker.com -o get-docker.sh

# Exécuter le script
sh get-docker.sh

# Ajouter l'utilisateur root au groupe docker
usermod -aG docker root

# Démarrer Docker
systemctl start docker
systemctl enable docker

# Vérifier l'installation
docker --version
docker run hello-world
```

**Vérification :**
```bash
# Vérifier que Docker fonctionne
docker ps

# Vérifier les images disponibles
docker images

# Vérifier les volumes
docker volume ls
```

### **4.3 Installation de Docker Compose**

```bash
# Télécharger Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Rendre le fichier exécutable
chmod +x /usr/local/bin/docker-compose

# Vérifier l'installation
docker-compose --version
```

### **4.4 Installation des outils de sécurité**

```bash
# Installer le firewall
apt install ufw -y

# Configurer le firewall
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3000/tcp
ufw allow 3001/tcp
ufw allow 3002/tcp
ufw allow 9090/tcp

# Activer le firewall
ufw enable

# Vérifier le statut
ufw status
```

### **4.5 Installation de Certbot (SSL)**

```bash
# Installer Certbot pour Let's Encrypt
apt install certbot python3-certbot-nginx -y

# Vérifier l'installation
certbot --version
```

---

## ⚙️ CONFIGURATION DU PROJET

### **5.1 Transfert du code source**

**Méthode 1 : Git (Recommandée)**
```bash
# Créer le dossier de travail
mkdir -p /var/www/hordearii
cd /var/www/hordearii

# Cloner le repository
git clone https://github.com/votre-username/jobcv.git .

# Vérifier les fichiers
ls -la
```

**Méthode 2 : SCP (depuis votre PC)**
```bash
# Depuis votre PC, transférer les fichiers
scp -r /chemin/vers/votre/projet/* hiveos-rig:/var/www/hordearii/
```

**Méthode 3 : rsync (synchronisation)**
```bash
# Depuis votre PC, synchroniser les fichiers
rsync -avz --exclude 'node_modules' --exclude '.git' /chemin/vers/votre/projet/ hiveos-rig:/var/www/hordearii/
```

### **5.2 Configuration des variables d'environnement**

```bash
# Aller dans le dossier du projet
cd /var/www/hordearii

# Créer le fichier .env
nano .env
```

**Contenu du fichier .env :**
```env
# ===== CONFIGURATION DE BASE =====
NODE_ENV=production
DOMAIN=hordearii.ca

# ===== BASE DE DONNÉES =====
DATABASE_URL=postgresql://profile_user:votre_mot_de_passe_securise@postgres:5432/profilejd
POSTGRES_DB=profilejd
POSTGRES_USER=profile_user
POSTGRES_PASSWORD=votre_mot_de_passe_securise

# ===== REDIS CACHE =====
REDIS_URL=redis://redis:6379

# ===== AUTHENTIFICATION =====
JWT_SECRET=votre_jwt_secret_tres_securise_au_moins_32_caracteres
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=votre_refresh_secret_tres_securise_au_moins_32_caracteres

# ===== EMAIL (optionnel) =====
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASSWORD=votre_mot_de_passe_app

# ===== ANALYTICS (optionnel) =====
GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# ===== MONITORING =====
GRAFANA_PASSWORD=votre_mot_de_passe_grafana_securise

# ===== SÉCURITÉ =====
CORS_ORIGIN=https://hordearii.ca
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
```

### **5.3 Configuration Nginx pour le domaine**

```bash
# Éditer la configuration Nginx
nano nginx/nginx.conf
```

**Configuration complète :**
```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    # Basic Settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 100M;

    # Gzip Settings
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

    # Upstream Definitions
    upstream frontend {
        server frontend:3000;
        keepalive 32;
    }

    upstream backend {
        server backend:3001;
        keepalive 32;
    }

    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name hordearii.ca www.hordearii.ca;
        
        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    # Main HTTPS server
    server {
        listen 443 ssl http2;
        server_name hordearii.ca www.hordearii.ca;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/hordearii.ca.crt;
        ssl_certificate_key /etc/nginx/ssl/hordearii.ca.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Security Headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
        add_header X-Frame-Options DENY always;
        add_header X-Content-Type-Options nosniff always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.hordearii.ca;" always;

        # Frontend (Next.js)
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 86400;
        }
        
        # Backend API
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 86400;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # Static file caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            proxy_pass http://frontend;
        }

        # Security: Deny access to hidden files
        location ~ /\. {
            deny all;
            access_log off;
            log_not_found off;
        }
    }
}
```

---

## 🐳 DÉPLOIEMENT DOCKER

### **6.1 Vérification de la configuration Docker**

```bash
# Vérifier que docker-compose.yml existe
ls -la docker-compose.yml

# Vérifier la syntaxe du fichier
docker-compose config
```

### **6.2 Premier déploiement**

```bash
# Aller dans le dossier du projet
cd /var/www/hordearii

# Donner les permissions d'exécution au script de déploiement
chmod +x deploy.sh

# Lancer le déploiement
./deploy.sh
```

**Ce que fait le script deploy.sh :**
1. Vérifie les prérequis (Docker, fichiers)
2. Arrête les containers existants
3. Nettoie les images obsolètes
4. Construit les nouvelles images
5. Démarre les services
6. Vérifie la santé des services
7. Affiche les logs

### **6.3 Vérification du déploiement**

```bash
# Vérifier l'état des containers
docker-compose ps

# Vérifier les logs
docker-compose logs -f

# Tester les services individuellement
curl http://localhost:3000
curl http://localhost:3001/health
curl http://localhost:80/health
```

### **6.4 Gestion des services**

```bash
# Démarrer tous les services
docker-compose up -d

# Arrêter tous les services
docker-compose down

# Redémarrer un service spécifique
docker-compose restart [service_name]

# Voir les logs d'un service spécifique
docker-compose logs -f [service_name]

# Reconstruire un service
docker-compose build [service_name]
docker-compose up -d [service_name]
```

---

## 🔒 CONFIGURATION SSL

### **7.1 Préparation pour Let's Encrypt**

```bash
# Créer le dossier SSL
mkdir -p nginx/ssl

# Arrêter temporairement Nginx pour libérer le port 80
docker-compose stop nginx
```

### **7.2 Obtention des certificats SSL**

```bash
# Obtenir le certificat SSL avec Certbot
certbot certonly --standalone -d hordearii.ca -d www.hordearii.ca

# Vérifier que les certificats ont été créés
ls -la /etc/letsencrypt/live/hordearii.ca/
```

### **7.3 Installation des certificats**

```bash
# Copier les certificats vers le dossier Nginx
cp /etc/letsencrypt/live/hordearii.ca/fullchain.pem nginx/ssl/hordearii.ca.crt
cp /etc/letsencrypt/live/hordearii.ca/privkey.pem nginx/ssl/hordearii.ca.key

# Vérifier les permissions
chmod 644 nginx/ssl/hordearii.ca.crt
chmod 600 nginx/ssl/hordearii.ca.key

# Redémarrer Nginx
docker-compose start nginx
```

### **7.4 Configuration du renouvellement automatique**

```bash
# Éditer le crontab
crontab -e

# Ajouter cette ligne pour le renouvellement automatique
0 12 * * * /usr/bin/certbot renew --quiet && cp /etc/letsencrypt/live/hordearii.ca/fullchain.pem /var/www/hordearii/nginx/ssl/hordearii.ca.crt && cp /etc/letsencrypt/live/hordearii.ca/privkey.pem /var/www/hordearii/nginx/ssl/hordearii.ca.key && cd /var/www/hordearii && docker-compose restart nginx
```

### **7.5 Test du certificat SSL**

```bash
# Tester la configuration SSL
openssl s_client -connect hordearii.ca:443 -servername hordearii.ca

# Tester avec curl
curl -I https://hordearii.ca

# Vérifier la redirection HTTP vers HTTPS
curl -I http://hordearii.ca
```

---

## 📊 MONITORING ET MAINTENANCE

### **8.1 Accès aux outils de monitoring**

**Grafana (Dashboards) :**
```bash
# URL d'accès
http://[IP_DU_RIG]:3002

# Identifiants par défaut
Username: admin
Password: [votre_mot_de_passe_grafana]
```

**Prometheus (Métriques) :**
```bash
# URL d'accès
http://[IP_DU_RIG]:9090
```

### **8.2 Scripts de maintenance**

**Script de backup :**
```bash
# Créer le script de backup
nano /var/www/hordearii/backup.sh
```

**Contenu du script :**
```bash
#!/bin/bash

# Configuration
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/hordearii"
PROJECT_DIR="/var/www/hordearii"

# Créer le dossier de backup
mkdir -p $BACKUP_DIR

echo "🔄 Début du backup..."

# Backup de la base de données
echo "📊 Backup de la base de données..."
docker-compose exec -T postgres pg_dump -U profile_user profilejd > $BACKUP_DIR/db_$DATE.sql

# Backup des fichiers du projet
echo "📁 Backup des fichiers..."
tar -czf $BACKUP_DIR/files_$DATE.tar.gz $PROJECT_DIR

# Backup des certificats SSL
echo "🔒 Backup des certificats SSL..."
cp -r /etc/letsencrypt/live/hordearii.ca $BACKUP_DIR/ssl_$DATE

# Nettoyer les anciens backups (garder 7 jours)
echo "🧹 Nettoyage des anciens backups..."
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "ssl_*" -mtime +7 -exec rm -rf {} \;

echo "✅ Backup terminé: $BACKUP_DIR"
echo "📦 Fichiers créés:"
ls -la $BACKUP_DIR | grep $DATE
```

**Script de mise à jour :**
```bash
# Créer le script de mise à jour
nano /var/www/hordearii/update.sh
```

**Contenu du script :**
```bash
#!/bin/bash

# Configuration
PROJECT_DIR="/var/www/hordearii"
LOG_FILE="/var/log/hordearii/update.log"

# Créer le dossier de logs
mkdir -p /var/log/hordearii

echo "🚀 Début de la mise à jour..." | tee -a $LOG_FILE

# Aller dans le dossier du projet
cd $PROJECT_DIR

# Sauvegarder avant mise à jour
echo "💾 Sauvegarde avant mise à jour..." | tee -a $LOG_FILE
./backup.sh >> $LOG_FILE 2>&1

# Pull des dernières modifications
echo "📥 Récupération des dernières modifications..." | tee -a $LOG_FILE
git pull origin main >> $LOG_FILE 2>&1

# Redéployer
echo "🐳 Redéploiement des services..." | tee -a $LOG_FILE
./deploy.sh >> $LOG_FILE 2>&1

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..." | tee -a $LOG_FILE
sleep 30

# Vérifier la santé des services
echo "🏥 Vérification de la santé des services..." | tee -a $LOG_FILE

# Test API
if curl -f https://hordearii.ca/api/health > /dev/null 2>&1; then
    echo "✅ API en ligne" | tee -a $LOG_FILE
else
    echo "❌ API hors ligne" | tee -a $LOG_FILE
fi

# Test Frontend
if curl -f https://hordearii.ca > /dev/null 2>&1; then
    echo "✅ Frontend en ligne" | tee -a $LOG_FILE
else
    echo "❌ Frontend hors ligne" | tee -a $LOG_FILE
fi

echo "🎉 Mise à jour terminée!" | tee -a $LOG_FILE
```

**Script de monitoring :**
```bash
# Créer le script de monitoring
nano /var/www/hordearii/status.sh
```

**Contenu du script :**
```bash
#!/bin/bash

echo "=== ÉTAT DES SERVICES HORDEARII ==="
echo ""

echo "🐳 Containers Docker:"
docker-compose ps

echo ""
echo "💾 Utilisation disque:"
df -h | grep -E "(Filesystem|/dev/)"

echo ""
echo "🧠 Utilisation mémoire:"
free -h

echo ""
echo "🌐 Services web:"
echo -n "Frontend: "
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
echo ""

echo -n "Backend: "
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health
echo ""

echo -n "Nginx: "
curl -s -o /dev/null -w "%{http_code}" http://localhost:80/health
echo ""

echo ""
echo "📈 Monitoring:"
echo -n "Grafana: "
curl -s -o /dev/null -w "%{http_code}" http://localhost:3002
echo ""

echo -n "Prometheus: "
curl -s -o /dev/null -w "%{http_code}" http://localhost:9090
echo ""

echo ""
echo "🔒 SSL:"
echo -n "Certificat SSL: "
if openssl x509 -checkend 86400 -noout -in nginx/ssl/hordearii.ca.crt > /dev/null 2>&1; then
    echo "✅ Valide"
else
    echo "❌ Expiré ou invalide"
fi
```

### **8.3 Rendre les scripts exécutables**

```bash
# Rendre tous les scripts exécutables
chmod +x backup.sh
chmod +x update.sh
chmod +x status.sh
```

### **8.4 Configuration du démarrage automatique**

```bash
# Créer un service systemd
nano /etc/systemd/system/hordearii.service
```

**Contenu du service :**
```ini
[Unit]
Description=Hordearii.ca Docker Compose
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/var/www/hordearii
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

**Activer le service :**
```bash
# Recharger systemd
systemctl daemon-reload

# Activer le service
systemctl enable hordearii.service

# Démarrer le service
systemctl start hordearii.service

# Vérifier le statut
systemctl status hordearii.service
```

---

## 🔧 DÉPANNAGE

### **9.1 Problèmes courants**

**Problème : Container ne démarre pas**
```bash
# Vérifier les logs du container
docker-compose logs [service_name]

# Vérifier l'état du container
docker-compose ps

# Redémarrer le container
docker-compose restart [service_name]

# Reconstruire le container
docker-compose build --no-cache [service_name]
docker-compose up -d [service_name]
```

**Problème : Erreur de base de données**
```bash
# Vérifier la connexion à PostgreSQL
docker-compose exec postgres psql -U profile_user -d profilejd -c "SELECT 1;"

# Vérifier les logs PostgreSQL
docker-compose logs postgres

# Redémarrer PostgreSQL
docker-compose restart postgres
```

**Problème : Erreur SSL**
```bash
# Vérifier les certificats
ls -la nginx/ssl/

# Renouveler les certificats
certbot renew

# Copier les nouveaux certificats
cp /etc/letsencrypt/live/hordearii.ca/fullchain.pem nginx/ssl/hordearii.ca.crt
cp /etc/letsencrypt/live/hordearii.ca/privkey.pem nginx/ssl/hordearii.ca.key

# Redémarrer Nginx
docker-compose restart nginx
```

**Problème : Site inaccessible**
```bash
# Vérifier les ports ouverts
netstat -tlnp | grep -E "(80|443|3000|3001)"

# Vérifier le firewall
ufw status

# Tester la connectivité locale
curl http://localhost:3000
curl http://localhost:3001/health

# Vérifier les logs Nginx
docker-compose logs nginx
```

### **9.2 Commandes de diagnostic**

```bash
# Vérifier l'utilisation des ressources
htop

# Vérifier l'espace disque
df -h

# Vérifier la mémoire
free -h

# Vérifier les processus
ps aux | grep -E "(node|nginx|postgres)"

# Vérifier les logs système
journalctl -f

# Vérifier la configuration Docker
docker-compose config
```

### **9.3 Rollback en cas de problème**

```bash
# Arrêter tous les services
docker-compose down

# Restaurer depuis un backup
cd /var/backups/hordearii
tar -xzf files_YYYYMMDD_HHMMSS.tar.gz -C /

# Restaurer la base de données
docker-compose up -d postgres
sleep 10
docker-compose exec -T postgres psql -U profile_user -d profilejd < db_YYYYMMDD_HHMMSS.sql

# Redémarrer les services
docker-compose up -d
```

---

## 📚 GLOSSAIRE TECHNIQUE

### **10.1 Termes Docker**

- **Container** : Instance isolée d'une application
- **Image** : Modèle pour créer des containers
- **Volume** : Stockage persistant pour les containers
- **Network** : Communication entre containers
- **Dockerfile** : Instructions pour créer une image
- **docker-compose.yml** : Configuration multi-containers

### **10.2 Termes Web**

- **Reverse Proxy** : Serveur qui redirige les requêtes
- **SSL/TLS** : Protocoles de chiffrement
- **DNS** : Système de noms de domaine
- **HTTP/HTTPS** : Protocoles de communication web
- **API** : Interface de programmation d'application
- **PWA** : Application web progressive

### **10.3 Termes Monitoring**

- **Prometheus** : Collecte de métriques
- **Grafana** : Visualisation de données
- **Health Check** : Vérification de santé d'un service
- **Logs** : Journaux d'événements
- **Metrics** : Mesures de performance
- **Alerting** : Système d'alertes

### **10.4 Termes Sécurité**

- **JWT** : JSON Web Token pour l'authentification
- **CORS** : Cross-Origin Resource Sharing
- **Rate Limiting** : Limitation de débit
- **Firewall** : Pare-feu réseau
- **Certificate Pinning** : Épinglage de certificats
- **Obfuscation** : Masquage du code

---

## 🎯 CONCLUSION

Ce guide vous a fourni toutes les informations nécessaires pour déployer hordearii.ca sur votre rig HiveOS. 

**Points clés à retenir :**
1. **Préparation** : Vérifiez tous les prérequis avant de commencer
2. **Sécurité** : Configurez toujours SSL et un firewall
3. **Monitoring** : Surveillez vos services régulièrement
4. **Backup** : Faites des sauvegardes automatiques
5. **Maintenance** : Mettez à jour régulièrement votre système

**Prochaines étapes :**
1. Déployez votre site
2. Configurez le monitoring
3. Testez tous les fonctionnalités
4. Documentez vos procédures
5. Planifiez la maintenance

**Ressources utiles :**
- [Documentation Docker](https://docs.docker.com/)
- [Documentation Nginx](https://nginx.org/en/docs/)
- [Documentation Let's Encrypt](https://letsencrypt.org/docs/)
- [Documentation Prometheus](https://prometheus.io/docs/)
- [Documentation Grafana](https://grafana.com/docs/)

Bonne chance avec votre déploiement ! 🚀
