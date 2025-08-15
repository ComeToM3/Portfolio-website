import { Router } from 'express';
import { SkillController } from '../controllers/skillController';
import { apiLimiter } from '../middleware/rateLimit';

const router = Router();

// Routes publiques (sans authentification)
router.get('/public', apiLimiter, SkillController.getPublicSkills);
router.get('/top', apiLimiter, SkillController.getTopSkills);
router.get('/by-category', apiLimiter, SkillController.getSkillsByCategory);

export default router;
