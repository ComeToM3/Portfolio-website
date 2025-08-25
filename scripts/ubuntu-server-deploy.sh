#!/bin/bash

# 🚀 SCRIPT DE DÉPLOIEMENT AUTOMATISÉ UBUNTU SERVER - HORDEARII.CA
# Pour Programmeurs en Études

set -e

# Configuration
PROJECT_NAME="hordearii"
PROJECT_DIR="/var/www/hordearii"
DOMAIN="hordearii.ca"
BACKUP_DIR="/var/backups/hordearii"
LOG_FILE="/var/log/hordearii/deploy.log"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonctions de logging
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a $LOG_FILE
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a $LOG_FILE
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
}

log_step() {
    echo -e "${PURPLE}[STEP]${NC} $1" | tee -a $LOG_FILE
}

# Fonction pour créer les dossiers nécessaires
create_directories() {
    log_info "Création des dossiers nécessaires..."
    mkdir -p $PROJECT_DIR
    mkdir -p $BACKUP_DIR
    mkdir -p /var/log/hordearii
    mkdir -p $PROJECT_DIR/nginx/ssl
    log_success "Dossiers créés avec succès"
}

# Fonction pour vérifier les prérequis
check_prerequisites() {
    log_step "Vérification des prérequis..."
    
    # Vérifier que nous sommes root ou avons sudo
    if [[ $EUID -ne 0 ]]; then
        if command -v sudo &> /dev/null; then
            log_info "Utilisation de sudo pour les commandes privilégiées"
            SUDO_CMD="sudo"
        else
            log_error "Ce script doit être exécuté en tant que root ou avec sudo disponible"
            exit 1
        fi
    else
        SUDO_CMD=""
    fi
    
    # Vérifier l'espace disque
    DISK_SPACE=$(df / | awk 'NR==2 {print $4}')
    if [ $DISK_SPACE -lt 10485760 ]; then # 10GB en KB
        log_error "Espace disque insuffisant. Minimum 10GB requis."
        exit 1
    fi
    
    # Vérifier la mémoire
    MEMORY=$(free -m | awk 'NR==2{printf "%.0f", $2}')
    if [ $MEMORY -lt 4096 ]; then # 4GB
        log_warning "Mémoire faible détectée. 4GB minimum recommandé."
    fi
    
    log_success "Prérequis vérifiés"
}

# Fonction pour installer Docker
install_docker() {
    log_step "Installation de Docker..."
    
    if command -v docker &> /dev/null; then
        log_info "Docker est déjà installé"
        docker --version
    else
        log_info "Installation de Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        $SUDO_CMD systemctl start docker
        $SUDO_CMD systemctl enable docker
        $SUDO_CMD usermod -aG docker $USER
        log_success "Docker installé avec succès"
    fi
}

# Fonction pour installer Docker Compose
install_docker_compose() {
    log_step "Installation de Docker Compose..."
    
    if command -v docker-compose &> /dev/null; then
        log_info "Docker Compose est déjà installé"
        docker-compose --version
    else
        log_info "Installation de Docker Compose..."
        $SUDO_CMD curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        $SUDO_CMD chmod +x /usr/local/bin/docker-compose
        log_success "Docker Compose installé avec succès"
    fi
}

# Fonction pour installer les outils système
install_system_tools() {
    log_step "Installation des outils système..."
    
    $SUDO_CMD apt update
    $SUDO_CMD apt install -y curl wget git nano htop ufw certbot python3-certbot-nginx
    
    log_success "Outils système installés"
}

# Fonction pour configurer le firewall
configure_firewall() {
    log_step "Configuration du firewall..."
    
    $SUDO_CMD ufw allow ssh
    $SUDO_CMD ufw allow 80/tcp
    $SUDO_CMD ufw allow 443/tcp
    $SUDO_CMD ufw allow 3000/tcp
    $SUDO_CMD ufw allow 3001/tcp
    $SUDO_CMD ufw allow 3002/tcp
    $SUDO_CMD ufw allow 9090/tcp
    
    echo "y" | $SUDO_CMD ufw enable
    
    log_success "Firewall configuré"
}

# Fonction pour transférer le projet
transfer_project() {
    log_step "Transfert du projet..."
    
    cd $PROJECT_DIR
    
    # Demander la méthode de transfert
    echo -e "${CYAN}Choisissez la méthode de transfert :${NC}"
    echo "1. Git (recommandé)"
    echo "2. SCP depuis votre PC"
    echo "3. Copier depuis un dossier local"
    
    read -p "Votre choix (1-3): " transfer_method
    
    case $transfer_method in
        1)
            log_info "Méthode Git sélectionnée"
            read -p "URL du repository Git: " git_url
            git clone $git_url .
            ;;
        2)
            log_info "Méthode SCP sélectionnée"
            log_warning "Veuillez transférer les fichiers depuis votre PC avec :"
            echo "scp -r /chemin/vers/votre/projet/* root@[IP_DU_RIG]:$PROJECT_DIR/"
            read -p "Appuyez sur Entrée une fois les fichiers transférés..."
            ;;
        3)
            log_info "Méthode copie locale sélectionnée"
            read -p "Chemin vers le dossier du projet: " local_path
            cp -r $local_path/* .
            ;;
        *)
            log_error "Choix invalide"
            exit 1
            ;;
    esac
    
    log_success "Projet transféré"
}

# Fonction pour configurer les variables d'environnement
configure_environment() {
    log_step "Configuration des variables d'environnement..."
    
    cd $PROJECT_DIR
    
    # Créer le fichier .env
    cat > .env << EOF
# ===== CONFIGURATION DE BASE =====
NODE_ENV=production
DOMAIN=$DOMAIN

# ===== BASE DE DONNÉES =====
DATABASE_URL=postgresql://profile_user:$(openssl rand -base64 32)@postgres:5432/profilejd
POSTGRES_DB=profilejd
POSTGRES_USER=profile_user
POSTGRES_PASSWORD=$(openssl rand -base64 32)

# ===== REDIS CACHE =====
REDIS_URL=redis://redis:6379

# ===== AUTHENTIFICATION =====
JWT_SECRET=$(openssl rand -base64 64)
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=$(openssl rand -base64 64)

# ===== MONITORING =====
GRAFANA_PASSWORD=$(openssl rand -base64 32)

# ===== SÉCURITÉ =====
CORS_ORIGIN=https://$DOMAIN
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100
EOF
    
    log_success "Variables d'environnement configurées"
}

# Fonction pour configurer Nginx
configure_nginx() {
    log_step "Configuration de Nginx..."
    
    cd $PROJECT_DIR
    
    # Créer la configuration Nginx
    cat > nginx/nginx.conf << 'EOF'
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

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 100M;

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

    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

    upstream frontend {
        server frontend:3000;
        keepalive 32;
    }

    upstream backend {
        server backend:3001;
        keepalive 32;
    }

    server {
        listen 80;
        server_name hordearii.ca www.hordearii.ca;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name hordearii.ca www.hordearii.ca;

        ssl_certificate /etc/nginx/ssl/hordearii.ca.crt;
        ssl_certificate_key /etc/nginx/ssl/hordearii.ca.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
        add_header X-Frame-Options DENY always;
        add_header X-Content-Type-Options nosniff always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

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

        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            proxy_pass http://frontend;
        }

        location ~ /\. {
            deny all;
            access_log off;
            log_not_found off;
        }
    }
}
EOF
    
    log_success "Nginx configuré"
}

# Fonction pour déployer avec Docker
deploy_docker() {
    log_step "Déploiement Docker..."
    
    cd $PROJECT_DIR
    
    # Vérifier que docker-compose.yml existe
    if [ ! -f "docker-compose.yml" ]; then
        log_error "docker-compose.yml non trouvé"
        exit 1
    fi
    
    # Arrêter les containers existants
    docker-compose down --remove-orphans 2>/dev/null || true
    
    # Nettoyer les images obsolètes
    docker image prune -f
    
    # Construire et démarrer les services
    docker-compose build --no-cache
    docker-compose up -d
    
    # Attendre que les services soient prêts
    log_info "Attente du démarrage des services..."
    sleep 30
    
    log_success "Déploiement Docker terminé"
}

# Fonction pour configurer SSL
configure_ssl() {
    log_step "Configuration SSL..."
    
    cd $PROJECT_DIR
    
    # Arrêter Nginx temporairement
    docker-compose stop nginx
    
    # Obtenir les certificats SSL
    log_info "Obtention des certificats SSL..."
    $SUDO_CMD certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
    
    # Copier les certificats
    $SUDO_CMD cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/$DOMAIN.crt
    $SUDO_CMD cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/$DOMAIN.key
    
    # Redémarrer Nginx
    docker-compose start nginx
    
    # Configurer le renouvellement automatique
    (crontab -l 2>/dev/null; echo "0 12 * * * $SUDO_CMD /usr/bin/certbot renew --quiet && $SUDO_CMD cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem $PROJECT_DIR/nginx/ssl/$DOMAIN.crt && $SUDO_CMD cp /etc/letsencrypt/live/$DOMAIN/privkey.pem $PROJECT_DIR/nginx/ssl/$DOMAIN.key && cd $PROJECT_DIR && docker-compose restart nginx") | crontab -
    
    log_success "SSL configuré"
}

# Fonction pour créer les scripts de maintenance
create_maintenance_scripts() {
    log_step "Création des scripts de maintenance..."
    
    cd $PROJECT_DIR
    
    # Script de backup
    cat > backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/hordearii"
PROJECT_DIR="/var/www/hordearii"

mkdir -p $BACKUP_DIR

echo "🔄 Début du backup..."

docker-compose exec -T postgres pg_dump -U profile_user profilejd > $BACKUP_DIR/db_$DATE.sql
tar -czf $BACKUP_DIR/files_$DATE.tar.gz $PROJECT_DIR
cp -r /etc/letsencrypt/live/hordearii.ca $BACKUP_DIR/ssl_$DATE

find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "ssl_*" -mtime +7 -exec rm -rf {} \;

echo "✅ Backup terminé: $BACKUP_DIR"
EOF

    # Script de mise à jour
    cat > update.sh << 'EOF'
#!/bin/bash
PROJECT_DIR="/var/www/hordearii"
LOG_FILE="/var/log/hordearii/update.log"

mkdir -p /var/log/hordearii

echo "🚀 Début de la mise à jour..." | tee -a $LOG_FILE

cd $PROJECT_DIR

./backup.sh >> $LOG_FILE 2>&1
git pull origin main >> $LOG_FILE 2>&1
./deploy.sh >> $LOG_FILE 2>&1

sleep 30

if curl -f https://hordearii.ca/api/health > /dev/null 2>&1; then
    echo "✅ API en ligne" | tee -a $LOG_FILE
else
    echo "❌ API hors ligne" | tee -a $LOG_FILE
fi

if curl -f https://hordearii.ca > /dev/null 2>&1; then
    echo "✅ Frontend en ligne" | tee -a $LOG_FILE
else
    echo "❌ Frontend hors ligne" | tee -a $LOG_FILE
fi

echo "🎉 Mise à jour terminée!" | tee -a $LOG_FILE
EOF

    # Script de monitoring
    cat > status.sh << 'EOF'
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
EOF

    # Rendre les scripts exécutables
    chmod +x backup.sh update.sh status.sh
    
    log_success "Scripts de maintenance créés"
}

# Fonction pour configurer le démarrage automatique
configure_autostart() {
    log_step "Configuration du démarrage automatique..."
    
    # Créer le service systemd
    $SUDO_CMD cat > /etc/systemd/system/hordearii.service << EOF
[Unit]
Description=Hordearii.ca Docker Compose
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$PROJECT_DIR
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

    # Activer le service
    $SUDO_CMD systemctl daemon-reload
    $SUDO_CMD systemctl enable hordearii.service
    
    log_success "Démarrage automatique configuré"
}

# Fonction pour vérifier le déploiement
verify_deployment() {
    log_step "Vérification du déploiement..."
    
    cd $PROJECT_DIR
    
    # Vérifier les containers
    log_info "Vérification des containers..."
    docker-compose ps
    
    # Vérifier les services
    log_info "Vérification des services..."
    
    # Test Frontend
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        log_success "Frontend: OK"
    else
        log_error "Frontend: ÉCHEC"
    fi
    
    # Test Backend
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        log_success "Backend: OK"
    else
        log_error "Backend: ÉCHEC"
    fi
    
    # Test Nginx
    if curl -f http://localhost:80/health > /dev/null 2>&1; then
        log_success "Nginx: OK"
    else
        log_error "Nginx: ÉCHEC"
    fi
    
    log_success "Vérification terminée"
}

# Fonction pour afficher les informations finales
show_final_info() {
    log_success "🎉 Déploiement terminé avec succès!"
    echo ""
    echo -e "${GREEN}📊 Services disponibles:${NC}"
    echo "  - Site web: https://$DOMAIN"
    echo "  - API: https://$DOMAIN/api"
    echo "  - Grafana: http://$(hostname -I | awk '{print $1}'):3002"
    echo "  - Prometheus: http://$(hostname -I | awk '{print $1}'):9090"
    echo ""
    echo -e "${GREEN}🔧 Commandes utiles:${NC}"
    echo "  - Vérifier l'état: ./status.sh"
    echo "  - Faire un backup: ./backup.sh"
    echo "  - Mettre à jour: ./update.sh"
    echo "  - Voir les logs: docker-compose logs -f"
    echo "  - Arrêter: docker-compose down"
    echo ""
    echo -e "${GREEN}📚 Documentation:${NC}"
    echo "  - Guide détaillé: docs/guides/ubuntu-server-detailed-guide.md"
    echo ""
    echo -e "${YELLOW}⚠️  N'oubliez pas de configurer votre DNS pour pointer vers $(hostname -I | awk '{print $1}')${NC}"
    echo ""
    echo -e "${CYAN}💡 Note: Ce script fonctionne avec Ubuntu Server 20.04+${NC}"
}

# Fonction principale
main() {
    echo -e "${CYAN}"
    echo "🚀 SCRIPT DE DÉPLOIEMENT UBUNTU SERVER - HORDEARII.CA"
    echo "Pour Programmeurs en Études"
    echo -e "${NC}"
    echo ""
    
    # Créer le fichier de log
    mkdir -p /var/log/hordearii
    touch $LOG_FILE
    
    log_info "Début du déploiement"
    
    # Exécuter les étapes
    check_prerequisites
    create_directories
    install_docker
    install_docker_compose
    install_system_tools
    configure_firewall
    transfer_project
    configure_environment
    configure_nginx
    deploy_docker
    configure_ssl
    create_maintenance_scripts
    configure_autostart
    verify_deployment
    show_final_info
    
    log_success "Déploiement terminé avec succès!"
}

# Exécuter le script principal
main "$@"
