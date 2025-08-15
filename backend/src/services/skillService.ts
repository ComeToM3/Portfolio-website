import { prisma } from '../lib/prisma';
import { createError } from '../middleware/errorHandler';

// Types pour les compétences
export interface CreateSkillData {
  name: string;
  category: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'TOOLS' | 'LANGUAGES' | 'FRAMEWORKS' | 'OTHER';
  level: number;
  order?: number;
  userId: string;
}

export interface UpdateSkillData {
  name?: string;
  category?: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'TOOLS' | 'LANGUAGES' | 'FRAMEWORKS' | 'OTHER';
  level?: number;
  order?: number;
}

export interface SkillFilters {
  category?: string;
  search?: string;
  minLevel?: number;
  maxLevel?: number;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'level' | 'order' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export class SkillService {
  /**
   * Créer une nouvelle compétence
   */
  static async createSkill(data: CreateSkillData) {
    try {
      const skill = await prisma.skill.create({
        data: {
          name: data.name,
          category: data.category as any,
          level: data.level,
          order: data.order || 0,
          userId: data.userId
        }
      });

      return skill;
    } catch (error) {
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        throw createError.conflict('Une compétence avec ce nom existe déjà pour cet utilisateur');
      }
      throw createError.internal('Erreur lors de la création de la compétence');
    }
  }

  /**
   * Obtenir toutes les compétences avec filtres et pagination
   */
  static async getSkills(filters: SkillFilters = {}, userId?: string) {
    try {
      const {
        category,
        search,
        minLevel,
        maxLevel,
        page = 1,
        limit = 50,
        sortBy = 'order',
        sortOrder = 'asc'
      } = filters;

      const skip = (page - 1) * limit;

      // Construire les conditions de filtrage
      const where: any = {};

      if (userId) {
        where.userId = userId;
      }

      if (category) {
        where.category = category;
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } }
        ];
      }

      if (minLevel !== undefined) {
        where.level = { gte: minLevel };
      }

      if (maxLevel !== undefined) {
        where.level = { ...where.level, lte: maxLevel };
      }

      // Compter le total des compétences
      const total = await prisma.skill.count({ where });

      // Obtenir les compétences
      const skills = await prisma.skill.findMany({
        where,
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take: limit
      });

      return {
        skills,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      throw createError.internal('Erreur lors de la récupération des compétences');
    }
  }

  /**
   * Obtenir une compétence par ID
   */
  static async getSkillById(id: string, userId?: string) {
    try {
      const where: any = { id };

      if (userId) {
        where.userId = userId;
      }

      const skill = await prisma.skill.findFirst({ where });

      if (!skill) {
        throw createError.notFound('Compétence non trouvée');
      }

      return skill;
    } catch (error) {
      if (error instanceof Error && error.message.includes('notFound')) {
        throw error;
      }
      throw createError.internal('Erreur lors de la récupération de la compétence');
    }
  }

  /**
   * Mettre à jour une compétence
   */
  static async updateSkill(id: string, data: UpdateSkillData, userId: string) {
    try {
      // Vérifier que la compétence existe et appartient à l'utilisateur
      const existingSkill = await prisma.skill.findFirst({
        where: { id, userId }
      });

      if (!existingSkill) {
        throw createError.notFound('Compétence non trouvée');
      }

      const skill = await prisma.skill.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.category && { category: data.category as any }),
          ...(data.level !== undefined && { level: data.level }),
          ...(data.order !== undefined && { order: data.order })
        }
      });

      return skill;
    } catch (error) {
      if (error instanceof Error && error.message.includes('notFound')) {
        throw error;
      }
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        throw createError.conflict('Une compétence avec ce nom existe déjà');
      }
      throw createError.internal('Erreur lors de la mise à jour de la compétence');
    }
  }

  /**
   * Supprimer une compétence
   */
  static async deleteSkill(id: string, userId: string) {
    try {
      // Vérifier que la compétence existe et appartient à l'utilisateur
      const existingSkill = await prisma.skill.findFirst({
        where: { id, userId }
      });

      if (!existingSkill) {
        throw createError.notFound('Compétence non trouvée');
      }

      await prisma.skill.delete({
        where: { id }
      });

      return { message: 'Compétence supprimée avec succès' };
    } catch (error) {
      if (error instanceof Error && error.message.includes('notFound')) {
        throw error;
      }
      throw createError.internal('Erreur lors de la suppression de la compétence');
    }
  }

  /**
   * Obtenir les compétences par catégorie
   */
  static async getSkillsByCategory(userId?: string) {
    try {
      const where: any = {};

      if (userId) {
        where.userId = userId;
      }

      const skills = await prisma.skill.findMany({
        where,
        orderBy: [
          { category: 'asc' },
          { order: 'asc' },
          { name: 'asc' }
        ]
      });

      // Grouper par catégorie
      const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category]!.push(skill);
        return acc;
      }, {} as Record<string, typeof skills>);

      return groupedSkills;
    } catch (error) {
      throw createError.internal('Erreur lors de la récupération des compétences par catégorie');
    }
  }

  /**
   * Obtenir les statistiques des compétences
   */
  static async getSkillStats(userId?: string) {
    try {
      const where: any = {};

      if (userId) {
        where.userId = userId;
      }

      const [total, categories, averageLevel] = await Promise.all([
        prisma.skill.count({ where }),
        prisma.skill.groupBy({
          by: ['category'],
          where,
          _count: { category: true }
        }),
        prisma.skill.aggregate({
          where,
          _avg: { level: true }
        })
      ]);

      return {
        total,
        categories: categories.length,
        averageLevel: Math.round(averageLevel._avg.level || 0),
        categoryBreakdown: categories.map(cat => ({
          category: cat.category,
          count: cat._count.category
        }))
      };
    } catch (error) {
      throw createError.internal('Erreur lors de la récupération des statistiques des compétences');
    }
  }

  /**
   * Rechercher des compétences
   */
  static async searchSkills(query: string, limit: number = 10) {
    try {
      const skills = await prisma.skill.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } }
          ]
        },
        orderBy: { level: 'desc' },
        take: limit
      });

      return skills;
    } catch (error) {
      throw createError.internal('Erreur lors de la recherche de compétences');
    }
  }

  /**
   * Réorganiser l'ordre des compétences
   */
  static async reorderSkills(skillIds: string[], userId: string) {
    try {
      // Vérifier que toutes les compétences appartiennent à l'utilisateur
      const skills = await prisma.skill.findMany({
        where: {
          id: { in: skillIds },
          userId
        }
      });

      if (skills.length !== skillIds.length) {
        throw createError.badRequest('Certaines compétences n\'existent pas ou ne vous appartiennent pas');
      }

      // Mettre à jour l'ordre de chaque compétence
      const updates = skillIds.map((id, index) =>
        prisma.skill.update({
          where: { id },
          data: { order: index }
        })
      );

      await prisma.$transaction(updates);

      return { message: 'Ordre des compétences mis à jour avec succès' };
    } catch (error) {
      if (error instanceof Error && error.message.includes('badRequest')) {
        throw error;
      }
      throw createError.internal('Erreur lors de la réorganisation des compétences');
    }
  }

  /**
   * Obtenir les compétences de niveau élevé
   */
  static async getTopSkills(limit: number = 10, minLevel: number = 80) {
    try {
      const skills = await prisma.skill.findMany({
        where: {
          level: { gte: minLevel }
        },
        orderBy: { level: 'desc' },
        take: limit
      });

      return skills;
    } catch (error) {
      throw createError.internal('Erreur lors de la récupération des compétences de niveau élevé');
    }
  }

  /**
   * Mettre à jour le niveau d'une compétence
   */
  static async updateSkillLevel(id: string, level: number, userId: string) {
    try {
      // Vérifier que la compétence existe et appartient à l'utilisateur
      const existingSkill = await prisma.skill.findFirst({
        where: { id, userId }
      });

      if (!existingSkill) {
        throw createError.notFound('Compétence non trouvée');
      }

      // Valider le niveau
      if (level < 0 || level > 100) {
        throw createError.badRequest('Le niveau doit être entre 0 et 100');
      }

      const skill = await prisma.skill.update({
        where: { id },
        data: { level }
      });

      return skill;
    } catch (error) {
      if (error instanceof Error && (error.message.includes('notFound') || error.message.includes('badRequest'))) {
        throw error;
      }
      throw createError.internal('Erreur lors de la mise à jour du niveau de compétence');
    }
  }
}
