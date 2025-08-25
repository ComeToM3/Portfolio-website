// Import dynamique pour éviter les problèmes de résolution
let ProjectService: any;
import { PrismaClient } from '@prisma/client';

// Mock Prisma
jest.mock('@prisma/client');

const mockPrisma = {
  project: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
} as any;

(PrismaClient as jest.MockedClass<typeof PrismaClient>).mockImplementation(() => mockPrisma);

describe('ProjectService', () => {
  beforeAll(async () => {
    const module = await import('../../../src/services/projectService');
    ProjectService = module.ProjectService;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProject', () => {
    it('should create a project successfully', async () => {
      const projectData = {
        title: 'Test Project',
        description: 'Test Description',
        technologies: ['React', 'Node.js'],
        githubUrl: 'https://github.com/test/project',
        liveUrl: 'https://test-project.com',
        image: 'test-image.jpg',
        featured: true,
        category: 'web',
        userId: '1',
      };

      const mockProject = {
        id: '1',
        ...projectData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.project.create.mockResolvedValue(mockProject);

      const result = await ProjectService.createProject(projectData);

      expect(mockPrisma.project.create).toHaveBeenCalledWith({
        data: projectData,
      });
      expect(result).toEqual(mockProject);
    });
  });

  describe('getAllProjects', () => {
    it('should return all projects with pagination', async () => {
      const mockProjects = [
        {
          id: '1',
          title: 'Project 1',
          description: 'Description 1',
          technologies: ['React'],
          githubUrl: 'https://github.com/project1',
          liveUrl: 'https://project1.com',
          image: 'image1.jpg',
          featured: true,
          category: 'web',
          userId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Project 2',
          description: 'Description 2',
          technologies: ['Node.js'],
          githubUrl: 'https://github.com/project2',
          liveUrl: 'https://project2.com',
          image: 'image2.jpg',
          featured: false,
          category: 'backend',
          userId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const filters = {
        page: 1,
        limit: 10,
        search: '',
        category: '',
        featured: undefined,
      };

      mockPrisma.project.findMany.mockResolvedValue(mockProjects);
      mockPrisma.project.count.mockResolvedValue(2);

      const result = await ProjectService.getProjects(filters);

      expect(mockPrisma.project.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } },
            { technologies: { hasSome: [filters.search] } },
          ],
          ...(filters.category && { category: filters.category }),
        },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      expect(result.projects).toEqual(mockProjects);
      expect(result.total).toBe(2);
    });

    it('should filter projects by category', async () => {
      const filters = {
        page: 1,
        limit: 10,
        search: '',
        category: 'web',
        featured: undefined,
      };

      mockPrisma.project.findMany.mockResolvedValue([]);
      mockPrisma.project.count.mockResolvedValue(0);

      await ProjectService.getProjects(filters);

      expect(mockPrisma.project.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } },
            { technologies: { hasSome: [filters.search] } },
          ],
          category: 'web',
        },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('getProjectById', () => {
    it('should return a project by id', async () => {
      const projectId = '1';
      const mockProject = {
        id: projectId,
        title: 'Test Project',
        description: 'Test Description',
        technologies: ['React'],
        githubUrl: 'https://github.com/test/project',
        liveUrl: 'https://test-project.com',
        image: 'test-image.jpg',
        featured: true,
        category: 'web',
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.project.findUnique.mockResolvedValue(mockProject);

      const result = await ProjectService.getProjectById(projectId);

      expect(mockPrisma.project.findUnique).toHaveBeenCalledWith({
        where: { id: projectId },
      });
      expect(result).toEqual(mockProject);
    });

    it('should throw error if project not found', async () => {
      const projectId = '999';

      mockPrisma.project.findUnique.mockResolvedValue(null);

      await expect(ProjectService.getProjectById(projectId)).rejects.toThrow('Project not found');
    });
  });

  describe('updateProject', () => {
    it('should update a project successfully', async () => {
      const projectId = '1';
      const updateData = {
        title: 'Updated Project',
        description: 'Updated Description',
      };

      const mockProject = {
        id: projectId,
        ...updateData,
        technologies: ['React'],
        githubUrl: 'https://github.com/test/project',
        liveUrl: 'https://test-project.com',
        image: 'test-image.jpg',
        featured: true,
        category: 'web',
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.project.update.mockResolvedValue(mockProject);

      const result = await ProjectService.updateProject(projectId, updateData);

      expect(mockPrisma.project.update).toHaveBeenCalledWith({
        where: { id: projectId },
        data: updateData,
      });
      expect(result).toEqual(mockProject);
    });
  });

  describe('deleteProject', () => {
    it('should delete a project successfully', async () => {
      const projectId = '1';

      mockPrisma.project.delete.mockResolvedValue({ id: projectId });

      const result = await ProjectService.deleteProject(projectId);

      expect(mockPrisma.project.delete).toHaveBeenCalledWith({
        where: { id: projectId },
      });
      expect(result).toEqual({ message: 'Project deleted successfully' });
    });
  });

  describe('getProjectStats', () => {
    it('should return project statistics', async () => {
      // Mock stats for testing

      mockPrisma.project.count.mockResolvedValueOnce(10); // total
      mockPrisma.project.count.mockResolvedValueOnce(3); // featured
      mockPrisma.project.findMany.mockResolvedValue([
        { category: 'web' },
        { category: 'web' },
        { category: 'mobile' },
        { category: 'backend' },
      ]);

      const result = await ProjectService.getProjectStats();

      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('featured');
      expect(result).toHaveProperty('byCategory');
    });
  });
});
