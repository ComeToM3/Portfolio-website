import { Request, Response } from 'express';
import { NotificationService } from '../services/notificationService';
import { WebhookService } from '../services/webhookService';
import { logger } from '../utils/logger';

export class NotificationController {
  /**
   * S'abonner aux notifications push
   */
  static async subscribeToPushNotifications(req: Request, res: Response): Promise<void> {
    try {
      const { subscription, userId } = req.body;

      if (!subscription || !subscription.endpoint || !subscription.keys) {
        res.status(400).json({
          success: false,
          message: 'Subscription data is required',
        });
        return;
      }

      // Valider la subscription
      const isValid = await NotificationService.validateSubscription(subscription);
      if (!isValid) {
        res.status(400).json({
          success: false,
          message: 'Invalid subscription data',
        });
        return;
      }

      // Ici on pourrait sauvegarder la subscription en base de données
      // avec l'userId pour les notifications personnalisées

      logger.info('Push notification subscription successful', { userId });

      res.status(200).json({
        success: true,
        message: 'Successfully subscribed to push notifications',
      });
    } catch (error) {
      logger.error('Error subscribing to push notifications:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Se désabonner des notifications push
   */
  static async unsubscribeFromPushNotifications(req: Request, res: Response): Promise<void> {
    try {
      const { subscription, userId } = req.body;

      if (!subscription || !subscription.endpoint) {
        res.status(400).json({
          success: false,
          message: 'Subscription data is required',
        });
        return;
      }

      // Ici on pourrait supprimer la subscription de la base de données

      logger.info('Push notification unsubscription successful', { userId });

      res.status(200).json({
        success: true,
        message: 'Successfully unsubscribed from push notifications',
      });
    } catch (error) {
      logger.error('Error unsubscribing from push notifications:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Envoyer une notification de test
   */
  static async sendTestNotification(req: Request, res: Response): Promise<void> {
    try {
      const { subscription } = req.body;

      if (!subscription) {
        res.status(400).json({
          success: false,
          message: 'Subscription is required',
        });
        return;
      }

      const success = await NotificationService.sendNotification(subscription, {
        title: 'Test Notification',
        body: 'Ceci est une notification de test depuis Hordearii !',
        icon: '/icons/icon-192x192.png',
        tag: 'test',
      });

      if (success) {
        res.status(200).json({
          success: true,
          message: 'Test notification sent successfully',
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to send test notification',
        });
      }
    } catch (error) {
      logger.error('Error sending test notification:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Obtenir les clés VAPID publiques
   */
  static async getVAPIDPublicKey(_req: Request, res: Response): Promise<void> {
    try {
      const publicKey = NotificationService.getVAPIDPublicKey();

      res.status(200).json({
        success: true,
        publicKey,
      });
    } catch (error) {
      logger.error('Error getting VAPID public key:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Obtenir les statistiques des notifications
   */
  static async getNotificationStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = NotificationService.getStats();

      res.status(200).json({
        success: true,
        stats,
      });
    } catch (error) {
      logger.error('Error getting notification stats:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Enregistrer un endpoint webhook
   */
  static async registerWebhookEndpoint(req: Request, res: Response): Promise<void> {
    try {
      const { url, secret, events } = req.body;

      if (!url || !secret || !events || !Array.isArray(events)) {
        res.status(400).json({
          success: false,
          message: 'URL, secret, and events array are required',
        });
        return;
      }

      const endpointId = WebhookService.registerEndpoint({
        url,
        secret,
        events,
        isActive: true,
        retryCount: 0,
      });

      logger.info('Webhook endpoint registered', { endpointId, url });

      res.status(201).json({
        success: true,
        message: 'Webhook endpoint registered successfully',
        endpointId,
      });
    } catch (error) {
      logger.error('Error registering webhook endpoint:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Supprimer un endpoint webhook
   */
  static async unregisterWebhookEndpoint(req: Request, res: Response): Promise<void> {
    try {
      const { endpointId } = req.params;

      const success = WebhookService.unregisterEndpoint(endpointId!);

      if (success) {
        res.status(200).json({
          success: true,
          message: 'Webhook endpoint unregistered successfully',
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Webhook endpoint not found',
        });
      }
    } catch (error) {
      logger.error('Error unregistering webhook endpoint:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Obtenir les endpoints webhook
   */
  static async getWebhookEndpoints(_req: Request, res: Response): Promise<void> {
    try {
      const endpoints = WebhookService.getEndpoints();

      res.status(200).json({
        success: true,
        endpoints,
      });
    } catch (error) {
      logger.error('Error getting webhook endpoints:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Obtenir les livraisons webhook
   */
  static async getWebhookDeliveries(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query['limit'] as string) || 100;
      const deliveries = WebhookService.getDeliveries(limit);

      res.status(200).json({
        success: true,
        deliveries,
      });
    } catch (error) {
      logger.error('Error getting webhook deliveries:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Obtenir les statistiques des webhooks
   */
  static async getWebhookStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = WebhookService.getStats();

      res.status(200).json({
        success: true,
        stats,
      });
    } catch (error) {
      logger.error('Error getting webhook stats:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Envoyer un webhook de test
   */
  static async sendTestWebhook(req: Request, res: Response): Promise<void> {
    try {
      const { event, data, targetEndpoints } = req.body;

      if (!event || !data) {
        res.status(400).json({
          success: false,
          message: 'Event and data are required',
        });
        return;
      }

      const result = await WebhookService.sendWebhook(event, data, targetEndpoints);

      res.status(200).json({
        success: true,
        message: 'Test webhook sent',
        result,
      });
    } catch (error) {
      logger.error('Error sending test webhook:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Nettoyer les anciennes livraisons webhook
   */
  static async cleanupWebhookDeliveries(req: Request, res: Response): Promise<void> {
    try {
      const daysToKeep = parseInt(req.query['days'] as string) || 30;
      const deletedCount = WebhookService.cleanupOldDeliveries(daysToKeep);

      res.status(200).json({
        success: true,
        message: `Cleaned up ${deletedCount} old webhook deliveries`,
        deletedCount,
      });
    } catch (error) {
      logger.error('Error cleaning up webhook deliveries:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}
