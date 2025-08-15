#!/bin/bash

# Script de déploiement Docker pour Hordearii
set -e

echo "🚀 Déploiement Hordearii avec Docker..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    log_error "Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    log_error "Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

log_info "Vérification des prérequis..."

# Vérifier que les fichiers nécessaires existent
if [ ! -f "docker-compose.yml" ]; then
    log_error "docker-compose.yml non trouvé"
    exit 1
fi

if [ ! -f "backend/Dockerfile" ]; then
    log_error "backend/Dockerfile non trouvé"
    exit 1
fi

if [ ! -f "frontend/Dockerfile" ]; then
    log_error "frontend/Dockerfile non trouvé"
    exit 1
fi

if [ ! -f "nginx/nginx.conf" ]; then
    log_error "nginx/nginx.conf non trouvé"
    exit 1
fi

log_success "Tous les fichiers nécessaires sont présents"

# Arrêter les containers existants
log_info "Arrêt des containers existants..."
docker-compose down --remove-orphans

# Nettoyer les images obsolètes
log_info "Nettoyage des images obsolètes..."
docker image prune -f

# Construire les images
log_info "Construction des images Docker..."
docker-compose build --no-cache

# Démarrer les services
log_info "Démarrage des services..."
docker-compose up -d

# Attendre que les services soient prêts
log_info "Attente du démarrage des services..."
sleep 30

# Vérifier l'état des services
log_info "Vérification de l'état des services..."
docker-compose ps

# Health checks
log_info "Vérification des health checks..."

# Backend health check
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    log_success "Backend API: OK"
else
    log_error "Backend API: ÉCHEC"
fi

# Frontend health check
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    log_success "Frontend: OK"
else
    log_error "Frontend: ÉCHEC"
fi

# Nginx health check
if curl -f http://localhost:80/health > /dev/null 2>&1; then
    log_success "Nginx: OK"
else
    log_error "Nginx: ÉCHEC"
fi

# Prometheus health check
if curl -f http://localhost:9090/-/healthy > /dev/null 2>&1; then
    log_success "Prometheus: OK"
else
    log_warning "Prometheus: Non accessible (normal si pas encore configuré)"
fi

# Grafana health check
if curl -f http://localhost:3002/api/health > /dev/null 2>&1; then
    log_success "Grafana: OK"
else
    log_warning "Grafana: Non accessible (normal si pas encore configuré)"
fi

# Afficher les logs récents
log_info "Logs récents des services:"
docker-compose logs --tail=20

# Informations finales
echo ""
log_success "🎉 Déploiement terminé avec succès!"
echo ""
echo "📊 Services disponibles:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend API: http://localhost:3001"
echo "  - Nginx: http://localhost:80"
echo "  - Prometheus: http://localhost:9090"
echo "  - Grafana: http://localhost:3002 (admin/admin)"
echo ""
echo "🔧 Commandes utiles:"
echo "  - Voir les logs: docker-compose logs -f"
echo "  - Arrêter: docker-compose down"
echo "  - Redémarrer: docker-compose restart"
echo "  - Mettre à jour: ./deploy.sh"
echo ""
