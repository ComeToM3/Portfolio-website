import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/projectService';
import { asyncHandler } from '../middleware/errorHandler';

export class ProjectController {
  /**
   * Obtenir les projets publics (sans authentification)
   * GET /api/projects/public
   */
  static getPublicProjects = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
    const result = await ProjectService.getProjects({});
    
    return res.status(200).json({
      success: true,
      data: (result as any).projects,
      pagination: (result as any).pagination
    });
  });

  /**
   * Obtenir les projets mis en avant
   * GET /api/projects/featured
   */
  static getFeaturedProjects = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
    const projects = await ProjectService.getFeaturedProjects(6);
    
    return res.status(200).json({
      success: true,
      data: projects
    });
  });

  /**
   * Rechercher des projets
   * GET /api/projects/search
   */
  static searchProjects = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Paramètre de recherche requis'
      });
    }
    
    const projects = await ProjectService.searchProjects(q, 10);
    
    return res.status(200).json({
      success: true,
      data: projects
    });
  });

  /**
   * Obtenir tous les projets avec filtres et pagination
   * GET /api/projects
   */
  static getAllProjects = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { page = 1, limit = 10, search = '', category = '', featured } = req.query;
    
    const filters: any = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      search: search as string,
      category: category as string,
    };
    
    if (featured === 'true') {
      filters.featured = true;
    } else if (featured === 'false') {
      filters.featured = false;
    }
    
    const result = await ProjectService.getProjects(filters);
    
    return res.status(200).json({
      projects: (result as any).projects,
      total: (result as any).pagination.total,
      pagination: (result as any).pagination
    });
  });

  /**
   * Obtenir un projet par son ID
   * GET /api/projects/:id
   */
  static getProjectById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'ID du projet requis' });
    }
    
    const project = await ProjectService.getProjectById(id);
    
    return res.status(200).json(project);
  });

  /**
   * Créer un nouveau projet
   * POST /api/projects
   */
  static createProject = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const projectData = {
      ...req.body,
      userId: (req as any).user?.id,
    };
    
    const project = await ProjectService.createProject(projectData);
    
    return res.status(201).json(project);
  });

  /**
   * Mettre à jour un projet
   * PUT /api/projects/:id
   */
  static updateProject = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }
    
    const project = await ProjectService.updateProject(id as string, updateData, userId as string);
    
    return res.status(200).json(project);
  });

  /**
   * Supprimer un projet
   * DELETE /api/projects/:id
   */
  static deleteProject = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const userId = (req as any).user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }
    
    const result = await ProjectService.deleteProject(id as string, userId as string);
    
    return res.status(200).json(result);
  });

  /**
   * Obtenir les statistiques des projets
   * GET /api/projects/stats
   */
  static getProjectStats = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
    const stats = await ProjectService.getProjectStats();
    
    return res.status(200).json(stats);
  });

  /**
   * Réorganiser l'ordre des projets
   * POST /api/projects/reorder
   */
  static reorderProjects = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { projectIds } = req.body;
    const userId = (req as any).user?.id;
    
    const result = await ProjectService.reorderProjects(projectIds, userId);
    
    return res.status(200).json(result);
  });
}
