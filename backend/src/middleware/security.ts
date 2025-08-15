import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

// Configuration Helmet avec Content Security Policy
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  permittedCrossDomainPolicies: { permittedPolicies: "none" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true
});

// Headers de sécurité personnalisés
export const customSecurityHeaders = (_req: Request, res: Response, next: NextFunction) => {
  // Headers de sécurité supplémentaires
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Headers pour la performance et la sécurité
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  
  // Headers pour la cache et la compression
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  next();
};

// Middleware pour bloquer les requêtes suspectes
export const blockSuspiciousRequests = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.get('User-Agent') || '';
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /php/i,
    /java/i,
    /perl/i
  ];

  // Bloquer les bots suspects
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    return res.status(403).json({
      error: 'Accès non autorisé',
      message: 'Les bots et scrapers ne sont pas autorisés'
    });
  }

  // Bloquer les requêtes avec des headers suspects
  const suspiciousHeaders = [
    'X-Forwarded-For',
    'X-Real-IP',
    'X-Client-IP',
    'CF-Connecting-IP'
  ];

  const hasSuspiciousHeaders = suspiciousHeaders.some(header => 
    req.headers[header.toLowerCase()] && 
    req.headers[header.toLowerCase()] !== req.ip
  );

  if (hasSuspiciousHeaders) {
    return res.status(403).json({
      error: 'Headers suspects détectés',
      message: 'Requête rejetée pour des raisons de sécurité'
    });
  }

  return next();
};

// Middleware pour valider l'origine des requêtes
export const validateOrigin = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://hordearii.ca',
    'https://www.hordearii.ca'
  ];

  const origin = req.get('Origin');
  const referer = req.get('Referer');

  // Autoriser les requêtes sans origine (applications natives, etc.)
  if (!origin && !referer) {
    return next();
  }

  // Vérifier l'origine
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({
      error: 'Origine non autorisée',
      message: 'Cette origine n\'est pas autorisée à accéder à l\'API'
    });
  }

  // Vérifier le referer pour les requêtes GET
  if (req.method === 'GET' && referer) {
    const refererUrl = new URL(referer);
    const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`;
    
    if (!allowedOrigins.includes(refererOrigin)) {
      return res.status(403).json({
        error: 'Referer non autorisé',
        message: 'Cette source n\'est pas autorisée'
      });
    }
  }

  next();
};

// Middleware pour logger les tentatives d'attaque
export const logSecurityEvents = (req: Request, _res: Response, next: NextFunction) => {
  const securityEvents = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    headers: req.headers,
    body: req.method !== 'GET' ? req.body : undefined
  };

  // Détecter les patterns d'attaque
  const attackPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /union\s+select/i,
    /drop\s+table/i,
    /insert\s+into/i,
    /delete\s+from/i,
    /update\s+set/i,
    /exec\s*\(/i,
    /eval\s*\(/i
  ];

  const requestString = JSON.stringify(securityEvents).toLowerCase();
  const hasAttackPattern = attackPatterns.some(pattern => pattern.test(requestString));

  if (hasAttackPattern) {
    console.warn('🚨 TENTATIVE D\'ATTAQUE DÉTECTÉE:', securityEvents);
    
    // En production, on pourrait envoyer une alerte
    // await sendSecurityAlert(securityEvents);
  }

  next();
};

// Middleware pour limiter la taille des requêtes
export const limitRequestSize = (req: Request, res: Response, next: NextFunction) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (req.headers['content-length']) {
    const contentLength = parseInt(req.headers['content-length']);
    
    if (contentLength > maxSize) {
      return res.status(413).json({
        error: 'Fichier trop volumineux',
        message: 'La taille maximale autorisée est de 10MB'
      });
    }
  }

  return next();
};
