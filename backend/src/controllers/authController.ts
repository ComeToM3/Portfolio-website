import { Request, Response, NextFunction } from 'express';
import { AuthService, LoginData, RegisterData } from '../services/authService';
import { asyncHandler } from '../middleware/errorHandler';

export class AuthController {
  /**
   * Inscription d'un nouvel utilisateur
   * POST /api/auth/register
   */
  static register = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const data: RegisterData = req.body;
    
    const result = await AuthService.register(data);
    
    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      data: result
    });
  });

  /**
   * Connexion d'un utilisateur
   * POST /api/auth/login
   */
  static login = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const data: LoginData = req.body;
    
    const result = await AuthService.login(data);
    
    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      data: result
    });
  });

  /**
   * Déconnexion d'un utilisateur
   * POST /api/auth/logout
   */
  static logout = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.user?.id;
    
    if (userId) {
      await AuthService.logout(userId);
    }
    
    res.status(200).json({
      success: true,
      message: 'Déconnexion réussie'
    });
  });

  /**
   * Rafraîchir le token JWT
   * POST /api/auth/refresh
   */
  static refreshToken = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Token requis pour rafraîchir'
      });
    }
    
    const result = await AuthService.refreshToken(userId);
    
    return res.status(200).json({
      success: true,
      message: 'Token rafraîchi avec succès',
      data: result
    });
  });

  /**
   * Obtenir le profil utilisateur
   * GET /api/auth/profile
   */
  static getProfile = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentification requise'
      });
    }
    
    const profile = await AuthService.getProfile(userId);
    
    return res.status(200).json({
      success: true,
      data: profile
    });
  });

  /**
   * Changer le mot de passe
   * PUT /api/auth/change-password
   */
  static changePassword = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentification requise'
      });
    }
    
    await AuthService.changePassword(userId, currentPassword, newPassword);
    
    return res.status(200).json({
      success: true,
      message: 'Mot de passe changé avec succès'
    });
  });

  /**
   * Vérifier l'état de l'authentification
   * GET /api/auth/verify
   */
  static verifyAuth = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Non authentifié'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Authentifié',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    });
  });
}
