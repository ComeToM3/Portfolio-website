import { Request, Response, NextFunction } from 'express';

// Interface pour les erreurs personnalisées
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Erreurs personnalisées
export const createError = {
  badRequest: (message: string = 'Requête invalide') => new AppError(message, 400),
  unauthorized: (message: string = 'Non autorisé') => new AppError(message, 401),
  forbidden: (message: string = 'Accès interdit') => new AppError(message, 403),
  notFound: (message: string = 'Ressource non trouvée') => new AppError(message, 404),
  conflict: (message: string = 'Conflit de données') => new AppError(message, 409),
  tooManyRequests: (message: string = 'Trop de requêtes') => new AppError(message, 429),
  internal: (message: string = 'Erreur interne du serveur') => new AppError(message, 500),
  serviceUnavailable: (message: string = 'Service indisponible') => new AppError(message, 503)
};

// Middleware de gestion d'erreurs
export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Erreur interne du serveur';
  let details: any = null;

  // Gestion des erreurs Prisma
  if (error.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as any;
    
    switch (prismaError.code) {
      case 'P2002':
        statusCode = 409;
        message = 'Conflit de données - Ressource déjà existante';
        details = { field: prismaError.meta?.target };
        break;
      case 'P2025':
        statusCode = 404;
        message = 'Ressource non trouvée';
        break;
      case 'P2003':
        statusCode = 400;
        message = 'Violation de contrainte de clé étrangère';
        break;
      default:
        statusCode = 400;
        message = 'Erreur de base de données';
    }
  }
  // Gestion des erreurs de validation
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Données invalides';
    details = error.message;
  }
  // Gestion des erreurs JWT
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token invalide';
  }
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expiré';
  }
  // Gestion des erreurs personnalisées
  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  // Gestion des erreurs de syntaxe JSON
  else if (error instanceof SyntaxError && 'body' in error) {
    statusCode = 400;
    message = 'JSON invalide';
  }
  // Gestion des erreurs de limite de taille
  else if (error.message.includes('limit')) {
    statusCode = 413;
    message = 'Fichier trop volumineux';
  }

  // Log de l'erreur
  const errorLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    error: {
      name: error.name,
      message: error.message,
      stack: process.env['NODE_ENV'] === 'development' ? error.stack : undefined
    },
    statusCode,
    userId: (req as any).user?.id
  };

  // Log différent selon le niveau d'erreur
  if (statusCode >= 500) {
    console.error('🚨 ERREUR SERVEUR:', errorLog);
  } else if (statusCode >= 400) {
    console.warn('⚠️ ERREUR CLIENT:', errorLog);
  } else {
    console.info('ℹ️ ERREUR INFO:', errorLog);
  }

  // Réponse d'erreur
  const errorResponse: any = {
    error: true,
    message,
    statusCode
  };

  // Ajouter les détails en développement
  if (process.env['NODE_ENV'] === 'development') {
    errorResponse.details = details || error.message;
    errorResponse.stack = error.stack;
  }

  // Ajouter les détails de validation si disponibles
  if (details && typeof details === 'object') {
    errorResponse.details = details;
  }

  res.status(statusCode).json(errorResponse);
};

// Middleware pour capturer les erreurs asynchrones
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Middleware pour gérer les routes non trouvées
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  const error = createError.notFound(`Route ${req.originalUrl} non trouvée`);
  next(error);
};

// Middleware pour gérer les méthodes HTTP non autorisées
export const methodNotAllowedHandler = (req: Request, _res: Response, next: NextFunction) => {
  const error = createError.forbidden(`Méthode ${req.method} non autorisée pour ${req.originalUrl}`);
  next(error);
};

// Middleware pour valider les paramètres d'URL
export const validateUrlParams = (req: Request, _res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  if (id && !/^[a-zA-Z0-9-_]+$/.test(id)) {
    const error = createError.badRequest('Paramètre ID invalide');
    return next(error);
  }
  
  next();
};

// Middleware pour valider les paramètres de requête
export const validateQueryParams = (req: Request, _res: Response, next: NextFunction) => {
  const { page, limit, sort, order } = req.query;
  
  // Validation de la pagination
  if (page && (!Number.isInteger(+page) || +page < 1)) {
    const error = createError.badRequest('Paramètre page invalide');
    return next(error);
  }
  
  if (limit && (!Number.isInteger(+limit) || +limit < 1 || +limit > 100)) {
    const error = createError.badRequest('Paramètre limit invalide (1-100)');
    return next(error);
  }
  
  // Validation du tri
  if (sort && typeof sort !== 'string') {
    const error = createError.badRequest('Paramètre sort invalide');
    return next(error);
  }
  
  if (order && !['asc', 'desc'].includes(order as string)) {
    const error = createError.badRequest('Paramètre order invalide (asc/desc)');
    return next(error);
  }
  
  next();
};
