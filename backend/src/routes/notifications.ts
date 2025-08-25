import { Router } from 'express';
import { NotificationController } from '../controllers/notificationController';
import { authenticateToken } from '../middleware/auth';
import { generalLimiter } from '../middleware/rateLimit';

const router = Router();

// Routes pour notifications push
router.post('/push/subscribe', generalLimiter, NotificationController.subscribeToPushNotifications);
router.post('/push/unsubscribe', generalLimiter, NotificationController.unsubscribeFromPushNotifications);
router.post('/push/test', generalLimiter, NotificationController.sendTestNotification);
router.get('/push/vapid-key', NotificationController.getVAPIDPublicKey);
router.get('/push/stats', authenticateToken, NotificationController.getNotificationStats);

// Routes pour webhooks
router.post('/webhooks/register', authenticateToken, NotificationController.registerWebhookEndpoint);
router.delete('/webhooks/:endpointId', authenticateToken, NotificationController.unregisterWebhookEndpoint);
router.get('/webhooks/endpoints', authenticateToken, NotificationController.getWebhookEndpoints);
router.get('/webhooks/deliveries', authenticateToken, NotificationController.getWebhookDeliveries);
router.get('/webhooks/stats', authenticateToken, NotificationController.getWebhookStats);
router.post('/webhooks/test', authenticateToken, NotificationController.sendTestWebhook);
router.delete('/webhooks/cleanup', authenticateToken, NotificationController.cleanupWebhookDeliveries);

export default router;
