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
      data: result.projects,
      pagination: result.pagination
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
}
