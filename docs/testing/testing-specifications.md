# 🧪 TEST SPECIFICATIONS - HORDEARII.CA

## 📋 Vue d'ensemble
Spécifications complètes des tests unitaires, d'intégration et E2E pour assurer la qualité du code et la fiabilité de l'application.

---

## 🎯 STRATÉGIE DE TESTING

### **Pyramide de tests :**
- **70% Tests Unitaires** : Fonctions et composants isolés
- **20% Tests d'Intégration** : API et base de données
- **10% Tests E2E** : Flux utilisateur complets

### **Coverage minimum requis :**
- **Backend** : 85% (lignes de code)
- **Frontend** : 80% (composants et hooks)
- **API** : 90% (endpoints et validations)

---

## 🔧 CONFIGURATION DES TESTS

### **1. Backend Testing (Jest + Supertest)**

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/server.ts',
    '!src/migrations/**'
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testTimeout: 10000
};
```

### **2. Frontend Testing (Jest + React Testing Library)**

```javascript
// jest.config.js (frontend)
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

---

## 📊 TESTS UNITAIRES

### **1. Backend - Services**

#### **UserService Tests**
```typescript
// tests/services/UserService.test.ts
import { UserService } from '../../src/services/UserService';
import { prisma } from '../../src/lib/prisma';
import { hashPassword } from '../../src/utils/auth';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  describe('createUser', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePass123!'
      };

      const user = await userService.createUser(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
      expect(user.password).not.toBe(userData.password); // Should be hashed
    });

    it('should throw error for duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePass123!'
      };

      await userService.createUser(userData);

      await expect(userService.createUser(userData))
        .rejects
        .toThrow('Email already exists');
    });

    it('should validate email format', async () => {
      const userData = {
        email: 'invalid-email',
        name: 'Test User',
        password: 'SecurePass123!'
      };

      await expect(userService.createUser(userData))
        .rejects
        .toThrow('Invalid email format');
    });

    it('should validate password strength', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'weak'
      };

      await expect(userService.createUser(userData))
        .rejects
        .toThrow('Password must be at least 8 characters');
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      const user = await userService.createUser({
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePass123!'
      });

      const foundUser = await userService.getUserById(user.id);

      expect(foundUser).toBeDefined();
      expect(foundUser?.id).toBe(user.id);
    });

    it('should return null for non-existent user', async () => {
      const user = await userService.getUserById('non-existent-id');

      expect(user).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update user data', async () => {
      const user = await userService.createUser({
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePass123!'
      });

      const updatedUser = await userService.updateUser(user.id, {
        name: 'Updated Name',
        profile: { bio: 'Updated bio' }
      });

      expect(updatedUser.name).toBe('Updated Name');
      expect(updatedUser.profile?.bio).toBe('Updated bio');
    });
  });
});
```

#### **AuthService Tests**
```typescript
// tests/services/AuthService.test.ts
import { AuthService } from '../../src/services/AuthService';
import { UserService } from '../../src/services/UserService';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(() => {
    authService = new AuthService();
    userService = new UserService();
  });

  describe('login', () => {
    it('should return JWT token for valid credentials', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePass123!'
      };

      await userService.createUser(userData);

      const result = await authService.login({
        email: userData.email,
        password: userData.password
      });

      expect(result.token).toBeDefined();
      expect(result.user.email).toBe(userData.email);
    });

    it('should throw error for invalid credentials', async () => {
      await expect(authService.login({
        email: 'test@example.com',
        password: 'wrongpassword'
      })).rejects.toThrow('Invalid credentials');
    });
  });

  describe('verifyToken', () => {
    it('should verify valid JWT token', async () => {
      const user = await userService.createUser({
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePass123!'
      });

      const token = authService.generateToken(user);

      const decoded = authService.verifyToken(token);

      expect(decoded.sub).toBe(user.id);
      expect(decoded.email).toBe(user.email);
    });

    it('should throw error for invalid token', () => {
      expect(() => authService.verifyToken('invalid-token'))
        .toThrow('Invalid token');
    });
  });
});
```

### **2. Frontend - Components**

#### **Header Component Tests**
```typescript
// tests/components/Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../src/components/Header';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  it('should render navigation links', () => {
    renderWithRouter(<Header />);

    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Projets')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should toggle mobile menu when hamburger is clicked', () => {
    renderWithRouter(<Header />);

    const hamburger = screen.getByLabelText('Menu');
    const mobileMenu = screen.getByTestId('mobile-menu');

    expect(mobileMenu).toHaveClass('hidden');

    fireEvent.click(hamburger);

    expect(mobileMenu).not.toHaveClass('hidden');
  });

  it('should close mobile menu when link is clicked', () => {
    renderWithRouter(<Header />);

    const hamburger = screen.getByLabelText('Menu');
    const mobileMenu = screen.getByTestId('mobile-menu');
    const homeLink = screen.getByText('Accueil');

    fireEvent.click(hamburger);
    expect(mobileMenu).not.toHaveClass('hidden');

    fireEvent.click(homeLink);
    expect(mobileMenu).toHaveClass('hidden');
  });
});
```

#### **ContactForm Component Tests**
```typescript
// tests/components/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ContactForm from '../../src/components/ContactForm';

const mockSubmit = vi.fn();

describe('ContactForm Component', () => {
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('should render form fields', () => {
    render(<ContactForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText('Nom')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Sujet')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(<ContactForm onSubmit={mockSubmit} />);

    const submitButton = screen.getByText('Envoyer');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Le nom est requis')).toBeInTheDocument();
      expect(screen.getByText('L\'email est requis')).toBeInTheDocument();
      expect(screen.getByText('Le sujet est requis')).toBeInTheDocument();
      expect(screen.getByText('Le message est requis')).toBeInTheDocument();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should validate email format', async () => {
    render(<ContactForm onSubmit={mockSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByText('Envoyer');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Format d\'email invalide')).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    render(<ContactForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Nom'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Sujet'), {
      target: { value: 'Test Subject' }
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Test message content' }
    });

    const submitButton = screen.getByText('Envoyer');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message content'
      });
    });
  });
});
```

---

## 🔗 TESTS D'INTÉGRATION

### **1. API Endpoints Tests**

```typescript
// tests/integration/api.test.ts
import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/lib/prisma';
import { generateToken } from '../../src/utils/auth';

describe('API Integration Tests', () => {
  let authToken: string;
  let testUser: any;

  beforeAll(async () => {
    testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedpassword'
      }
    });

    authToken = generateToken(testUser);
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.status).toBe('healthy');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.version).toBeDefined();
    });
  });

  describe('GET /api/users', () => {
    it('should require authentication', async () => {
      await request(app)
        .get('/api/users')
        .expect(401);
    });

    it('should return users list for admin', async () => {
      const adminUser = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          name: 'Admin User',
          password: 'hashedpassword',
          role: 'admin'
        }
      });

      const adminToken = generateToken(adminUser);

      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
    });
  });

  describe('POST /api/contact', () => {
    it('should create contact message', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message content'
      };

      const response = await request(app)
        .post('/api/contact')
        .send(contactData)
        .expect(201);

      expect(response.body.id).toBeDefined();
      expect(response.body.status).toBe('sent');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send({})
        .expect(400);

      expect(response.body.error).toBe('Bad Request');
      expect(response.body.details).toBeInstanceOf(Array);
    });
  });
});
```

### **2. Database Integration Tests**

```typescript
// tests/integration/database.test.ts
import { prisma } from '../../src/lib/prisma';
import { UserService } from '../../src/services/UserService';

describe('Database Integration Tests', () => {
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
    await prisma.project.deleteMany();
    await prisma.contact.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('User Operations', () => {
    it('should create and retrieve user', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePass123!'
      };

      const createdUser = await userService.createUser(userData);
      const retrievedUser = await userService.getUserById(createdUser.id);

      expect(retrievedUser).toBeDefined();
      expect(retrievedUser?.email).toBe(userData.email);
    });

    it('should handle concurrent user creation', async () => {
      const userData = {
        email: 'concurrent@example.com',
        name: 'Concurrent User',
        password: 'SecurePass123!'
      };

      const promises = [
        userService.createUser(userData),
        userService.createUser(userData)
      ];

      const results = await Promise.allSettled(promises);

      const successful = results.filter(r => r.status === 'fulfilled');
      const failed = results.filter(r => r.status === 'rejected');

      expect(successful).toHaveLength(1);
      expect(failed).toHaveLength(1);
    });
  });

  describe('Project Operations', () => {
    it('should create and list projects', async () => {
      const projectData = {
        title: 'Test Project',
        description: 'Test Description',
        category: 'web',
        technologies: ['React', 'Node.js'],
        imageUrl: 'https://example.com/image.jpg',
        githubUrl: 'https://github.com/test/project',
        liveUrl: 'https://project.com',
        featured: true
      };

      const project = await prisma.project.create({
        data: projectData
      });

      const projects = await prisma.project.findMany({
        where: { featured: true }
      });

      expect(projects).toHaveLength(1);
      expect(projects[0].title).toBe(projectData.title);
    });
  });
});
```

---

## 🌐 TESTS E2E

### **1. User Journey Tests (Playwright)**

```typescript
// tests/e2e/user-journey.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Journey Tests', () => {
  test('should complete contact form submission', async ({ page }) => {
    await page.goto('https://hordearii.ca');

    // Navigate to contact page
    await page.click('text=Contact');
    await expect(page).toHaveURL(/.*contact/);

    // Fill contact form
    await page.fill('[data-testid="contact-name"]', 'John Doe');
    await page.fill('[data-testid="contact-email"]', 'john@example.com');
    await page.fill('[data-testid="contact-subject"]', 'Test Subject');
    await page.fill('[data-testid="contact-message"]', 'Test message content');

    // Submit form
    await page.click('[data-testid="contact-submit"]');

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Message envoyé');
  });

  test('should navigate through all pages', async ({ page }) => {
    await page.goto('https://hordearii.ca');

    // Test navigation
    await page.click('text=Accueil');
    await expect(page).toHaveURL(/.*\/$/);

    await page.click('text=Projets');
    await expect(page).toHaveURL(/.*projects/);

    await page.click('text=À propos');
    await expect(page).toHaveURL(/.*about/);

    await page.click('text=Contact');
    await expect(page).toHaveURL(/.*contact/);
  });

  test('should display projects correctly', async ({ page }) => {
    await page.goto('https://hordearii.ca/projects');

    // Check if projects are displayed
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(3);

    // Check project details
    const firstProject = page.locator('[data-testid="project-card"]').first();
    await expect(firstProject.locator('[data-testid="project-title"]')).toBeVisible();
    await expect(firstProject.locator('[data-testid="project-description"]')).toBeVisible();
  });
});
```

### **2. Performance Tests**

```typescript
// tests/e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should load homepage within 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('https://hordearii.ca');
    
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000);
  });

  test('should handle concurrent users', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    const context3 = await browser.newContext();

    const pages = await Promise.all([
      context1.newPage(),
      context2.newPage(),
      context3.newPage()
    ]);

    const startTime = Date.now();

    await Promise.all(
      pages.map(page => page.goto('https://hordearii.ca'))
    );

    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);

    await Promise.all([
      context1.close(),
      context2.close(),
      context3.close()
    ]);
  });
});
```

---

## 📊 COVERAGE REPORTS

### **1. Coverage Configuration**

```json
// coverage.json
{
  "coverageReporters": [
    "text",
    "lcov",
    "html",
    "json"
  ],
  "coverageDirectory": "coverage",
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
    "!src/migrations/**"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 85,
      "functions": 85,
      "lines": 85,
      "statements": 85
    }
  }
}
```

### **2. Coverage Scripts**

```json
// package.json scripts
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "npm run test:coverage && npm run test:e2e"
  }
}
```

---

## 🚀 CI/CD INTEGRATION

### **1. GitHub Actions Test Workflow**

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: hordearii_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run backend tests
      run: npm run test:backend
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/hordearii_test
        REDIS_URL: redis://localhost:6379
        JWT_SECRET: test_jwt_secret
        NODE_ENV: test

    - name: Run frontend tests
      run: npm run test:frontend

    - name: Run E2E tests
      run: npm run test:e2e

    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
```

---

## 📋 CHECKLIST DE QUALITÉ

### **Tests Unitaires :**
- [ ] **Services** : Tous les services testés
- [ ] **Utils** : Toutes les fonctions utilitaires testées
- [ ] **Validations** : Toutes les validations testées
- [ ] **Error handling** : Gestion d'erreurs testée

### **Tests d'Intégration :**
- [ ] **API Endpoints** : Tous les endpoints testés
- [ ] **Database** : Opérations CRUD testées
- [ ] **Authentication** : Flux d'auth testé
- [ ] **External APIs** : Intégrations externes testées

### **Tests E2E :**
- [ ] **User Journeys** : Parcours utilisateur testés
- [ ] **Responsive** : Tests sur différents écrans
- [ ] **Performance** : Tests de performance
- [ ] **Accessibility** : Tests d'accessibilité

### **Coverage :**
- [ ] **Backend** : ≥85% coverage
- [ ] **Frontend** : ≥80% coverage
- [ ] **Critical Paths** : 100% coverage
- [ ] **Error Paths** : Tous testés
