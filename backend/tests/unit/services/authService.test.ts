// Import dynamique pour éviter les problèmes de résolution
let AuthService: any;
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock Prisma
jest.mock('@prisma/client');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockPrisma = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  session: {
    create: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
} as any;

(PrismaClient as jest.MockedClass<typeof PrismaClient>).mockImplementation(() => mockPrisma);

describe('AuthService', () => {
  beforeAll(async () => {
    const module = await import('../../../src/services/authService');
    AuthService = module.AuthService;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'USER' as const,
      };

      const hashedPassword = 'hashedPassword123';
      const mockUser = {
        id: '1',
        email: userData.email,
        name: userData.name,
        role: userData.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrisma.user.create.mockResolvedValue(mockUser);
      mockPrisma.session.create.mockResolvedValue({ id: 'session1' });

      const result = await AuthService.register(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 12);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: userData.email,
          password: hashedPassword,
          name: userData.name,
          role: userData.role,
        },
      });
      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
        },
        message: 'User registered successfully',
      });
    });

    it('should throw error if user already exists', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'USER' as const,
      };

      mockPrisma.user.findUnique.mockResolvedValue({ id: '1' });

      await expect(AuthService.register(userData)).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should login user successfully with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: '1',
        email: loginData.email,
        password: 'hashedPassword123',
        name: 'Test User',
        role: 'USER' as const,
      };

      const mockToken = 'jwt-token-123';

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);
      mockPrisma.session.create.mockResolvedValue({ id: 'session1' });

      const result = await AuthService.login(loginData);

      expect(bcrypt.compare).toHaveBeenCalledWith(loginData.password, mockUser.password);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
    });

    it('should throw error for invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const mockUser = {
        id: '1',
        email: loginData.email,
        password: 'hashedPassword123',
        name: 'Test User',
        role: 'USER' as const,
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(AuthService.login(loginData)).rejects.toThrow('Invalid credentials');
    });

    it('should throw error for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(AuthService.login(loginData)).rejects.toThrow('User not found');
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token successfully', async () => {
      const token = 'valid-token';
      const mockPayload = {
        id: '1',
        email: 'test@example.com',
        role: 'USER',
      };

      (jwt.verify as jest.Mock).mockReturnValue(mockPayload);
      mockPrisma.session.findUnique.mockResolvedValue({ id: 'session1' });

      const result = await AuthService.verifyToken(token);

      expect(jwt.verify).toHaveBeenCalledWith(token, process.env['JWT_SECRET']);
      expect(result).toEqual(mockPayload);
    });

    it('should throw error for invalid token', async () => {
      const token = 'invalid-token';

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(AuthService.verifyToken(token)).rejects.toThrow('Invalid token');
    });
  });
});
