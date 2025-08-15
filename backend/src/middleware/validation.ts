import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Middleware pour gérer les erreurs de validation
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Données invalides',
      details: errors.array().map(error => ({
        field: error.type,
        message: error.msg
      }))
    });
  }
  
  return next();
};

// Validation pour l'authentification
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  handleValidationErrors
];

// Validation pour l'inscription
export const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Le nom ne peut contenir que des lettres et espaces'),
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  handleValidationErrors
];

// Validation pour les projets
export const validateProject = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Le titre doit contenir entre 3 et 100 caractères'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('La description doit contenir entre 10 et 1000 caractères'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('Au moins une technologie doit être spécifiée'),
  body('technologies.*')
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Chaque technologie doit contenir entre 1 et 50 caractères'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('URL GitHub invalide'),
  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('URL live invalide'),
  handleValidationErrors
];

// Validation pour les compétences
export const validateSkill = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères'),
  body('category')
    .isIn(['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'TOOLS', 'LANGUAGES', 'FRAMEWORKS', 'OTHER'])
    .withMessage('Catégorie invalide'),
  body('level')
    .isInt({ min: 0, max: 100 })
    .withMessage('Le niveau doit être entre 0 et 100'),
  handleValidationErrors
];

// Validation pour les messages de contact
export const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Le nom ne peut contenir que des lettres et espaces'),
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Le message doit contenir entre 10 et 2000 caractères'),
  handleValidationErrors
];

// Validation générique pour les IDs
export const validateId = [
  body('id')
    .isString()
    .isLength({ min: 1 })
    .withMessage('ID invalide'),
  handleValidationErrors
];

// Sanitization générale
export const sanitizeInput = (req: Request, _res: Response, next: NextFunction) => {
  // Sanitizer les paramètres de requête
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = (req.query[key] as string).trim();
      }
    });
  }

  // Sanitizer le body
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });
  }

  next();
};
