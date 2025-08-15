import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import des middlewares de sécurité
import { securityHeaders, customSecurityHeaders, blockSuspiciousRequests, validateOrigin, logSecurityEvents, limitRequestSize } from './middleware/security';
import { generalLimiter } from './middleware/rateLimit';
import { sanitizeInput } from './middleware/validation';
import { errorHandler, notFoundHandler, methodNotAllowedHandler } from './middleware/errorHandler';

// Import des routes
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import skillRoutes from './routes/skills';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env['PORT'] || 3001;

// Middleware de sécurité (ordre important)
app.use(securityHeaders);
app.use(customSecurityHeaders);
app.use(blockSuspiciousRequests);
app.use(validateOrigin);
app.use(logSecurityEvents);
app.use(limitRequestSize);

// Rate limiting
app.use(generalLimiter);

// CORS avec configuration stricte
app.use(cors({
  origin: [
    process.env['FRONTEND_URL'] || 'http://localhost:3000',
    'https://hordearii.ca',
    'https://www.hordearii.ca'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count']
}));

// Logging
app.use(morgan('combined', {
  skip: (req) => req.url === '/health' // Ne pas logger les health checks
}));

// Parsing des requêtes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitization des inputs
app.use(sanitizeInput);

// Routes de base
app.get('/', (_req, res) => {
  res.json({
    message: '🚀 Hordearii Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'] || 'development'
  });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env['NODE_ENV'] || 'development',
    version: '1.0.0'
  });
});

    // Route pour les informations de sécurité (admin seulement)
    app.get('/security-info', (_req, res) => {
      res.json({
        security: {
          rateLimiting: 'enabled',
          cors: 'configured',
          helmet: 'enabled',
          validation: 'enabled',
          sanitization: 'enabled'
        },
        timestamp: new Date().toISOString()
      });
    });

    // Routes API
    app.use('/api/auth', authRoutes);
    app.use('/api/projects', projectRoutes);
    app.use('/api/skills', skillRoutes);

// Gestion des routes non trouvées
app.use('*', notFoundHandler);

// Gestion des méthodes HTTP non autorisées
app.use(methodNotAllowedHandler);

// Gestionnaire d'erreurs global (doit être en dernier)
app.use(errorHandler);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`🚀 Hordearii Backend API running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`);
  console.log(`🔒 Security: Rate limiting, CORS, Helmet, Validation enabled`);
});

export default app;
