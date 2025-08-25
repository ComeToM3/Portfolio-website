import { prisma } from '../lib/prisma';
import { createError } from '../middleware/errorHandler';
import { CacheService } from './cacheService';
import { measurePerformance } from '../utils/logger';

// Types pour les projets
export interface CreateProjectData {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
  userId: string;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
}

export interface ProjectFilters {
  featured?: boolean;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'order';
  sortOrder?: 'asc' | 'desc';
}

export class ProjectService {
  /**
   * Créer un nouveau projet
   */
  static async createProject(data: CreateProjectData) {
    return measurePerformance('createProject', async () => {
      try {
        const project = await prisma.project.create({
          data: {
            title: data.title,
            description: data.description,
            image: data.image || null,
            technologies: data.technologies,
            githubUrl: data.githubUrl || null,
            liveUrl: data.liveUrl || null,
            featured: data.featured || false,
            order: data.order || 0,
            userId: data.userId
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        });

        // Invalider le cache des projets
        await CacheService.invalidateProjects();

        return project;
      } catch (error) {
        if (error instanceof Error && error.message.includes('Unique constraint')) {
          throw createError.conflict('Un projet avec ce titre existe déjà pour cet utilisateur');
        }
        throw createError.internal('Erreur lors de la création du projet');
      }
    });
  }

  /**
   * Obtenir tous les projets avec filtres et pagination
   */
  static async getProjects(filters: ProjectFilters = {}, userId?: string) {
    return measurePerformance('getProjects', async () => {
      try {
        const {
          featured,
          search,
          page = 1,
          limit = 10,
          sortBy = 'createdAt',
          sortOrder = 'desc'
        } = filters;

        // Générer une clé de cache unique basée sur les filtres
        const cacheKey = `projects:list:${JSON.stringify({ ...filters, userId })}`;

        // Essayer de récupérer du cache
        const cached = await CacheService.get(cacheKey);
        if (cached) {
          return cached;
        }

        const skip = (page - 1) * limit;

        // Construire les conditions de filtrage
        const where: any = {};

        if (userId) {
          where.userId = userId;
        }

        if (featured !== undefined) {
          where.featured = featured;
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { technologies: { has: search } }
        ];
      }

      // Compter le total des projets
      const total = await prisma.project.count({ where });

      // Obtenir les projets
      const projects = await prisma.project.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take: limit
      });

      const result = {
        projects,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };

      // Mettre en cache le résultat (TTL de 30 minutes pour les listes)
      await CacheService.set(cacheKey, result, 1800);

      return result;
    } catch (error) {
      throw createError.internal('Erreur lors de la récupération des projets');
    }
  });
}

  /**
   * Obtenir un projet par ID
   */
  static async getProjectById(id: string, userId?: string) {
    try {
      const where: any = { id };

      if (userId) {
        where.userId = userId;
      }

      const project = await prisma.project.findFirst({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      if (!project) {
        throw createError.notFound('Projet non trouvé');
      }

      return project;
    } catch (error) {
      if (error instanceof Error && error.message.includes('notFound')) {
        throw error;
      }
      throw createError.internal('Erreur lors de la récupération du projet');
    }
  }

  /**
   * Mettre à jour un projet
   */
  static async updateProject(id: string, data: UpdateProjectData, userId: string) {
    try {
      // Vérifier que le projet existe et appartient à l'utilisateur
      const existingProject = await prisma.project.findFirst({
        where: { id, userId }
      });

      if (!existingProject) {
        throw createError.notFound('Projet non trouvé');
      }

      const project = await prisma.project.update({
        where: { id },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.description && { description: data.description }),
          ...(data.image !== undefined && { image: data.image || null }),
          ...(data.technologies && { technologies: data.technologies }),
          ...(data.githubUrl !== undefined && { githubUrl: data.githubUrl || null }),
          ...(data.liveUrl !== undefined && { liveUrl: data.liveUrl || null }),
          ...(data.featured !== undefined && { featured: data.featured }),
          ...(data.order !== undefined && { order: data.order })
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      return project;
    } catch (error) {
      if (error instanceof Error && error.message.includes('notFound')) {
        throw error;
      }
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        throw createError.conflict('Un projet avec ce titre existe déjà');
      }
      throw createError.internal('Erreur lors de la mise à jour du projet');
    }
  }

  /**
   * Supprimer un projet
   */
  static async deleteProject(id: string, userId: string) {
    try {
      // Vérifier que le projet existe et appartient à l'utilisateur
      const existingProject = await prisma.project.findFirst({
        where: { id, userId }
      });

      if (!existingProject) {
        throw createError.notFound('Projet non trouvé');
      }

      await prisma.project.delete({
        where: { id }
      });

      return { message: 'Projet supprimé avec succès' };
    } catch (error) {
      if (error instanceof Error && error.message.includes('notFound')) {
        throw error;
      }
      throw createError.internal('Erreur lors de la suppression du projet');
    }
  }

  /**
   * Obtenir les projets mis en avant
   */
  static async getFeaturedProjects(limit: number = 6) {
    try {
      const projects = await prisma.project.findMany({
        where: { featured: true },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { order: 'asc' },
        take: limit
      });

      return projects;
    } catch (error) {
      throw createError.internal('Erreur lors de la récupération des projets mis en avant');
    }
  }

  /**
   * Rechercher des projets
   */
  static async searchProjects(query: string, limit: number = 10) {
    try {
      const projects = await prisma.project.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { technologies: { has: query } }
          ]
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit
      });

      return projects;
    } catch (error) {
      throw createError.internal('Erreur lors de la recherche de projets');
    }
  }

  /**
   * Obtenir les statistiques des projets
   */
  static async getProjectStats(userId?: string) {
    try {
      const where: any = {};

      if (userId) {
        where.userId = userId;
      }

      const [total, featured, thisMonth] = await Promise.all([
        prisma.project.count({ where }),
        prisma.project.count({ where: { ...where, featured: true } }),
        prisma.project.count({
          where: {
            ...where,
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        })
      ]);

      return {
        total,
        featured,
        thisMonth,
        averagePerMonth: total > 0 ? Math.round(total / Math.max(1, Math.floor((Date.now() - new Date(2024, 0, 1).getTime()) / (1000 * 60 * 60 * 24 * 30)))) : 0
      };
    } catch (error) {
      throw createError.internal('Erreur lors de la récupération des statistiques');
    }
  }

  /**
   * Réorganiser l'ordre des projets
   */
  static async reorderProjects(projectIds: string[], userId: string) {
    try {
      // Vérifier que tous les projets appartiennent à l'utilisateur
      const projects = await prisma.project.findMany({
        where: {
          id: { in: projectIds },
          userId
        }
      });

      if (projects.length !== projectIds.length) {
        throw createError.badRequest('Certains projets n\'existent pas ou ne vous appartiennent pas');
      }

      // Mettre à jour l'ordre de chaque projet
      const updates = projectIds.map((id, index) =>
        prisma.project.update({
          where: { id },
          data: { order: index }
        })
      );

      await prisma.$transaction(updates);

      return { message: 'Ordre des projets mis à jour avec succès' };
    } catch (error) {
      if (error instanceof Error && error.message.includes('badRequest')) {
        throw error;
      }
      throw createError.internal('Erreur lors de la réorganisation des projets');
    }
  }
}
