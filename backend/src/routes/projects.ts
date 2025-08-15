import { Router } from 'express';
import { ProjectController } from '../controllers/projectController';
import { apiLimiter } from '../middleware/rateLimit';

const router = Router();

// Routes publiques (sans authentification)
router.get('/public', apiLimiter, ProjectController.getPublicProjects);
router.get('/featured', apiLimiter, ProjectController.getFeaturedProjects);
router.get('/search', apiLimiter, ProjectController.searchProjects);

export default router;
