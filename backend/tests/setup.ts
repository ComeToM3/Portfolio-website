import dotenv from 'dotenv';

// Définir l'environnement de test
process.env['NODE_ENV'] = 'test';

// Charger les variables d'environnement de test
dotenv.config({ path: '.env.test' });

// Configuration globale pour les tests
beforeAll(async () => {
  // Configuration initiale si nécessaire
});

afterAll(async () => {
  // Nettoyage après tous les tests
});

// Configuration pour chaque test
beforeEach(async () => {
  // Setup avant chaque test
});

afterEach(async () => {
  // Nettoyage après chaque test
});

// Configuration globale Jest
global.console = {
  ...console,
  // Réduire le bruit dans les tests
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
