import rateLimit from 'express-rate-limit';

// Rate limiter général pour toutes les routes
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  message: {
    error: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Retourne les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
  handler: (_req, res) => {
    res.status(429).json({
      error: 'Trop de requêtes depuis cette IP',
      message: 'Veuillez réessayer dans 15 minutes',
      retryAfter: Math.ceil(15 * 60 / 1000) // secondes
    });
  }
});

// Rate limiter strict pour l'authentification
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite chaque IP à 5 tentatives de connexion par fenêtre
  message: {
    error: 'Trop de tentatives de connexion, veuillez réessayer plus tard.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      error: 'Trop de tentatives de connexion',
      message: 'Veuillez réessayer dans 15 minutes',
      retryAfter: Math.ceil(15 * 60 / 1000)
    });
  },
  skipSuccessfulRequests: true // Ne compte pas les connexions réussies
});

// Rate limiter pour les messages de contact
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3, // Limite chaque IP à 3 messages par heure
  message: {
    error: 'Trop de messages envoyés, veuillez réessayer plus tard.',
    retryAfter: '1 heure'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      error: 'Trop de messages envoyés',
      message: 'Veuillez réessayer dans 1 heure',
      retryAfter: Math.ceil(60 * 60 / 1000)
    });
  },

});

// Rate limiter pour les API publiques
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limite chaque IP à 200 requêtes par fenêtre
  message: {
    error: 'Trop de requêtes API, veuillez réessayer plus tard.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      error: 'Trop de requêtes API',
      message: 'Veuillez réessayer dans 15 minutes',
      retryAfter: Math.ceil(15 * 60 / 1000)
    });
  }
});

// Rate limiter pour les uploads de fichiers
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 10, // Limite chaque IP à 10 uploads par heure
  message: {
    error: 'Trop d\'uploads, veuillez réessayer plus tard.',
    retryAfter: '1 heure'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      error: 'Trop d\'uploads',
      message: 'Veuillez réessayer dans 1 heure',
      retryAfter: Math.ceil(60 * 60 / 1000)
    });
  }
});

// Rate limiter pour les recherches
export const searchLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // Limite chaque IP à 30 recherches par 5 minutes
  message: {
    error: 'Trop de recherches, veuillez réessayer plus tard.',
    retryAfter: '5 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      error: 'Trop de recherches',
      message: 'Veuillez réessayer dans 5 minutes',
      retryAfter: Math.ceil(5 * 60 / 1000)
    });
  }
});
