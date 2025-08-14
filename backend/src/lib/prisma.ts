import { PrismaClient } from '@prisma/client';

// Créer une instance globale de PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Client Prisma avec gestion des connexions
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env['NODE_ENV'] === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// En développement, assigner à global pour éviter les connexions multiples
if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Fonction pour fermer la connexion (utile pour les tests)
export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

// Middleware pour logger les requêtes en développement
if (process.env['NODE_ENV'] === 'development') {
  prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
    
    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
    return result;
  });
}

export default prisma;
