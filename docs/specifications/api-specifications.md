# 🔌 API SPECIFICATIONS - HORDEARII.CA

## 📋 Vue d'ensemble
**Base URL :** `https://hordearii.ca/api/v1`  
**Version :** 1.0.0  
**Format :** JSON  
**Authentication :** JWT Bearer Token  

---

## 🔐 AUTHENTICATION

### **JWT Token Format**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Token Structure**
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "admin|user",
  "iat": 1640995200,
  "exp": 1640998800
}
```

---

## 📊 ENDPOINTS

### **1. HEALTH CHECK**

#### **GET /health**
**Description :** Vérification de l'état du service  
**Authentication :** Aucune  

**Response 200 :**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00Z",
  "version": "1.0.0",
  "uptime": 3600,
  "database": "connected",
  "redis": "connected"
}
```

**Response 503 :**
```json
{
  "status": "unhealthy",
  "timestamp": "2024-01-01T12:00:00Z",
  "errors": [
    "Database connection failed",
    "Redis connection failed"
  ]
}
```

---

### **2. METRICS**

#### **GET /metrics**
**Description :** Métriques Prometheus  
**Authentication :** Aucune  

**Response 200 :**
```text
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",endpoint="/api/users"} 150

# HELP http_request_duration_seconds Duration of HTTP requests
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{method="GET",endpoint="/api/users",le="0.1"} 120
```

---

### **3. USERS MANAGEMENT**

#### **GET /users**
**Description :** Récupération de la liste des utilisateurs  
**Authentication :** JWT Token (Admin)  
**Pagination :** Supportée  

**Query Parameters :**
- `page` (integer, optional) : Numéro de page (défaut: 1)
- `limit` (integer, optional) : Nombre d'éléments par page (défaut: 10, max: 100)
- `search` (string, optional) : Recherche par nom ou email
- `role` (string, optional) : Filtre par rôle (admin|user)

**Response 200 :**
```json
{
  "data": [
    {
      "id": "user_123",
      "email": "johan@example.com",
      "name": "Johan Dominguez",
      "role": "admin",
      "created_at": "2024-01-01T12:00:00Z",
      "updated_at": "2024-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

**Response 401 :**
```json
{
  "error": "Unauthorized",
  "message": "JWT token required",
  "code": "AUTH_REQUIRED"
}
```

**Response 403 :**
```json
{
  "error": "Forbidden",
  "message": "Admin role required",
  "code": "ADMIN_REQUIRED"
}
```

#### **GET /users/{id}**
**Description :** Récupération d'un utilisateur spécifique  
**Authentication :** JWT Token (Admin ou propriétaire)  

**Path Parameters :**
- `id` (string, required) : ID de l'utilisateur

**Response 200 :**
```json
{
  "id": "user_123",
  "email": "johan@example.com",
  "name": "Johan Dominguez",
  "role": "admin",
  "profile": {
    "bio": "Développeur junior passionné",
    "location": "Montréal, QC",
    "website": "https://hordearii.ca"
  },
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z"
}
```

**Response 404 :**
```json
{
  "error": "Not Found",
  "message": "User not found",
  "code": "USER_NOT_FOUND"
}
```

#### **POST /users**
**Description :** Création d'un nouvel utilisateur  
**Authentication :** JWT Token (Admin)  

**Request Body :**
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "SecurePassword123!",
  "role": "user"
}
```

**Validation Rules :**
- `email` : Email valide, unique
- `name` : 2-50 caractères
- `password` : 8+ caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 spécial
- `role` : admin ou user

**Response 201 :**
```json
{
  "id": "user_456",
  "email": "newuser@example.com",
  "name": "New User",
  "role": "user",
  "created_at": "2024-01-01T12:00:00Z"
}
```

**Response 400 :**
```json
{
  "error": "Bad Request",
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "email",
      "message": "Email already exists"
    },
    {
      "field": "password",
      "message": "Password must contain at least 8 characters"
    }
  ]
}
```

#### **PUT /users/{id}**
**Description :** Mise à jour d'un utilisateur  
**Authentication :** JWT Token (Admin ou propriétaire)  

**Request Body :**
```json
{
  "name": "Updated Name",
  "profile": {
    "bio": "Updated bio",
    "location": "Montréal, QC"
  }
}
```

**Response 200 :**
```json
{
  "id": "user_123",
  "email": "johan@example.com",
  "name": "Updated Name",
  "role": "admin",
  "profile": {
    "bio": "Updated bio",
    "location": "Montréal, QC"
  },
  "updated_at": "2024-01-01T12:00:00Z"
}
```

#### **DELETE /users/{id}**
**Description :** Suppression d'un utilisateur  
**Authentication :** JWT Token (Admin)  

**Response 204 :** No Content

---

### **4. PROJECTS MANAGEMENT**

#### **GET /projects**
**Description :** Récupération de la liste des projets  
**Authentication :** Aucune (public)  

**Query Parameters :**
- `category` (string, optional) : Filtre par catégorie
- `featured` (boolean, optional) : Projets en vedette uniquement

**Response 200 :**
```json
{
  "data": [
    {
      "id": "proj_123",
      "title": "Portfolio Hordearii",
      "description": "Application mobile avec IA",
      "category": "mobile",
      "technologies": ["Flutter", "Dart", "TensorFlow"],
      "image_url": "https://hordearii.ca/images/todo-ai.jpg",
      "github_url": "https://github.com/johand/todo-ai",
      "live_url": "https://play.google.com/store/apps/details?id=com.todoai",
      "featured": true,
      "created_at": "2024-01-01T12:00:00Z"
    }
  ]
}
```

#### **POST /projects**
**Description :** Création d'un nouveau projet  
**Authentication :** JWT Token (Admin)  

**Request Body :**
```json
{
  "title": "New Project",
  "description": "Description du projet",
  "category": "web",
  "technologies": ["React", "Node.js"],
  "image_url": "https://example.com/image.jpg",
  "github_url": "https://github.com/user/project",
  "live_url": "https://project.com",
  "featured": false
}
```

---

### **5. CONTACT FORM**

#### **POST /contact**
**Description :** Envoi d'un message de contact  
**Authentication :** Aucune  

**Request Body :**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Opportunité de collaboration",
  "message": "Bonjour, je suis intéressé par votre profil..."
}
```

**Validation Rules :**
- `name` : 2-100 caractères
- `email` : Email valide
- `subject` : 5-200 caractères
- `message` : 10-2000 caractères

**Response 201 :**
```json
{
  "id": "msg_123",
  "status": "sent",
  "created_at": "2024-01-01T12:00:00Z"
}
```

---

### **6. ANALYTICS**

#### **POST /analytics/event**
**Description :** Enregistrement d'un événement analytics  
**Authentication :** Aucune  

**Request Body :**
```json
{
  "event": "page_view",
  "page": "/projects",
  "user_agent": "Mozilla/5.0...",
  "ip_address": "192.168.1.1",
  "session_id": "sess_123"
}
```

**Response 201 :**
```json
{
  "status": "recorded"
}
```

---

## 🚨 ERROR CODES

### **Codes d'erreur standardisés :**

| Code | Message | Description |
|------|---------|-------------|
| `AUTH_REQUIRED` | JWT token required | Token d'authentification manquant |
| `AUTH_INVALID` | Invalid JWT token | Token invalide ou expiré |
| `ADMIN_REQUIRED` | Admin role required | Rôle administrateur requis |
| `USER_NOT_FOUND` | User not found | Utilisateur introuvable |
| `VALIDATION_ERROR` | Validation failed | Erreur de validation des données |
| `RATE_LIMIT_EXCEEDED` | Rate limit exceeded | Limite de requêtes dépassée |
| `INTERNAL_ERROR` | Internal server error | Erreur interne du serveur |

### **Format d'erreur standard :**
```json
{
  "error": "Error Type",
  "message": "Human readable message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T12:00:00Z",
  "request_id": "req_123"
}
```

---

## 📊 RATE LIMITING

### **Limites par endpoint :**
- **Public endpoints** : 100 req/min par IP
- **Authenticated endpoints** : 1000 req/min par utilisateur
- **Admin endpoints** : 5000 req/min par admin

### **Headers de rate limiting :**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640998800
```

---

## 🔒 SECURITY

### **Headers de sécurité :**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

### **Validation des entrées :**
- **Sanitization** : Toutes les entrées utilisateur
- **SQL Injection** : Protection via Prisma ORM
- **XSS Protection** : Validation et échappement
- **CSRF Protection** : Tokens CSRF pour mutations

---

## 📈 MONITORING

### **Métriques collectées :**
- **Request count** par endpoint
- **Response time** par endpoint
- **Error rate** par endpoint
- **Active users** par période
- **Database performance** metrics

### **Alertes configurées :**
- **Error rate > 5%** : Email + Slack
- **Response time > 2s** : Email
- **Database connection failed** : PagerDuty
- **Rate limit exceeded** : Log only

---

## 🧪 TESTING

### **Endpoints de test :**
- **GET /test/health** : Health check pour tests
- **POST /test/reset** : Reset base de données (dev uniquement)
- **GET /test/seed** : Seed données de test (dev uniquement)

### **Données de test :**
```json
{
  "test_users": [
    {
      "email": "test@example.com",
      "password": "TestPass123!",
      "role": "admin"
    }
  ]
}
```
