import webpush from 'web-push';
import { logger } from '../utils/logger';

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: Record<string, any>;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

export class NotificationService {
  private static isInitialized = false;

  /**
   * Initialise le service de notifications push
   */
  static initialize(): void {
    if (this.isInitialized) {
      return;
    }

    // Générer les clés VAPID si elles n'existent pas
    if (!process.env['VAPID_PUBLIC_KEY'] || !process.env['VAPID_PRIVATE_KEY']) {
      const vapidKeys = webpush.generateVAPIDKeys();
      
      logger.info('VAPID keys generated. Add these to your .env file:');
      logger.info(`VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`);
      logger.info(`VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`);
      
      // En développement, utiliser les clés générées
      process.env['VAPID_PUBLIC_KEY'] = vapidKeys.publicKey;
      process.env['VAPID_PRIVATE_KEY'] = vapidKeys.privateKey;
    }

    // Configurer web-push
    webpush.setVapidDetails(
      `mailto:${process.env['SMTP_FROM'] || 'noreply@hordearii.ca'}`,
      process.env['VAPID_PUBLIC_KEY']!,
      process.env['VAPID_PRIVATE_KEY']!
    );

    this.isInitialized = true;
    logger.info('Notification service initialized successfully');
  }

  /**
   * Envoie une notification push
   */
  static async sendNotification(
    subscription: PushSubscription,
    payload: NotificationPayload
  ): Promise<boolean> {
    try {
      this.initialize();

      const pushPayload = JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
      });

      const result = await webpush.sendNotification(subscription, pushPayload);
      
      logger.info('Push notification sent successfully', {
        statusCode: result.statusCode,
        headers: result.headers,
      });

      return result.statusCode === 200;
    } catch (error: any) {
      logger.error('Failed to send push notification:', error);
      
      // Gérer les erreurs spécifiques
      if (error.statusCode === 410) {
        logger.warn('Subscription expired or invalid');
        // Ici on pourrait supprimer la subscription de la base de données
      }
      
      return false;
    }
  }

  /**
   * Envoie une notification à plusieurs abonnés
   */
  static async sendNotificationToMany(
    subscriptions: PushSubscription[],
    payload: NotificationPayload
  ): Promise<{ success: number; failed: number }> {
    const results = await Promise.allSettled(
      subscriptions.map(sub => this.sendNotification(sub, payload))
    );

    const success = results.filter(r => r.status === 'fulfilled' && r.value).length;
    const failed = results.length - success;

    logger.info(`Bulk notification sent: ${success} success, ${failed} failed`);

    return { success, failed };
  }

  /**
   * Notification de bienvenue
   */
  static async sendWelcomeNotification(subscription: PushSubscription, userName: string): Promise<boolean> {
    return this.sendNotification(subscription, {
      title: 'Bienvenue sur Hordearii !',
      body: `Bonjour ${userName}, merci de vous être inscrit !`,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'welcome',
      data: {
        type: 'welcome',
        userId: userName,
      },
    });
  }

  /**
   * Notification de nouveau projet
   */
  static async sendNewProjectNotification(
    subscriptions: PushSubscription[],
    projectTitle: string,
    projectDescription: string
  ): Promise<{ success: number; failed: number }> {
    return this.sendNotificationToMany(subscriptions, {
      title: 'Nouveau projet disponible !',
      body: `${projectTitle}: ${projectDescription}`,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      image: '/projects/default-project.jpg',
      tag: 'new-project',
      data: {
        type: 'new-project',
        projectTitle,
        projectDescription,
      },
      actions: [
        {
          action: 'view',
          title: 'Voir le projet',
          icon: '/icons/view-72x72.png',
        },
      ],
    });
  }

  /**
   * Notification de mise à jour de projet
   */
  static async sendProjectUpdateNotification(
    subscriptions: PushSubscription[],
    projectTitle: string,
    updateType: 'featured' | 'updated' | 'completed'
  ): Promise<{ success: number; failed: number }> {
    const messages = {
      featured: 'a été mis en vedette !',
      updated: 'a été mis à jour !',
      completed: 'a été complété !',
    };

    return this.sendNotificationToMany(subscriptions, {
      title: 'Mise à jour de projet',
      body: `${projectTitle} ${messages[updateType]}`,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'project-update',
      data: {
        type: 'project-update',
        projectTitle,
        updateType,
      },
    });
  }

  /**
   * Notification de nouveau message de contact
   */
  static async sendContactNotification(
    adminSubscriptions: PushSubscription[],
    contactName: string,
    contactEmail: string
  ): Promise<{ success: number; failed: number }> {
    return this.sendNotificationToMany(adminSubscriptions, {
      title: 'Nouveau message de contact',
      body: `Message de ${contactName} (${contactEmail})`,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'new-contact',
      data: {
        type: 'new-contact',
        contactName,
        contactEmail,
      },
      actions: [
        {
          action: 'reply',
          title: 'Répondre',
          icon: '/icons/reply-72x72.png',
        },
      ],
    });
  }

  /**
   * Notification de maintenance
   */
  static async sendMaintenanceNotification(
    subscriptions: PushSubscription[],
    message: string,
    scheduledTime?: string
  ): Promise<{ success: number; failed: number }> {
    const body = scheduledTime 
      ? `Maintenance prévue le ${scheduledTime}: ${message}`
      : `Maintenance en cours: ${message}`;

    return this.sendNotificationToMany(subscriptions, {
      title: 'Maintenance Hordearii',
      body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'maintenance',
      data: {
        type: 'maintenance',
        message,
        scheduledTime,
      },
    });
  }

  /**
   * Notification de sécurité
   */
  static async sendSecurityNotification(
    subscriptions: PushSubscription[],
    alertType: 'login' | 'password-change' | 'suspicious-activity',
    details: string
  ): Promise<{ success: number; failed: number }> {
    const titles = {
      login: 'Nouvelle connexion',
      'password-change': 'Mot de passe modifié',
      'suspicious-activity': 'Activité suspecte détectée',
    };

    return this.sendNotificationToMany(subscriptions, {
      title: titles[alertType],
      body: details,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'security-alert',
      data: {
        type: 'security-alert',
        alertType,
        details,
      },
    });
  }

  /**
   * Vérifie la validité d'une subscription
   */
  static async validateSubscription(subscription: PushSubscription): Promise<boolean> {
    try {
      this.initialize();
      
      // Envoyer une notification de test
      const result = await webpush.sendNotification(
        subscription,
        JSON.stringify({ title: 'Test', body: 'Test notification' })
      );
      
      return result.statusCode === 200;
    } catch (error: any) {
      if (error.statusCode === 410) {
        logger.warn('Subscription is invalid or expired');
        return false;
      }
      
      logger.error('Error validating subscription:', error);
      return false;
    }
  }

  /**
   * Obtient les clés VAPID publiques
   */
  static getVAPIDPublicKey(): string {
    this.initialize();
    return process.env['VAPID_PUBLIC_KEY']!;
  }

  /**
   * Statistiques des notifications
   */
  static getStats(): { isInitialized: boolean; vapidPublicKey: string | null } {
    return {
      isInitialized: this.isInitialized,
      vapidPublicKey: process.env['VAPID_PUBLIC_KEY'] || null,
    };
  }
}
