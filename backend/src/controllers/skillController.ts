import { Request, Response, NextFunction } from 'express';
import { SkillService } from '../services/skillService';
import { asyncHandler } from '../middleware/errorHandler';

export class SkillController {
  /**
   * Obtenir les compétences publiques (sans authentification)
   * GET /api/skills/public
   */
  static getPublicSkills = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
    const result = await SkillService.getSkills({});
    
    return res.status(200).json({
      success: true,
      data: result.skills,
      pagination: result.pagination
    });
  });

  /**
   * Obtenir les compétences de niveau élevé
   * GET /api/skills/top
   */
  static getTopSkills = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
    const skills = await SkillService.getTopSkills(10, 80);
    
    return res.status(200).json({
      success: true,
      data: skills
    });
  });

  /**
   * Obtenir les compétences par catégorie
   * GET /api/skills/by-category
   */
  static getSkillsByCategory = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
    const groupedSkills = await SkillService.getSkillsByCategory();
    
    return res.status(200).json({
      success: true,
      data: groupedSkills
    });
  });
}
