import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Format personnalisé pour les logs
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  
  return msg;
});

// Configuration du logger
export const logger = createLogger({
  level: process.env['LOG_LEVEL'] || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // Console avec couleurs en développement
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      )
    }),
    // Fichier pour les erreurs
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Fichier pour tous les logs
    new transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ],
  // Ne pas quitter en cas d'erreur
  exitOnError: false
});

// Logger spécialisé pour les performances
export const performanceLogger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(({ timestamp, message, duration, operation, ...metadata }) => {
      return `${timestamp} [PERFORMANCE] ${operation}: ${duration}ms ${JSON.stringify(metadata)}`;
    })
  ),
  transports: [
    new transports.File({
      filename: 'logs/performance.log',
      maxsize: 5242880, // 5MB
      maxFiles: 3,
    })
  ]
});

// Middleware pour logger les requêtes
export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, url, statusCode } = req;
    
    performanceLogger.info('Request completed', {
      method,
      url,
      statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });
  });
  
  next();
};

// Fonction utilitaire pour mesurer les performances
export const measurePerformance = async <T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> => {
  const start = Date.now();
  
  try {
    const result = await fn();
    const duration = Date.now() - start;
    
    performanceLogger.info('Operation completed', {
      operation,
      duration,
      success: true
    });
    
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    
    performanceLogger.error('Operation failed', {
      operation,
      duration,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    throw error;
  }
};
