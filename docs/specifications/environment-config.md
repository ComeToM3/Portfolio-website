# ⚙️ ENVIRONMENT CONFIGURATION - HORDEARII.CA

## 📋 Vue d'ensemble
Configuration des environnements de développement, staging et production avec variables d'environnement et secrets management.

---

## 🏗️ STRUCTURE DES ENVIRONNEMENTS

### **Environnements supportés :**
- **Development** : Développement local
- **Staging** : Tests et validation
- **Production** : Environnement live

### **Structure des fichiers :**
```
hordearii/
├── .env.example
├── .env.development
├── .env.staging
├── .env.production
├── docker/
│   ├── .env.docker
│   └── docker-compose.yml
└── config/
    ├── development.ts
    ├── staging.ts
    └── production.ts
```

---

## 🔧 CONFIGURATION PAR ENVIRONNEMENT

### **1. DEVELOPMENT (.env.development)**

```bash
# ===========================================
# HORDEARII.CA - DEVELOPMENT ENVIRONMENT
# ===========================================

# ===== APPLICATION =====
NODE_ENV=development
PORT=3001
HOST=localhost
API_VERSION=v1
BASE_URL=http://localhost:3001

# ===== DATABASE =====
DATABASE_URL=postgresql://hordearii_dev:dev_password@localhost:5432/hordearii_dev
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=hordearii_dev
DATABASE_USER=hordearii_dev
DATABASE_PASSWORD=dev_password

# ===== REDIS =====
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# ===== JWT AUTHENTICATION =====
JWT_SECRET=dev_jwt_secret_key_very_long_and_secure_12345
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=dev_refresh_secret_key_very_long_12345
JWT_REFRESH_EXPIRES_IN=7d

# ===== BCRYPT =====
BCRYPT_ROUNDS=10

# ===== RATE LIMITING =====
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ===== LOGGING =====
LOG_LEVEL=debug
LOG_FORMAT=dev

# ===== CORS =====
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

# ===== EMAIL =====
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=dev_user
EMAIL_PASSWORD=dev_password
EMAIL_FROM=noreply@hordearii.ca

# ===== ANALYTICS =====
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
SENTRY_DSN=https://dev_sentry_dsn@sentry.io/project

# ===== MONITORING =====
PROMETHEUS_PORT=9090
GRAFANA_PORT=3002

# ===== SECURITY =====
HELMET_ENABLED=true
CSP_ENABLED=false
HSTS_ENABLED=false

# ===== TESTING =====
TEST_DATABASE_URL=postgresql://test_user:test_pass@localhost:5433/hordearii_test
```

### **2. STAGING (.env.staging)**

```bash
# ===========================================
# HORDEARII.CA - STAGING ENVIRONMENT
# ===========================================

# ===== APPLICATION =====
NODE_ENV=staging
PORT=3001
HOST=0.0.0.0
API_VERSION=v1
BASE_URL=https://staging.hordearii.ca

# ===== DATABASE =====
DATABASE_URL=postgresql://hordearii_staging:staging_password@postgres:5432/hordearii_staging
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=hordearii_staging
DATABASE_USER=hordearii_staging
DATABASE_PASSWORD=staging_password

# ===== REDIS =====
REDIS_URL=redis://redis:6379
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=staging_redis_password

# ===== JWT AUTHENTICATION =====
JWT_SECRET=staging_jwt_secret_key_very_long_and_secure_12345
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=staging_refresh_secret_key_very_long_12345
JWT_REFRESH_EXPIRES_IN=7d

# ===== BCRYPT =====
BCRYPT_ROUNDS=12

# ===== RATE LIMITING =====
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000

# ===== LOGGING =====
LOG_LEVEL=info
LOG_FORMAT=json

# ===== CORS =====
CORS_ORIGIN=https://staging.hordearii.ca
CORS_CREDENTIALS=true

# ===== EMAIL =====
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=staging_sendgrid_api_key
EMAIL_FROM=noreply@hordearii.ca

# ===== ANALYTICS =====
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
SENTRY_DSN=https://staging_sentry_dsn@sentry.io/project

# ===== MONITORING =====
PROMETHEUS_PORT=9090
GRAFANA_PORT=3002

# ===== SECURITY =====
HELMET_ENABLED=true
CSP_ENABLED=true
HSTS_ENABLED=true

# ===== SSL/TLS =====
SSL_CERT_PATH=/etc/nginx/ssl/staging.crt
SSL_KEY_PATH=/etc/nginx/ssl/staging.key
```

### **3. PRODUCTION (.env.production)**

```bash
# ===========================================
# HORDEARII.CA - PRODUCTION ENVIRONMENT
# ===========================================

# ===== APPLICATION =====
NODE_ENV=production
PORT=3001
HOST=0.0.0.0
API_VERSION=v1
BASE_URL=https://hordearii.ca

# ===== DATABASE =====
DATABASE_URL=postgresql://hordearii_prod:prod_secure_password@postgres:5432/hordearii_prod
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=hordearii_prod
DATABASE_USER=hordearii_prod
DATABASE_PASSWORD=prod_secure_password

# ===== REDIS =====
REDIS_URL=redis://redis:6379
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=prod_redis_secure_password

# ===== JWT AUTHENTICATION =====
JWT_SECRET=prod_jwt_secret_key_very_long_and_secure_12345
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=prod_refresh_secret_key_very_long_12345
JWT_REFRESH_EXPIRES_IN=7d

# ===== BCRYPT =====
BCRYPT_ROUNDS=12

# ===== RATE LIMITING =====
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000

# ===== LOGGING =====
LOG_LEVEL=warn
LOG_FORMAT=json

# ===== CORS =====
CORS_ORIGIN=https://hordearii.ca
CORS_CREDENTIALS=true

# ===== EMAIL =====
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=prod_sendgrid_api_key
EMAIL_FROM=noreply@hordearii.ca

# ===== ANALYTICS =====
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
SENTRY_DSN=https://prod_sentry_dsn@sentry.io/project

# ===== MONITORING =====
PROMETHEUS_PORT=9090
GRAFANA_PORT=3002

# ===== SECURITY =====
HELMET_ENABLED=true
CSP_ENABLED=true
HSTS_ENABLED=true

# ===== SSL/TLS =====
SSL_CERT_PATH=/etc/nginx/ssl/hordearii.ca.crt
SSL_KEY_PATH=/etc/nginx/ssl/hordearii.ca.key
```

---

## 🐳 DOCKER CONFIGURATION

### **Docker Environment (.env.docker)**

```bash
# ===========================================
# HORDEARII.CA - DOCKER ENVIRONMENT
# ===========================================

# ===== APPLICATION =====
NODE_ENV=production
PORT=3001
HOST=0.0.0.0
API_VERSION=v1
BASE_URL=https://hordearii.ca

# ===== DATABASE =====
POSTGRES_DB=hordearii_prod
POSTGRES_USER=hordearii_prod
POSTGRES_PASSWORD=prod_secure_password
DATABASE_URL=postgresql://hordearii_prod:prod_secure_password@postgres:5432/hordearii_prod

# ===== REDIS =====
REDIS_URL=redis://redis:6379

# ===== JWT AUTHENTICATION =====
JWT_SECRET=prod_jwt_secret_key_very_long_and_secure_12345
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=prod_refresh_secret_key_very_long_12345
JWT_REFRESH_EXPIRES_IN=7d

# ===== BCRYPT =====
BCRYPT_ROUNDS=12

# ===== RATE LIMITING =====
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000

# ===== LOGGING =====
LOG_LEVEL=warn
LOG_FORMAT=json

# ===== CORS =====
CORS_ORIGIN=https://hordearii.ca
CORS_CREDENTIALS=true

# ===== EMAIL =====
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=prod_sendgrid_api_key
EMAIL_FROM=noreply@hordearii.ca

# ===== ANALYTICS =====
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
SENTRY_DSN=https://prod_sentry_dsn@sentry.io/project

# ===== MONITORING =====
PROMETHEUS_PORT=9090
GRAFANA_PORT=3002

# ===== SECURITY =====
HELMET_ENABLED=true
CSP_ENABLED=true
HSTS_ENABLED=true
```

---

## 🔐 SECRETS MANAGEMENT

### **1. Secrets Locaux (.env.local)**

```bash
# ===========================================
# HORDEARII.CA - LOCAL SECRETS
# ===========================================

# ===== JWT SECRETS =====
JWT_SECRET=your_super_secret_jwt_key_here_12345
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here_12345

# ===== DATABASE SECRETS =====
DATABASE_PASSWORD=your_database_password_here

# ===== EMAIL SECRETS =====
EMAIL_PASSWORD=your_email_api_key_here

# ===== ANALYTICS SECRETS =====
GA4_MEASUREMENT_ID=your_ga4_measurement_id_here
SENTRY_DSN=your_sentry_dsn_here

# ===== REDIS SECRETS =====
REDIS_PASSWORD=your_redis_password_here
```

### **2. Secrets Production (HiveOS)**

```bash
# ===========================================
# HORDEARII.CA - PRODUCTION SECRETS
# ===========================================

# ===== JWT SECRETS =====
JWT_SECRET=prod_jwt_secret_key_very_long_and_secure_12345
JWT_REFRESH_SECRET=prod_refresh_secret_key_very_long_12345

# ===== DATABASE SECRETS =====
DATABASE_PASSWORD=prod_secure_password

# ===== EMAIL SECRETS =====
EMAIL_PASSWORD=prod_sendgrid_api_key

# ===== ANALYTICS SECRETS =====
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
SENTRY_DSN=https://prod_sentry_dsn@sentry.io/project

# ===== REDIS SECRETS =====
REDIS_PASSWORD=prod_redis_secure_password
```

---

## 📁 CONFIGURATION FILES

### **1. Configuration TypeScript (config/development.ts)**

```typescript
import { Config } from './types';

export const developmentConfig: Config = {
  app: {
    name: 'Hordearii API',
    version: '1.0.0',
    port: parseInt(process.env.PORT || '3001'),
    host: process.env.HOST || 'localhost',
    environment: 'development',
    baseUrl: process.env.BASE_URL || 'http://localhost:3001',
  },
  
  database: {
    url: process.env.DATABASE_URL!,
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    name: process.env.DATABASE_NAME || 'hordearii_dev',
    user: process.env.DATABASE_USER || 'hordearii_dev',
    password: process.env.DATABASE_PASSWORD!,
  },
  
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
  },
  
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  
  bcrypt: {
    rounds: parseInt(process.env.BCRYPT_ROUNDS || '10'),
  },
  
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
    format: process.env.LOG_FORMAT || 'dev',
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: process.env.CORS_CREDENTIALS === 'true',
  },
  
  email: {
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.EMAIL_PORT || '2525'),
    user: process.env.EMAIL_USER || 'dev_user',
    password: process.env.EMAIL_PASSWORD!,
    from: process.env.EMAIL_FROM || 'noreply@hordearii.ca',
  },
  
  analytics: {
    ga4MeasurementId: process.env.GA4_MEASUREMENT_ID,
    sentryDsn: process.env.SENTRY_DSN,
  },
  
  monitoring: {
    prometheusPort: parseInt(process.env.PROMETHEUS_PORT || '9090'),
    grafanaPort: parseInt(process.env.GRAFANA_PORT || '3002'),
  },
  
  security: {
    helmetEnabled: process.env.HELMET_ENABLED === 'true',
    cspEnabled: process.env.CSP_ENABLED === 'true',
    hstsEnabled: process.env.HSTS_ENABLED === 'true',
  },
};
```

### **2. Types Configuration (config/types.ts)**

```typescript
export interface Config {
  app: {
    name: string;
    version: string;
    port: number;
    host: string;
    environment: string;
    baseUrl: string;
  };
  
  database: {
    url: string;
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
  
  redis: {
    url: string;
    host: string;
    port: number;
    password?: string;
  };
  
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  
  bcrypt: {
    rounds: number;
  };
  
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  
  logging: {
    level: string;
    format: string;
  };
  
  cors: {
    origin: string;
    credentials: boolean;
  };
  
  email: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
  
  analytics: {
    ga4MeasurementId?: string;
    sentryDsn?: string;
  };
  
  monitoring: {
    prometheusPort: number;
    grafanaPort: number;
  };
  
  security: {
    helmetEnabled: boolean;
    cspEnabled: boolean;
    hstsEnabled: boolean;
  };
}
```

---

## 🚀 DEPLOYMENT CONFIGURATION

### **1. Docker Compose Environment**

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: hordearii-backend
    environment:
      - NODE_ENV=production
      - PORT=3001
      - DATABASE_URL=postgresql://hordearii_prod:prod_secure_password@postgres:5432/hordearii_prod
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=prod_jwt_secret_key_very_long_and_secure_12345
      - JWT_REFRESH_SECRET=prod_refresh_secret_key_very_long_12345
      - EMAIL_PASSWORD=prod_sendgrid_api_key
      - GA4_MEASUREMENT_ID=G-XXXXXXXXXX
      - SENTRY_DSN=https://prod_sentry_dsn@sentry.io/project
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    env_file:
      - .env.docker

  postgres:
    image: postgres:15-alpine
    container_name: hordearii-postgres
    environment:
      - POSTGRES_DB=hordearii_prod
      - POSTGRES_USER=hordearii_prod
      - POSTGRES_PASSWORD=prod_secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: hordearii-redis
    command: redis-server --requirepass prod_redis_secure_password
    restart: unless-stopped

volumes:
  postgres_data:
```

### **2. PM2 Ecosystem Configuration**

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'hordearii-backend',
      script: 'dist/server.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        DATABASE_URL: 'postgresql://hordearii_prod:prod_secure_password@postgres:5432/hordearii_prod',
        REDIS_URL: 'redis://redis:6379',
        JWT_SECRET: 'prod_jwt_secret_key_very_long_and_secure_12345',
        JWT_REFRESH_SECRET: 'prod_refresh_secret_key_very_long_12345',
        EMAIL_PASSWORD: 'prod_sendgrid_api_key',
        GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX',
        SENTRY_DSN: 'https://prod_sentry_dsn@sentry.io/project'
      },
      error_file: '/var/log/hordearii/backend-error.log',
      out_file: '/var/log/hordearii/backend-out.log',
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
```

---

## 🔒 SECURITY CHECKLIST

### **Variables sensibles à protéger :**
- [ ] `JWT_SECRET` - Clé secrète JWT
- [ ] `JWT_REFRESH_SECRET` - Clé secrète refresh JWT
- [ ] `DATABASE_PASSWORD` - Mot de passe base de données
- [ ] `EMAIL_PASSWORD` - Clé API email
- [ ] `REDIS_PASSWORD` - Mot de passe Redis
- [ ] `GA4_MEASUREMENT_ID` - ID Google Analytics
- [ ] `SENTRY_DSN` - DSN Sentry

### **Bonnes pratiques :**
- [ ] Ne jamais commiter les fichiers `.env.local`
- [ ] Utiliser des secrets différents par environnement
- [ ] Rotation régulière des secrets
- [ ] Chiffrement des secrets en production
- [ ] Accès limité aux secrets

---

## 📋 VALIDATION

### **Script de validation (.env.validate.js)**

```javascript
#!/usr/bin/env node

const requiredVars = [
  'NODE_ENV',
  'PORT',
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'EMAIL_PASSWORD'
];

const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  process.exit(1);
}

console.log('✅ All required environment variables are set');
```
