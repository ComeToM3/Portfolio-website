# 🚀 GUIDE DE DÉPLOIEMENT HIVEOS - HORDEARII.CA

## 🎯 Vue d'ensemble du processus

Le déploiement sur HiveOS nécessite plusieurs étapes pour transformer votre rig de minage en serveur web fonctionnel. Voici le processus complet :

## 📋 PRÉREQUIS

### **1. Infrastructure HiveOS**
- Rig de minage HiveOS fonctionnel
- Connexion SSH activée
- Accès root ou sudo
- Au moins 4GB RAM disponible
- Espace disque suffisant (20GB minimum)

### **2. Domaine et DNS**
- Nom de domaine hordearii.ca acheté
- Accès au panneau de gestion DNS
- Certificats SSL (Let's Encrypt)

### **3. Code source**
- Application Next.js compilée
- Backend Express.js prêt
- Configuration PM2
- Scripts de déploiement

---

## 🛠 ÉTAPE 1 : PRÉPARATION DE L'ENVIRONNEMENT HIVEOS

### **1.1 Accès SSH au rig**
```bash
# Se connecter à votre rig HiveOS
ssh root@[IP_DE_VOTRE_RIG]

# Vérifier l'environnement
uname -a
df -h
free -h
```

### **1.2 Installation des dépendances système**
```bash
# Mettre à jour le système
apt update && apt upgrade -y

# Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Installer Nginx
apt install nginx -y

# Installer PM2 globalement
npm install -g pm2

# Installer Redis (pour le cache)
apt install redis-server -y

# Installer PostgreSQL
apt install postgresql postgresql-contrib -y

# Vérifier les installations
node --version
npm --version
nginx -v
pm2 --version
```

### **1.3 Configuration du firewall**
```bash
# Installer ufw si pas présent
apt install ufw -y

# Configurer le firewall
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3000/tcp  # Port de développement
ufw enable
```

---

## 🗄 ÉTAPE 2 : CONFIGURATION DE LA BASE DE DONNÉES

### **2.1 Configuration PostgreSQL**
```bash
# Passer en utilisateur postgres
sudo -u postgres psql

# Créer la base de données et l'utilisateur
CREATE DATABASE hordearii_db;
CREATE USER hordearii_user WITH ENCRYPTED PASSWORD 'votre_mot_de_passe_securise';
GRANT ALL PRIVILEGES ON DATABASE hordearii_db TO hordearii_user;
\q

# Tester la connexion
psql -h localhost -U hordearii_user -d hordearii_db
```

### **2.2 Configuration Redis**
```bash
# Éditer la configuration Redis
nano /etc/redis/redis.conf

# Modifier les paramètres
bind 127.0.0.1
port 6379
maxmemory 256mb
maxmemory-policy allkeys-lru

# Redémarrer Redis
systemctl restart redis
systemctl enable redis
```

---

## 📁 ÉTAPE 3 : TRANSFERT DU CODE SOURCE

### **3.1 Méthode 1 : Git (Recommandée)**
```bash
# Créer le dossier de l'application
mkdir -p /var/www/hordearii
cd /var/www/hordearii

# Cloner votre repository
git clone https://github.com/votre-username/hordearii-website.git frontend
git clone https://github.com/votre-username/hordearii-backend.git backend

# Installer les dépendances
cd frontend
npm install
npm run build

cd ../backend
npm install
```

### **3.2 Méthode 2 : Transfert USB (Alternative)**
```bash
# Monter la clé USB
mkdir /mnt/usb
mount /dev/sdb1 /mnt/usb

# Copier les fichiers
cp -r /mnt/usb/hordearii-website /var/www/hordearii/frontend
cp -r /mnt/usb/hordearii-backend /var/www/hordearii/backend

# Installer les dépendances
cd /var/www/hordearii/frontend
npm install
npm run build

cd /var/www/hordearii/backend
npm install

# Démonter la clé USB
umount /mnt/usb
```

---

## ⚙ ÉTAPE 4 : CONFIGURATION DES APPLICATIONS

### **4.1 Configuration Frontend (Next.js)**
```bash
# Créer le fichier de configuration production
nano /var/www/hordearii/frontend/.env.production

# Contenu du fichier .env.production
NEXT_PUBLIC_API_URL=https://api.hordearii.ca
NEXT_PUBLIC_SITE_URL=https://hordearii.ca
NEXTAUTH_SECRET=votre_secret_tres_securise
NEXTAUTH_URL=https://hordearii.ca
```

### **4.2 Configuration Backend (Express.js)**
```bash
# Créer le fichier de configuration production
nano /var/www/hordearii/backend/.env

# Contenu du fichier .env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://hordearii_user:votre_mot_de_passe_securise@localhost:5432/hordearii_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=votre_jwt_secret_tres_securise
FRONTEND_URL=https://hordearii.ca
```

### **4.3 Configuration PM2**
```bash
# Créer le fichier ecosystem.config.js
nano /var/www/hordearii/ecosystem.config.js

# Contenu du fichier
module.exports = {
  apps: [
    {
      name: 'hordearii-backend',
      cwd: '/var/www/hordearii/backend',
      script: 'dist/server.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/hordearii/backend-error.log',
      out_file: '/var/log/hordearii/backend-out.log',
      log_file: '/var/log/hordearii/backend-combined.log',
      time: true
    },
    {
      name: 'hordearii-frontend',
      cwd: '/var/www/hordearii/frontend',
      script: 'npm',
      args: 'start',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/hordearii/frontend-error.log',
      out_file: '/var/log/hordearii/frontend-out.log',
      log_file: '/var/log/hordearii/frontend-combined.log',
      time: true
    }
  ]
};
```

---

## 🌐 ÉTAPE 5 : CONFIGURATION NGINX

### **5.1 Configuration du reverse proxy**
```bash
# Créer la configuration Nginx
nano /etc/nginx/sites-available/hordearii

# Contenu de la configuration
server {
    listen 80;
    server_name hordearii.ca www.hordearii.ca;
    
    # Redirection vers HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name hordearii.ca www.hordearii.ca;
    
    # Configuration SSL (sera ajoutée par Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/hordearii.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hordearii.ca/privkey.pem;
    
    # Headers de sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
}
```

### **5.2 Activer la configuration**
```bash
# Créer le lien symbolique
ln -s /etc/nginx/sites-available/hordearii /etc/nginx/sites-enabled/

# Tester la configuration
nginx -t

# Redémarrer Nginx
systemctl restart nginx
systemctl enable nginx
```

---

## 🔒 ÉTAPE 6 : CONFIGURATION SSL (LET'S ENCRYPT)

### **6.1 Installation Certbot**
```bash
# Installer Certbot
apt install certbot python3-certbot-nginx -y

# Obtenir le certificat SSL
certbot --nginx -d hordearii.ca -d www.hordearii.ca

# Tester le renouvellement automatique
certbot renew --dry-run
```

### **6.2 Configuration du renouvellement automatique**
```bash
# Ajouter au crontab
crontab -e

# Ajouter cette ligne
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🚀 ÉTAPE 7 : DÉMARRAGE DES APPLICATIONS

### **7.1 Préparer les logs**
```bash
# Créer le dossier de logs
mkdir -p /var/log/hordearii
chown -R www-data:www-data /var/log/hordearii
```

### **7.2 Démarrer avec PM2**
```bash
# Aller dans le dossier du projet
cd /var/www/hordearii

# Démarrer les applications
pm2 start ecosystem.config.js

# Sauvegarder la configuration PM2
pm2 save

# Configurer le démarrage automatique
pm2 startup
```

### **7.3 Vérifier le statut**
```bash
# Vérifier les processus
pm2 status

# Vérifier les logs
pm2 logs

# Vérifier les ports
netstat -tlnp | grep :300
```

---

## 📊 ÉTAPE 8 : CONFIGURATION DNS

### **8.1 Configuration des enregistrements DNS**
Dans votre panneau de gestion DNS, ajoutez :

```
Type: A
Name: @
Value: [IP_DE_VOTRE_RIG]

Type: A
Name: www
Value: [IP_DE_VOTRE_RIG]

Type: CNAME
Name: api
Value: hordearii.ca
```

### **8.2 Vérification DNS**
```bash
# Vérifier la propagation DNS
nslookup hordearii.ca
dig hordearii.ca
```

---

## 🔍 ÉTAPE 9 : TESTS ET VÉRIFICATIONS

### **9.1 Tests de connectivité**
```bash
# Tester le frontend
curl -I https://hordearii.ca

# Tester l'API
curl -I https://hordearii.ca/api/health

# Tester SSL
openssl s_client -connect hordearii.ca:443 -servername hordearii.ca
```

### **9.2 Tests de performance**
```bash
# Installer Apache Bench
apt install apache2-utils -y

# Tester les performances
ab -n 1000 -c 10 https://hordearii.ca/
```

---

## 📈 ÉTAPE 10 : MONITORING ET MAINTENANCE

### **10.1 Configuration du monitoring**
```bash
# Installer les outils de monitoring
apt install htop iotop nethogs -y

# Configurer les alertes
# (À configurer selon vos besoins)
```

### **10.2 Scripts de maintenance**
```bash
# Créer un script de backup
nano /var/www/hordearii/backup.sh

# Contenu du script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/hordearii"

mkdir -p $BACKUP_DIR

# Backup de la base de données
pg_dump hordearii_db > $BACKUP_DIR/db_$DATE.sql

# Backup des fichiers
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/hordearii

# Nettoyer les anciens backups (garder 7 jours)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

---

## 🚨 DÉPANNAGE

### **Problèmes courants**

**1. Application ne démarre pas**
```bash
# Vérifier les logs
pm2 logs

# Vérifier les ports
netstat -tlnp | grep :300

# Redémarrer les services
pm2 restart all
```

**2. Erreurs SSL**
```bash
# Renouveler le certificat
certbot renew

# Vérifier la configuration Nginx
nginx -t
systemctl restart nginx
```

**3. Problèmes de base de données**
```bash
# Vérifier le statut PostgreSQL
systemctl status postgresql

# Tester la connexion
psql -h localhost -U hordearii_user -d hordearii_db
```

---

## 📝 CHECKLIST DE DÉPLOIEMENT

- [ ] Environnement HiveOS préparé
- [ ] Node.js et dépendances installés
- [ ] Base de données configurée
- [ ] Code source transféré
- [ ] Variables d'environnement configurées
- [ ] PM2 configuré
- [ ] Nginx configuré
- [ ] SSL configuré
- [ ] DNS configuré
- [ ] Applications démarrées
- [ ] Tests effectués
- [ ] Monitoring configuré

---

## 🎯 RÉSULTAT FINAL

Après ces étapes, vous aurez :
- ✅ Site web accessible sur https://hordearii.ca
- ✅ API backend fonctionnelle
- ✅ SSL sécurisé
- ✅ Monitoring en place
- ✅ Backup automatisé
- ✅ Performance optimisée

Votre rig HiveOS est maintenant un serveur web professionnel !
