import request from 'supertest';
import app from '../../src/index';

describe('Project Routes', () => {
  describe('GET /api/projects', () => {
    it('should return all projects', async () => {
      const response = await request(app)
        .get('/api/projects')
        .expect(200);

      expect(response.body).toHaveProperty('projects');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.projects)).toBe(true);
      expect(typeof response.body.total).toBe('number');
    });

    it('should filter projects by category', async () => {
      const response = await request(app)
        .get('/api/projects?category=web')
        .expect(200);

      expect(response.body).toHaveProperty('projects');
      expect(Array.isArray(response.body.projects)).toBe(true);
    });

    it('should search projects by title', async () => {
      const response = await request(app)
        .get('/api/projects?search=Test')
        .expect(200);

      expect(response.body).toHaveProperty('projects');
      expect(Array.isArray(response.body.projects)).toBe(true);
    });
  });

  describe('GET /api/projects/stats', () => {
    it('should return project statistics', async () => {
      const response = await request(app)
        .get('/api/projects/stats')
        .expect(200);

      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('featured');
      expect(typeof response.body.total).toBe('number');
      expect(typeof response.body.featured).toBe('number');
    });
  });

  describe('POST /api/projects (Protected)', () => {
    it('should return 401 without token', async () => {
      const projectData = {
        title: 'New Project',
        description: 'New Description',
        technologies: ['React'],
        category: 'web',
      };

      const response = await request(app)
        .post('/api/projects')
        .send(projectData)
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/projects/:id (Protected)', () => {
    it('should return 401 without token', async () => {
      const updateData = {
        title: 'Updated Project',
      };

      const response = await request(app)
        .put('/api/projects/1')
        .send(updateData)
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/projects/:id (Protected)', () => {
    it('should return 401 without token', async () => {
      const response = await request(app)
        .delete('/api/projects/1')
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });
});