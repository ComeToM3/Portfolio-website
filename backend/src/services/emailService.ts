import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger';

export interface EmailTemplate {
  subject: string;
  template: string;
  data: Record<string, any>;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

export class EmailService {
  private static transporter: nodemailer.Transporter;
  private static templatesDir = path.join(__dirname, '../templates/emails');

  /**
   * Initialise le service d'email
   */
  static async initialize(): Promise<void> {
    try {
      // Configuration du transporteur
      this.transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Vérifier la connexion
      await this.transporter.verify();
      logger.info('Email service initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize email service:', error);
      throw error;
    }
  }

  /**
   * Charge un template Handlebars
   */
  private static loadTemplate(templateName: string): string {
    const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templateName}`);
    }

    return fs.readFileSync(templatePath, 'utf-8');
  }

  /**
   * Compile un template avec des données
   */
  private static compileTemplate(templateName: string, data: Record<string, any>): string {
    const template = this.loadTemplate(templateName);
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(data);
  }

  /**
   * Envoie un email
   */
  static async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@hordearii.ca',
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments,
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${options.to}`, { messageId: result.messageId });
      return true;
    } catch (error) {
      logger.error('Failed to send email:', error);
      return false;
    }
  }

  /**
   * Envoie un email avec template
   */
  static async sendTemplateEmail(
    to: string,
    templateName: string,
    data: Record<string, any>
  ): Promise<boolean> {
    try {
      const html = this.compileTemplate(templateName, data);
      const subject = data.subject || 'Message from Hordearii';
      
      return await this.sendEmail({
        to,
        subject,
        html,
        text: this.stripHtml(html),
      });
    } catch (error) {
      logger.error(`Failed to send template email (${templateName}):`, error);
      return false;
    }
  }

  /**
   * Envoie un email de bienvenue
   */
  static async sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean> {
    return this.sendTemplateEmail(userEmail, 'welcome', {
      subject: 'Bienvenue sur Hordearii !',
      userName,
      currentYear: new Date().getFullYear(),
    });
  }

  /**
   * Envoie un email de confirmation de contact
   */
  static async sendContactConfirmation(
    userEmail: string,
    userName: string,
    message: string
  ): Promise<boolean> {
    return this.sendTemplateEmail(userEmail, 'contact-confirmation', {
      subject: 'Confirmation de votre message - Hordearii',
      userName,
      message,
      currentYear: new Date().getFullYear(),
    });
  }

  /**
   * Envoie un email de notification admin
   */
  static async sendAdminNotification(
    adminEmail: string,
    subject: string,
    content: string
  ): Promise<boolean> {
    return this.sendTemplateEmail(adminEmail, 'admin-notification', {
      subject,
      content,
      timestamp: new Date().toISOString(),
      currentYear: new Date().getFullYear(),
    });
  }

  /**
   * Envoie un email de récupération de mot de passe
   */
  static async sendPasswordReset(
    userEmail: string,
    resetToken: string,
    userName: string
  ): Promise<boolean> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    return this.sendTemplateEmail(userEmail, 'password-reset', {
      subject: 'Réinitialisation de votre mot de passe - Hordearii',
      userName,
      resetUrl,
      currentYear: new Date().getFullYear(),
    });
  }

  /**
   * Envoie un email de notification de projet
   */
  static async sendProjectNotification(
    userEmail: string,
    projectTitle: string,
    action: 'created' | 'updated' | 'deleted'
  ): Promise<boolean> {
    const actionText = {
      created: 'créé',
      updated: 'mis à jour',
      deleted: 'supprimé',
    };

    return this.sendTemplateEmail(userEmail, 'project-notification', {
      subject: `Projet ${actionText[action]} - Hordearii`,
      projectTitle,
      action: actionText[action],
      currentYear: new Date().getFullYear(),
    });
  }

  /**
   * Convertit HTML en texte brut
   */
  private static stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
  }

  /**
   * Vérifie la configuration email
   */
  static async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      logger.error('Email service connection test failed:', error);
      return false;
    }
  }

  /**
   * Ferme la connexion email
   */
  static async close(): Promise<void> {
    if (this.transporter) {
      await this.transporter.close();
      logger.info('Email service connection closed');
    }
  }
}
