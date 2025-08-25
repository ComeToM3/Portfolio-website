import request from 'supertest';
import app from '../../src/index';

describe('Auth Routes', () => {

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Password123', // Respecte les règles : majuscule, minuscule, chiffre
        name: 'Test User',
      };

      // Test avec données valides

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: '123', // too short
        name: '',
        role: 'INVALID_ROLE',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 409 if user already exists', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'Password123', // Respecte les règles : majuscule, minuscule, chiffre
        name: 'Test User',
      };

      // Test avec utilisateur existant

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('details');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user successfully with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'Password123', // Respecte les règles : majuscule, minuscule, chiffre
      };

      // Test avec données valides

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
    });

    it('should return 401 for invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'WrongPass123', // Respecte les règles mais mauvais mot de passe
      };

      // Test avec mauvais mot de passe

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 404 for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'Password123', // Respecte les règles
      };

      // Test avec utilisateur inexistant

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout user successfully', async () => {
      const token = 'valid-token';

      // Test avec token valide

      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('message');
    });

    it('should return 401 for invalid token', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/auth/profile', () => {
    it('should return user profile with valid token', async () => {
      const token = 'valid-token';
      // Test avec token valide

      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('data');
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });
});
