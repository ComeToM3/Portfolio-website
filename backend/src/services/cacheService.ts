import Redis from 'ioredis';
import { logger } from '../utils/logger';

export class CacheService {
  private static redis: Redis;
  private static readonly DEFAULT_TTL = 3600; // 1 heure en secondes

  /**
   * Initialiser la connexion Redis
   */
  static async initialize(): Promise<void> {
    try {
      const redisConfig: any = {
        host: process.env['REDIS_HOST'] || 'localhost',
        port: parseInt(process.env['REDIS_PORT'] || '6379'),
        maxRetriesPerRequest: 3,
        lazyConnect: true,
      };

      if (process.env['REDIS_PASSWORD']) {
        redisConfig.password = process.env['REDIS_PASSWORD'];
      }

      this.redis = new Redis(redisConfig);

      this.redis.on('connect', () => {
        logger.info('✅ Redis connecté avec succès');
      });

      this.redis.on('error', (error) => {
        logger.error('❌ Erreur Redis:', error);
      });

      await this.redis.connect();
    } catch (error) {
      logger.error('❌ Impossible de se connecter à Redis:', error);
      // Fallback: utiliser un cache en mémoire si Redis n'est pas disponible
      this.redis = null as any;
    }
  }

  /**
   * Vérifier si Redis est disponible
   */
  static isAvailable(): boolean {
    return this.redis && this.redis.status === 'ready';
  }

  /**
   * Obtenir une valeur du cache
   */
  static async get<T>(key: string): Promise<T | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error(`❌ Erreur lors de la récupération du cache pour ${key}:`, error);
      return null;
    }
  }

  /**
   * Définir une valeur dans le cache
   */
  static async set(key: string, value: any, ttl: number = this.DEFAULT_TTL): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      await this.redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      logger.error(`❌ Erreur lors de la mise en cache pour ${key}:`, error);
    }
  }

  /**
   * Supprimer une clé du cache
   */
  static async del(key: string): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      await this.redis.del(key);
    } catch (error) {
      logger.error(`❌ Erreur lors de la suppression du cache pour ${key}:`, error);
    }
  }

  /**
   * Supprimer toutes les clés correspondant à un pattern
   */
  static async delPattern(pattern: string): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      logger.error(`❌ Erreur lors de la suppression du pattern ${pattern}:`, error);
    }
  }

  /**
   * Obtenir ou définir une valeur avec cache
   */
  static async getOrSet<T>(
    key: string,
    fetchFunction: () => Promise<T>,
    ttl: number = this.DEFAULT_TTL
  ): Promise<T> {
    // Essayer de récupérer du cache
    const cached = await this.get<T>(key);
    if (cached !== null) {
      logger.debug(`📦 Cache hit pour ${key}`);
      return cached;
    }

    // Si pas en cache, récupérer et mettre en cache
    logger.debug(`🔄 Cache miss pour ${key}, récupération...`);
    const data = await fetchFunction();
    await this.set(key, data, ttl);
    return data;
  }

  /**
   * Invalider le cache pour les projets
   */
  static async invalidateProjects(): Promise<void> {
    await this.delPattern('projects:*');
    await this.del('projects:stats');
    await this.del('projects:featured');
    logger.info('🗑️ Cache des projets invalidé');
  }

  /**
   * Invalider le cache pour les compétences
   */
  static async invalidateSkills(): Promise<void> {
    await this.delPattern('skills:*');
    await this.del('skills:stats');
    logger.info('🗑️ Cache des compétences invalidé');
  }

  /**
   * Invalider le cache utilisateur
   */
  static async invalidateUser(userId: string): Promise<void> {
    await this.delPattern(`user:${userId}:*`);
    await this.del(`user:${userId}:profile`);
    logger.info(`🗑️ Cache utilisateur ${userId} invalidé`);
  }

  /**
   * Fermer la connexion Redis
   */
  static async close(): Promise<void> {
    if (this.redis) {
      await this.redis.quit();
      logger.info('🔌 Connexion Redis fermée');
    }
  }

  /**
   * Obtenir les statistiques du cache
   */
  static async getStats(): Promise<any> {
    if (!this.isAvailable()) {
      return { available: false };
    }

    try {
      const info = await this.redis.info();
      const keys = await this.redis.dbsize();
      
      return {
        available: true,
        keys,
        info: info.split('\r\n').reduce((acc: any, line) => {
          const [key, value] = line.split(':');
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {})
      };
    } catch (error) {
      logger.error('❌ Erreur lors de la récupération des stats Redis:', error);
      return { available: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}
