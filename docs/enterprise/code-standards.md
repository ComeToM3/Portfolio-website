# 📋 Standards de Code - HORDEARII.CA

## 🎯 Vue d'ensemble
Standards de codage professionnels pour assurer la qualité, la maintenabilité et la cohérence du code.

---

## 🏗 Architecture et Structure

### **1. Principes SOLID**
- **S** : Single Responsibility Principle
- **O** : Open/Closed Principle  
- **L** : Liskov Substitution Principle
- **I** : Interface Segregation Principle
- **D** : Dependency Inversion Principle

### **2. Clean Code**
- **Noms explicites** : Variables, fonctions, classes
- **Fonctions courtes** : ≤15 lignes, ≤5 paramètres
- **Commentaires** : Expliquer le "pourquoi", pas le "quoi"
- **DRY** : Don't Repeat Yourself
- **KISS** : Keep It Simple, Stupid

---

## 🔧 Standards Techniques

### **1. TypeScript/JavaScript**

#### **Naming Conventions**
```typescript
// Variables et fonctions : camelCase
const userName = 'john';
const getUserData = () => {};

// Classes et interfaces : PascalCase
class UserService {}
interface UserData {}

// Constantes : UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.hordearii.ca';
const MAX_RETRY_ATTEMPTS = 3;

// Fichiers : kebab-case
// user-service.ts, api-client.ts
```

#### **Structure des Fichiers**
```typescript
// 1. Imports externes
import React from 'react';
import { useState, useEffect } from 'react';

// 2. Imports internes
import { UserService } from '@/services/UserService';
import { User } from '@/types/User';

// 3. Types et interfaces
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

// 4. Composant principal
export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  // 5. Hooks
  const [isLoading, setIsLoading] = useState(false);

  // 6. Fonctions
  const handleEdit = () => {
    onEdit?.(user);
  };

  // 7. Rendu
  return (
    <div className="user-card">
      {/* JSX */}
    </div>
  );
};
```

### **2. React/Next.js**

#### **Composants**
```typescript
// ✅ Bon : Composant fonctionnel avec TypeScript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// ❌ Éviter : Composant de classe
class Button extends React.Component<ButtonProps> {
  // ...
}
```

#### **Hooks Personnalisés**
```typescript
// hooks/useUser.ts
import { useState, useEffect } from 'react';
import { User } from '@/types/User';
import { UserService } from '@/services/UserService';

export const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await UserService.getById(userId);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};
```

### **3. Backend (Node.js/Express)**

#### **Structure des Contrôleurs**
```typescript
// controllers/UserController.ts
import { Request, Response, NextFunction } from 'express';
import { UserService } from '@/services/UserService';
import { ApiError } from '@/utils/ApiError';
import { validateUser } from '@/validators/userValidator';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // 1. Validation
      const { error, value } = validateUser(req.body);
      if (error) {
        throw new ApiError(400, 'Validation failed', error.details);
      }

      // 2. Logique métier
      const user = await this.userService.create(value);

      // 3. Réponse
      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}
```

#### **Services**
```typescript
// services/UserService.ts
import { PrismaClient } from '@prisma/client';
import { User, CreateUserDto } from '@/types/User';
import { ApiError } from '@/utils/ApiError';
import { hashPassword } from '@/utils/auth';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(userData: CreateUserDto): Promise<User> {
    try {
      // Vérification unicité email
      const existingUser = await this.prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (existingUser) {
        throw new ApiError(409, 'Email already exists');
      }

      // Hash du mot de passe
      const hashedPassword = await hashPassword(userData.password);

      // Création utilisateur
      const user = await this.prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
```

---

## 🧪 Tests

### **1. Tests Unitaires**
```typescript
// tests/services/UserService.test.ts
import { UserService } from '@/services/UserService';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '@/utils/ApiError';

describe('UserService', () => {
  let userService: UserService;
  let mockPrisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    mockPrisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn()
      }
    } as any;

    userService = new UserService();
    (userService as any).prisma = mockPrisma;
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const expectedUser = {
        id: '1',
        email: userData.email,
        name: userData.name,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue(expectedUser);

      // Act
      const result = await userService.create(userData);

      // Assert
      expect(result).toEqual(expectedUser);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: userData.email }
      });
    });

    it('should throw error if email already exists', async () => {
      // Arrange
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Test User'
      };

      mockPrisma.user.findUnique.mockResolvedValue({ id: '1' } as any);

      // Act & Assert
      await expect(userService.create(userData)).rejects.toThrow(ApiError);
    });
  });
});
```

---

## 📊 Métriques de Qualité

### **1. Complexité Cyclomatique**
- **Fonctions** : ≤10
- **Classes** : ≤20
- **Méthodes** : ≤8

### **2. Couverture de Code**
- **Backend** : ≥85%
- **Frontend** : ≥80%
- **Tests critiques** : 100%

### **3. Dette Technique**
- **Code smells** : 0 toléré
- **Duplications** : ≤3%
- **Violations** : 0 critique

---

## 🔍 Outils de Qualité

### **1. Linting**
```json
// .eslintrc.json
{
  "extends": [
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### **2. Prettier**
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### **3. Husky (Git Hooks)**
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test:ci"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## 📝 Documentation

### **1. JSDoc**
```typescript
/**
 * Crée un nouvel utilisateur dans le système
 * @param userData - Données de l'utilisateur à créer
 * @returns Promise<User> - L'utilisateur créé
 * @throws {ApiError} Si l'email existe déjà
 * @example
 * const user = await userService.create({
 *   email: 'john@example.com',
 *   password: 'password123',
 *   name: 'John Doe'
 * });
 */
public async create(userData: CreateUserDto): Promise<User> {
  // Implementation
}
```

### **2. README par Module**
```markdown
# User Module

## Description
Gestion des utilisateurs et authentification.

## API
- `POST /api/users` - Créer un utilisateur
- `GET /api/users/:id` - Récupérer un utilisateur
- `PUT /api/users/:id` - Mettre à jour un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

## Services
- `UserService` - Logique métier utilisateur
- `AuthService` - Authentification et autorisation

## Tests
```bash
npm run test:user
```
```

---

*Ces standards garantissent un code professionnel, maintenable et de haute qualité*
