#!/bin/sh

# Script d'entrée pour le container backend
# Exécute les migrations Prisma avant de démarrer l'application

set -e

echo "🚀 Démarrage du backend Hordearii..."

# Attendre que la base de données soit prête (avec timeout)
echo "⏳ Attente de la base de données..."
timeout=60
counter=0

while [ $counter -lt $timeout ]; do
  if npx prisma db push --accept-data-loss > /dev/null 2>&1; then
    echo "✅ Base de données disponible"
    break
  fi
  echo "Base de données non disponible, attente... ($counter/$timeout)"
  sleep 2
  counter=$((counter + 2))
done

if [ $counter -eq $timeout ]; then
  echo "⚠️  Timeout atteint, démarrage sans base de données"
fi

# Exécuter les migrations (optionnel)
echo "🔄 Tentative d'exécution des migrations Prisma..."
if npx prisma migrate deploy > /dev/null 2>&1; then
  echo "✅ Migrations terminées"
else
  echo "⚠️  Migrations non exécutées (base de données non disponible)"
fi

# Démarrer l'application
echo "🚀 Démarrage de l'application..."
exec npm start
