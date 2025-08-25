import { Router } from 'express';
import { ProjectController } from '../controllers/projectController';
import { apiLimiter } from '../middleware/rateLimit';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// Routes publiques (sans authentification)
router.get('/', apiLimiter, ProjectController.getAllProjects);
router.get('/stats', apiLimiter, ProjectController.getProjectStats);
router.get('/public', apiLimiter, ProjectController.getPublicProjects);
router.get('/featured', apiLimiter, ProjectController.getFeaturedProjects);
router.get('/search', apiLimiter, ProjectController.searchProjects);
router.get('/:id', apiLimiter, ProjectController.getProjectById);

// Routes protégées (avec authentification)
router.post('/', authenticateToken, apiLimiter, ProjectController.createProject);
router.put('/:id', authenticateToken, apiLimiter, ProjectController.updateProject);
router.delete('/:id', authenticateToken, apiLimiter, ProjectController.deleteProject);

// Routes admin
router.post('/reorder', authenticateToken, requireRole(['ADMIN', 'hordearii-app']), apiLimiter, ProjectController.reorderProjects);

export default router;
