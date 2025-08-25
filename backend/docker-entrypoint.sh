#!/bin/sh

# Script d'entrée pour le container backend
# Exécute les migrations Prisma avant de démarrer l'application

set -e

echo "🚀 Démarrage du backend Hordearii..."

# Attendre que la base de données soit prête
echo "⏳ Attente de la base de données..."
until npx prisma db push --accept-data-loss > /dev/null 2>&1; do
  echo "Base de données non disponible, attente..."
  sleep 2
done

echo "✅ Base de données disponible"

# Exécuter les migrations
echo "🔄 Exécution des migrations Prisma..."
npx prisma migrate deploy

echo "✅ Migrations terminées"

# Démarrer l'application
echo "🚀 Démarrage de l'application..."
exec npm start
