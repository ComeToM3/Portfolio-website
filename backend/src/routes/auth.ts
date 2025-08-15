import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middleware/validation';
import { authenticateToken, requireUser } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimit';

const router = Router();

// Routes publiques (sans authentification)
router.post('/register', authLimiter, validateRegister, AuthController.register);
router.post('/login', authLimiter, validateLogin, AuthController.login);

// Routes protégées (avec authentification)
router.post('/logout', authenticateToken, AuthController.logout);
router.post('/refresh', authenticateToken, AuthController.refreshToken);
router.get('/profile', authenticateToken, AuthController.getProfile);
router.put('/change-password', authenticateToken, requireUser, AuthController.changePassword);
router.get('/verify', authenticateToken, AuthController.verifyAuth);

export default router;
