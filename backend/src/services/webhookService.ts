import crypto from 'crypto';
import { logger } from '../utils/logger';

export interface WebhookPayload {
  event: string;
  data: Record<string, any>;
  timestamp: string;
  id: string;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  secret: string;
  events: string[];
  isActive: boolean;
  retryCount: number;
  lastDelivery?: Date;
  lastError?: string;
}

export interface WebhookDelivery {
  id: string;
  endpointId: string;
  event: string;
  payload: WebhookPayload;
  status: 'pending' | 'delivered' | 'failed';
  attempts: number;
  maxAttempts: number;
  nextRetry?: Date;
  createdAt: Date;
  deliveredAt?: Date;
  error?: string;
}

export class WebhookService {
  private static endpoints: Map<string, WebhookEndpoint> = new Map();
  private static deliveries: Map<string, WebhookDelivery> = new Map();
  private static retryDelays = [1000, 5000, 15000, 60000, 300000]; // 1s, 5s, 15s, 1m, 5m

  /**
   * Enregistre un endpoint webhook
   */
  static registerEndpoint(endpoint: Omit<WebhookEndpoint, 'id'>): string {
    const id = crypto.randomUUID();
    const newEndpoint: WebhookEndpoint = {
      ...endpoint,
      id,
      retryCount: 0,
    };

    this.endpoints.set(id, newEndpoint);
    logger.info(`Webhook endpoint registered: ${endpoint.url}`, { endpointId: id });
    
    return id;
  }

  /**
   * Supprime un endpoint webhook
   */
  static unregisterEndpoint(endpointId: string): boolean {
    const endpoint = this.endpoints.get(endpointId);
    if (!endpoint) {
      return false;
    }

    this.endpoints.delete(endpointId);
    logger.info(`Webhook endpoint unregistered: ${endpoint.url}`, { endpointId });
    
    return true;
  }

  /**
   * Met à jour un endpoint webhook
   */
  static updateEndpoint(endpointId: string, updates: Partial<WebhookEndpoint>): boolean {
    const endpoint = this.endpoints.get(endpointId);
    if (!endpoint) {
      return false;
    }

    const updatedEndpoint = { ...endpoint, ...updates };
    this.endpoints.set(endpointId, updatedEndpoint);
    
    logger.info(`Webhook endpoint updated: ${endpoint.url}`, { endpointId });
    return true;
  }

  /**
   * Envoie un webhook
   */
  static async sendWebhook(
    event: string,
    data: Record<string, any>,
    targetEndpoints?: string[]
  ): Promise<{ success: number; failed: number }> {
    const payload: WebhookPayload = {
      event,
      data,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID(),
    };

    // Filtrer les endpoints par événement et statut
    const endpoints = Array.from(this.endpoints.values()).filter(endpoint => {
      if (!endpoint.isActive) return false;
      if (targetEndpoints && !targetEndpoints.includes(endpoint.id)) return false;
      return endpoint.events.includes(event) || endpoint.events.includes('*');
    });

    if (endpoints.length === 0) {
      logger.info(`No active webhook endpoints for event: ${event}`);
      return { success: 0, failed: 0 };
    }

    // Envoyer aux endpoints
    const results = await Promise.allSettled(
      endpoints.map(endpoint => this.deliverWebhook(endpoint, payload))
    );

    const success = results.filter(r => r.status === 'fulfilled' && r.value).length;
    const failed = results.length - success;

    logger.info(`Webhook sent for event ${event}: ${success} success, ${failed} failed`);

    return { success, failed };
  }

  /**
   * Livre un webhook à un endpoint spécifique
   */
  private static async deliverWebhook(
    endpoint: WebhookEndpoint,
    payload: WebhookPayload
  ): Promise<boolean> {
    const deliveryId = crypto.randomUUID();
    const delivery: WebhookDelivery = {
      id: deliveryId,
      endpointId: endpoint.id,
      event: payload.event,
      payload,
      status: 'pending',
      attempts: 0,
      maxAttempts: 5,
      createdAt: new Date(),
    };

    this.deliveries.set(deliveryId, delivery);

    try {
      const signature = this.generateSignature(payload, endpoint.secret);
      
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Hordearii-Webhook/1.0',
          'X-Webhook-Signature': signature,
          'X-Webhook-Event': payload.event,
          'X-Webhook-ID': payload.id,
          'X-Webhook-Timestamp': payload.timestamp,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(30000), // 30 secondes timeout
      });

      if (response.ok) {
        delivery.status = 'delivered';
        delivery.deliveredAt = new Date();
        endpoint.lastDelivery = new Date();
        endpoint.retryCount = 0;
        
        logger.info(`Webhook delivered successfully to ${endpoint.url}`, {
          deliveryId,
          endpointId: endpoint.id,
          statusCode: response.status,
        });
        
        return true;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error: any) {
      delivery.attempts += 1;
      delivery.error = error.message;
      endpoint.lastError = error.message;

      if (delivery.attempts < delivery.maxAttempts) {
        delivery.status = 'pending';
        delivery.nextRetry = this.calculateNextRetry(delivery.attempts);
        
        // Programmer la retry
        setTimeout(() => {
          this.retryDelivery(deliveryId);
        }, this.retryDelays[delivery.attempts - 1]);
        
        logger.warn(`Webhook delivery failed, retry scheduled`, {
          deliveryId,
          endpointId: endpoint.id,
          attempts: delivery.attempts,
          error: error.message,
        });
      } else {
        delivery.status = 'failed';
        logger.error(`Webhook delivery failed permanently`, {
          deliveryId,
          endpointId: endpoint.id,
          attempts: delivery.attempts,
          error: error.message,
        });
      }

      return false;
    } finally {
      this.deliveries.set(deliveryId, delivery);
    }
  }

  /**
   * Retry d'une livraison échouée
   */
  private static async retryDelivery(deliveryId: string): Promise<void> {
    const delivery = this.deliveries.get(deliveryId);
    if (!delivery || delivery.status !== 'pending') {
      return;
    }

    const endpoint = this.endpoints.get(delivery.endpointId);
    if (!endpoint || !endpoint.isActive) {
      delivery.status = 'failed';
      delivery.error = 'Endpoint inactive or not found';
      this.deliveries.set(deliveryId, delivery);
      return;
    }

    await this.deliverWebhook(endpoint, delivery.payload);
  }

  /**
   * Calcule le prochain retry
   */
  private static calculateNextRetry(attempt: number): Date {
    const index = Math.min(attempt - 1, this.retryDelays.length - 1);
    const delay = this.retryDelays[index] ?? this.retryDelays[this.retryDelays.length - 1] ?? 300000;
    return new Date(Date.now() + delay);
  }

  /**
   * Génère la signature du webhook
   */
  private static generateSignature(payload: WebhookPayload, secret: string): string {
    const payloadString = JSON.stringify(payload);
    return crypto
      .createHmac('sha256', secret)
      .update(payloadString)
      .digest('hex');
  }

  /**
   * Vérifie la signature d'un webhook reçu
   */
  static verifySignature(
    payload: string,
    signature: string,
    secret: string
  ): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }

  /**
   * Webhook pour nouveau projet
   */
  static async sendProjectCreatedWebhook(project: any): Promise<{ success: number; failed: number }> {
    return this.sendWebhook('project.created', {
      project: {
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        featured: project.featured,
        createdAt: project.createdAt,
      },
    });
  }

  /**
   * Webhook pour projet mis à jour
   */
  static async sendProjectUpdatedWebhook(project: any, changes: Record<string, any>): Promise<{ success: number; failed: number }> {
    return this.sendWebhook('project.updated', {
      project: {
        id: project.id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        featured: project.featured,
        updatedAt: project.updatedAt,
      },
      changes,
    });
  }

  /**
   * Webhook pour nouveau contact
   */
  static async sendContactCreatedWebhook(contact: any): Promise<{ success: number; failed: number }> {
    return this.sendWebhook('contact.created', {
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        createdAt: contact.createdAt,
      },
    });
  }

  /**
   * Webhook pour nouvel utilisateur
   */
  static async sendUserRegisteredWebhook(user: any): Promise<{ success: number; failed: number }> {
    return this.sendWebhook('user.registered', {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  }

  /**
   * Webhook pour maintenance
   */
  static async sendMaintenanceWebhook(
    type: 'started' | 'completed' | 'scheduled',
    details: Record<string, any>
  ): Promise<{ success: number; failed: number }> {
    return this.sendWebhook(`maintenance.${type}`, {
      maintenance: {
        type,
        details,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Obtient les statistiques des webhooks
   */
  static getStats(): {
    endpoints: number;
    activeEndpoints: number;
    pendingDeliveries: number;
    failedDeliveries: number;
    totalDeliveries: number;
  } {
    const endpoints = Array.from(this.endpoints.values());
    const deliveries = Array.from(this.deliveries.values());

    return {
      endpoints: endpoints.length,
      activeEndpoints: endpoints.filter(e => e.isActive).length,
      pendingDeliveries: deliveries.filter(d => d.status === 'pending').length,
      failedDeliveries: deliveries.filter(d => d.status === 'failed').length,
      totalDeliveries: deliveries.length,
    };
  }

  /**
   * Obtient les endpoints
   */
  static getEndpoints(): WebhookEndpoint[] {
    return Array.from(this.endpoints.values());
  }

  /**
   * Obtient les livraisons
   */
  static getDeliveries(limit = 100): WebhookDelivery[] {
    return Array.from(this.deliveries.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Nettoie les anciennes livraisons
   */
  static cleanupOldDeliveries(daysToKeep = 30): number {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
    let deletedCount = 0;

    for (const [id, delivery] of this.deliveries.entries()) {
      if (delivery.createdAt < cutoffDate) {
        this.deliveries.delete(id);
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      logger.info(`Cleaned up ${deletedCount} old webhook deliveries`);
    }

    return deletedCount;
  }
}
