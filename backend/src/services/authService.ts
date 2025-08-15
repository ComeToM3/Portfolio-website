import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { createError } from '../middleware/errorHandler';

// Types pour l'authentification
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  expiresIn: number;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

// Configuration JWT
const JWT_SECRET = process.env['JWT_SECRET'] || 'fallback-secret';
const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] || '15m';
const SALT_ROUNDS = 12;

export class AuthService {
  /**
   * Inscription d'un nouvel utilisateur
   */
  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser) {
        throw createError.conflict('Un utilisateur avec cet email existe déjà');
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

      // Créer l'utilisateur
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role: 'USER' // Par défaut, les nouveaux utilisateurs sont USER
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      });

      // Générer le token JWT
      const token = this.generateToken(user);

      return {
        user,
        token,
        expiresIn: this.getTokenExpirationTime()
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('conflict')) {
        throw error;
      }
      throw createError.internal('Erreur lors de l\'inscription');
    }
  }

  /**
   * Connexion d'un utilisateur
   */
  static async login(data: LoginData): Promise<AuthResponse> {
    try {
      // Trouver l'utilisateur par email
      const user = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (!user) {
        throw createError.unauthorized('Email ou mot de passe incorrect');
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(data.password, user.password);

      if (!isPasswordValid) {
        throw createError.unauthorized('Email ou mot de passe incorrect');
      }

      // Créer la session
      const sessionToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
      await prisma.session.create({
        data: {
          userId: user.id,
          token: sessionToken,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures
        }
      });

      // Générer le token JWT
      const token = this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      });

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token,
        expiresIn: this.getTokenExpirationTime()
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('unauthorized')) {
        throw error;
      }
      throw createError.internal('Erreur lors de la connexion');
    }
  }

  /**
   * Déconnexion d'un utilisateur
   */
  static async logout(userId: string): Promise<void> {
    try {
      // Supprimer toutes les sessions de l'utilisateur
      await prisma.session.deleteMany({
        where: { userId }
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Ne pas lever d'erreur pour la déconnexion
    }
  }

  /**
   * Rafraîchir le token JWT
   */
  static async refreshToken(userId: string): Promise<AuthResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      });

      if (!user) {
        throw createError.unauthorized('Utilisateur non trouvé');
      }

      // Vérifier que l'utilisateur a une session active
      const activeSession = await prisma.session.findFirst({
        where: {
          userId,
          expiresAt: { gt: new Date() }
        }
      });

      if (!activeSession) {
        throw createError.unauthorized('Session expirée');
      }

      // Générer un nouveau token
      const token = this.generateToken(user);

      return {
        user,
        token,
        expiresIn: this.getTokenExpirationTime()
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('unauthorized')) {
        throw error;
      }
      throw createError.internal('Erreur lors du rafraîchissement du token');
    }
  }

  /**
   * Vérifier le token JWT
   */
  static verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw createError.unauthorized('Token expiré');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw createError.unauthorized('Token invalide');
      }
      throw createError.unauthorized('Erreur de vérification du token');
    }
  }

  /**
   * Générer un token JWT
   */
  private static generateToken(user: { id: string; email: string; role: string }): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as any
    });
  }

  /**
   * Obtenir le temps d'expiration du token en secondes
   */
  private static getTokenExpirationTime(): number {
    const expiresIn = JWT_EXPIRES_IN;
    
    if (expiresIn.includes('m')) {
      return parseInt(expiresIn) * 60;
    }
    if (expiresIn.includes('h')) {
      return parseInt(expiresIn) * 60 * 60;
    }
    if (expiresIn.includes('d')) {
      return parseInt(expiresIn) * 24 * 60 * 60;
    }
    
    return parseInt(expiresIn) || 900; // 15 minutes par défaut
  }

  /**
   * Changer le mot de passe
   */
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw createError.notFound('Utilisateur non trouvé');
      }

      // Vérifier l'ancien mot de passe
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

      if (!isCurrentPasswordValid) {
        throw createError.unauthorized('Mot de passe actuel incorrect');
      }

      // Hasher le nouveau mot de passe
      const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

      // Mettre à jour le mot de passe
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword }
      });

      // Supprimer toutes les sessions existantes pour forcer une nouvelle connexion
      await prisma.session.deleteMany({
        where: { userId }
      });
    } catch (error) {
      if (error instanceof Error && (error.message.includes('notFound') || error.message.includes('unauthorized'))) {
        throw error;
      }
      throw createError.internal('Erreur lors du changement de mot de passe');
    }
  }

  /**
   * Obtenir le profil utilisateur
   */
  static async getProfile(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        throw createError.notFound('Utilisateur non trouvé');
      }

      return user;
    } catch (error) {
      if (error instanceof Error && error.message.includes('notFound')) {
        throw error;
      }
      throw createError.internal('Erreur lors de la récupération du profil');
    }
  }
}
