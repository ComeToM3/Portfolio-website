# Dockerfile pour Hordearii Backend
FROM node:18-alpine AS base

# Installer les dépendances nécessaires
RUN apk add --no-cache libc6-compat curl openssl

# Étape de développement
FROM base AS deps
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm ci && npm cache clean --force

# Étape de build
FROM base AS builder
WORKDIR /app

# Copier les dépendances
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Générer Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Script de démarrage avec migrations
COPY --chown=nextjs:nodejs docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Étape de production
FROM base AS runner
WORKDIR /app

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Changer les permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exposer le port
EXPOSE 3001

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Commande de démarrage
ENTRYPOINT ["docker-entrypoint.sh"]
