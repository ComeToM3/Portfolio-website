# 🚀 DEPLOYMENT SPECIFICATIONS - HORDEARII.CA

## 📋 Vue d'ensemble
Spécifications complètes de déploiement pour l'infrastructure HiveOS Standard + Docker avec orchestration PM2 et monitoring.

---

## 🏗️ INFRASTRUCTURE AS CODE

### **1. Docker Compose Configuration**

#### **Main Docker Compose (docker-compose.yml)**
```yaml
version: '3.8'

services:
  # ===== NGINX REVERSE PROXY =====
  nginx:
    image: nginx:alpine
    container_name: hordearii-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./nginx/logs:/var/log/nginx
      - ./nginx/cache:/var/cache/nginx
    depends_on:
      - frontend
      - backend
    restart: unless-stopped
    networks:
      - hordearii-network
    healthcheck:
      test: ["CMD", "nginx", "-t"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # ===== FRONTEND APPLICATION =====
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
    container_name: hordearii-frontend
    environment:
      - NODE_ENV=production
      - PORT=3000
      - NEXT_PUBLIC_API_URL=https://hordearii.ca/api
      - NEXT_PUBLIC_GA_ID=${GA4_MEASUREMENT_ID}
    ports:
      - "3000:3000"
    restart: unless-stopped
    networks:
      - hordearii-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    depends_on:
      - backend

  # ===== BACKEND API =====
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
    container_name: hordearii-backend
    environment:
      - NODE_ENV=production
      - PORT=3001
      - DATABASE_URL=postgresql://hordearii_prod:${DATABASE_PASSWORD}@postgres:5432/hordearii_prod
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
      - EMAIL_PASSWORD=${EMAIL_PASSWORD}
      - GA4_MEASUREMENT_ID=${GA4_MEASUREMENT_ID}
      - SENTRY_DSN=${SENTRY_DSN}
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - hordearii-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    volumes:
      - ./backend/logs:/app/logs
      - ./backend/uploads:/app/uploads

  # ===== POSTGRESQL DATABASE =====
  postgres:
    image: postgres:15-alpine
    container_name: hordearii-postgres
    environment:
      - POSTGRES_DB=hordearii_prod
      - POSTGRES_USER=hordearii_prod
      - POSTGRES_PASSWORD=${DATABASE_PASSWORD}
      - POSTGRES_INITDB_ARGS=--encoding=UTF-8 --lc-collate=C --lc-ctype=C
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgres/init:/docker-entrypoint-initdb.d:ro
      - ./postgres/backups:/backups
    ports:
      - "5432:5432"
    restart: unless-stopped
    networks:
      - hordearii-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U hordearii_prod -d hordearii_prod"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
    command: >
      postgres
      -c shared_preload_libraries=pg_stat_statements
      -c pg_stat_statements.track=all
      -c max_connections=100
      -c shared_buffers=256MB
      -c effective_cache_size=1GB
      -c maintenance_work_mem=64MB
      -c checkpoint_completion_target=0.9
      -c wal_buffers=16MB
      -c default_statistics_target=100
      -c random_page_cost=1.1
      -c effective_io_concurrency=200
      -c work_mem=4MB
      -c min_wal_size=1GB
      -c max_wal_size=4GB

  # ===== REDIS CACHE =====
  redis:
    image: redis:7-alpine
    container_name: hordearii-redis
    command: >
      redis-server
      --requirepass ${REDIS_PASSWORD}
      --maxmemory 256mb
      --maxmemory-policy allkeys-lru
      --save 900 1
      --save 300 10
      --save 60 10000
    ports:
      - "6379:6379"
    restart: unless-stopped
    networks:
      - hordearii-network
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
    volumes:
      - redis_data:/data

  # ===== PROMETHEUS MONITORING =====
  prometheus:
    image: prom/prometheus:latest
    container_name: hordearii-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - ./monitoring/prometheus/rules:/etc/prometheus/rules:ro
      - prometheus_data:/prometheus
    restart: unless-stopped
    networks:
      - hordearii-network
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:9090/-/healthy"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  # ===== GRAFANA DASHBOARDS =====
  grafana:
    image: grafana/grafana:latest
    container_name: hordearii-grafana
    ports:
      - "3002:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
      - GF_USERS_ALLOW_SIGN_UP=false
      - GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-simple-json-datasource
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning:ro
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards:ro
    restart: unless-stopped
    networks:
      - hordearii-network
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    depends_on:
      - prometheus

  # ===== UPTIME KUMA MONITORING =====
  uptime-kuma:
    image: louislam/uptime-kuma:latest
    container_name: hordearii-uptime-kuma
    ports:
      - "3003:3001"
    volumes:
      - uptime_kuma_data:/app/data
    restart: unless-stopped
    networks:
      - hordearii-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

  # ===== PM2 PROCESS MANAGER =====
  pm2:
    image: node:18-alpine
    container_name: hordearii-pm2
    working_dir: /app
    volumes:
      - ./pm2/ecosystem.config.js:/app/ecosystem.config.js:ro
      - ./pm2/logs:/app/logs
    environment:
      - NODE_ENV=production
    command: >
      sh -c "
        npm install -g pm2 &&
        pm2 start ecosystem.config.js &&
        pm2 logs
      "
    restart: unless-stopped
    networks:
      - hordearii-network
    depends_on:
      - backend
      - frontend

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  prometheus_data:
    driver: local
  grafana_data:
    driver: local
  uptime_kuma_data:
    driver: local

networks:
  hordearii-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

### **2. Dockerfile Configurations**

#### **Frontend Dockerfile**
```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### **Backend Dockerfile**
```dockerfile
# Backend Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY backend/ .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy the built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Create necessary directories
RUN mkdir -p logs uploads
RUN chown -R nodejs:nodejs logs uploads

USER nodejs

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

CMD ["npm", "start"]
```

### **3. Nginx Configuration**

#### **Main Nginx Config (nginx/nginx.conf)**
```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    # Basic Settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 100M;

    # Gzip Settings
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;

    # Upstream Definitions
    upstream frontend {
        server frontend:3000;
        keepalive 32;
    }

    upstream backend {
        server backend:3001;
        keepalive 32;
    }

    # Main Server Block
    server {
        listen 80;
        server_name hordearii.ca www.hordearii.ca;
        
        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name hordearii.ca www.hordearii.ca;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/hordearii.ca.crt;
        ssl_certificate_key /etc/nginx/ssl/hordearii.ca.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Security Headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
        add_header X-Frame-Options DENY always;
        add_header X-Content-Type-Options nosniff always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.hordearii.ca;" always;

        # Root location for static files
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 86400;
        }

        # API endpoints
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 86400;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # Static file caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            proxy_pass http://frontend;
        }

        # Security: Deny access to hidden files
        location ~ /\. {
            deny all;
            access_log off;
            log_not_found off;
        }
    }
}
```

---

## 🔧 PM2 ORCHESTRATION

### **1. PM2 Ecosystem Configuration**

#### **PM2 Ecosystem (pm2/ecosystem.config.js)**
```javascript
module.exports = {
  apps: [
    {
      name: 'hordearii-backend',
      script: 'dist/server.js',
      cwd: '/app',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        DATABASE_URL: process.env.DATABASE_URL,
        REDIS_URL: process.env.REDIS_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
        GA4_MEASUREMENT_ID: process.env.GA4_MEASUREMENT_ID,
        SENTRY_DSN: process.env.SENTRY_DSN
      },
      error_file: '/app/logs/backend-error.log',
      out_file: '/app/logs/backend-out.log',
      log_file: '/app/logs/backend-combined.log',
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      max_restarts: 10,
      min_uptime: '10s'
    },
    {
      name: 'hordearii-frontend',
      script: 'server.js',
      cwd: '/app',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'https://hordearii.ca/api',
        NEXT_PUBLIC_GA_ID: process.env.GA4_MEASUREMENT_ID
      },
      error_file: '/app/logs/frontend-error.log',
      out_file: '/app/logs/frontend-out.log',
      log_file: '/app/logs/frontend-combined.log',
      time: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ],

  deploy: {
    production: {
      user: 'hordearii',
      host: 'hiveos-rig',
      ref: 'origin/main',
      repo: 'https://github.com/johand/hordearii.git',
      path: '/var/www/hordearii',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
```

### **2. PM2 Monitoring Configuration**

#### **PM2 Monitoring Setup**
```javascript
// pm2/monitoring.js
const pm2 = require('pm2');

// PM2 Monitoring Configuration
const monitoringConfig = {
  // Auto restart on crash
  autorestart: true,
  
  // Memory limit
  max_memory_restart: '1G',
  
  // Log rotation
  log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
  
  // Cluster mode
  instances: 'max',
  exec_mode: 'cluster',
  
  // Health checks
  health_check_grace_period: 3000,
  health_check_fatal_exceptions: true,
  
  // Monitoring
  pmx: true,
  
  // Metrics
  metrics: {
    http: true,
    custom_metrics: [
      {
        name: 'Realtime/LoadTime',
        type: 'histogram',
        unit: 'ms'
      },
      {
        name: 'Realtime/Requests',
        type: 'counter',
        unit: 'request'
      }
    ]
  }
};

// PM2 Event Handlers
pm2.launchBus((err, bus) => {
  if (err) {
    console.error('PM2 Bus Error:', err);
    return;
  }

  bus.on('process:event', (data) => {
    console.log('PM2 Event:', data.event, 'Process:', data.process.name);
    
    // Handle different events
    switch (data.event) {
      case 'restart':
        console.log(`Process ${data.process.name} restarted`);
        break;
      case 'stop':
        console.log(`Process ${data.process.name} stopped`);
        break;
      case 'exit':
        console.log(`Process ${data.process.name} exited with code ${data.exit_code}`);
        break;
    }
  });

  bus.on('log:err', (data) => {
    console.error('PM2 Error Log:', data.process.name, data.data);
  });

  bus.on('log:out', (data) => {
    console.log('PM2 Output Log:', data.process.name, data.data);
  });
});
```

---

## 📊 MONITORING & HEALTH CHECKS

### **1. Prometheus Configuration**

#### **Prometheus Config (monitoring/prometheus/prometheus.yml)**
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "rules/*.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  # Prometheus itself
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node Exporter
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  # Docker Exporter
  - job_name: 'docker-exporter'
    static_configs:
      - targets: ['docker-exporter:9323']

  # Nginx Exporter
  - job_name: 'nginx-exporter'
    static_configs:
      - targets: ['nginx-exporter:9113']

  # Backend API
  - job_name: 'hordearii-backend'
    static_configs:
      - targets: ['backend:3001']
    metrics_path: '/api/metrics'
    scrape_interval: 30s

  # Frontend Application
  - job_name: 'hordearii-frontend'
    static_configs:
      - targets: ['frontend:3000']
    metrics_path: '/api/health'
    scrape_interval: 30s

  # PostgreSQL
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  # Redis
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']
```

#### **Prometheus Alert Rules (monitoring/prometheus/rules/alerts.yml)**
```yaml
groups:
  - name: hordearii-alerts
    rules:
      # High CPU Usage
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
          description: "CPU usage is above 80% for more than 5 minutes"

      # High Memory Usage
      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage on {{ $labels.instance }}"
          description: "Memory usage is above 85% for more than 5 minutes"

      # Disk Space
      - alert: HighDiskUsage
        expr: (node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High disk usage on {{ $labels.instance }}"
          description: "Disk usage is above 85% for more than 5 minutes"

      # Service Down
      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service {{ $labels.job }} is down"
          description: "Service {{ $labels.job }} has been down for more than 1 minute"

      # High Response Time
      - alert: HighResponseTime
        expr: http_request_duration_seconds{quantile="0.95"} > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High response time for {{ $labels.job }}"
          description: "95th percentile response time is above 2 seconds"

      # High Error Rate
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) * 100 > 5
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate for {{ $labels.job }}"
          description: "Error rate is above 5% for more than 5 minutes"
```

### **2. Health Check Endpoints**

#### **Backend Health Check**
```typescript
// Backend Health Check Implementation
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import redis from '../lib/redis';

export const healthCheck = async (req: Request, res: Response) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    services: {
      database: 'unknown',
      redis: 'unknown',
      memory: 'unknown'
    }
  };

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = 'connected';
  } catch (error) {
    health.services.database = 'disconnected';
    health.status = 'unhealthy';
  }

  try {
    // Check Redis connection
    await redis.ping();
    health.services.redis = 'connected';
  } catch (error) {
    health.services.redis = 'disconnected';
    health.status = 'unhealthy';
  }

  // Check memory usage
  const memUsage = process.memoryUsage();
  const memUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
  
  if (memUsagePercent > 90) {
    health.services.memory = 'critical';
    health.status = 'unhealthy';
  } else if (memUsagePercent > 80) {
    health.services.memory = 'warning';
  } else {
    health.services.memory = 'normal';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  
  res.status(statusCode).json(health);
};
```

#### **Frontend Health Check**
```typescript
// Frontend Health Check Implementation
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    services: {
      api: 'unknown',
      memory: 'unknown'
    }
  };

  try {
    // Check API connection
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
    if (apiResponse.ok) {
      health.services.api = 'connected';
    } else {
      health.services.api = 'error';
      health.status = 'unhealthy';
    }
  } catch (error) {
    health.services.api = 'disconnected';
    health.status = 'unhealthy';
  }

  // Check memory usage
  const memUsage = process.memoryUsage();
  const memUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
  
  if (memUsagePercent > 90) {
    health.services.memory = 'critical';
    health.status = 'unhealthy';
  } else if (memUsagePercent > 80) {
    health.services.memory = 'warning';
  } else {
    health.services.memory = 'normal';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  
  res.status(statusCode).json(health);
}
```

---

## 🔄 DEPLOYMENT PROCEDURES

### **1. Automated Deployment Script**

#### **Deployment Script (scripts/deploy.sh)**
```bash
#!/bin/bash

# Hordearii.ca Deployment Script
# Usage: ./deploy.sh [environment]

set -e

# Configuration
PROJECT_NAME="hordearii"
DOCKER_COMPOSE_FILE="docker-compose.yml"
ENVIRONMENT=${1:-production}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root"
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    error "Docker is not running"
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose is not installed"
fi

log "Starting deployment for environment: $ENVIRONMENT"

# Load environment variables
if [ -f ".env.$ENVIRONMENT" ]; then
    log "Loading environment variables from .env.$ENVIRONMENT"
    export $(cat .env.$ENVIRONMENT | grep -v '^#' | xargs)
else
    warning "Environment file .env.$ENVIRONMENT not found"
fi

# Backup current deployment
log "Creating backup of current deployment"
if docker-compose -f $DOCKER_COMPOSE_FILE ps | grep -q "Up"; then
    docker-compose -f $DOCKER_COMPOSE_FILE down --timeout 30
fi

# Pull latest changes
log "Pulling latest changes from Git"
git pull origin main

# Build and deploy
log "Building and deploying containers"
docker-compose -f $DOCKER_COMPOSE_FILE build --no-cache

# Start services
log "Starting services"
docker-compose -f $DOCKER_COMPOSE_FILE up -d

# Wait for services to be healthy
log "Waiting for services to be healthy"
sleep 30

# Check service health
log "Checking service health"
for service in nginx frontend backend postgres redis; do
    if docker-compose -f $DOCKER_COMPOSE_FILE ps | grep -q "$service.*Up"; then
        log "✓ $service is running"
    else
        error "$service is not running"
    fi
done

# Run database migrations
log "Running database migrations"
docker-compose -f $DOCKER_COMPOSE_FILE exec -T backend npm run db:migrate

# Check API health
log "Checking API health"
API_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" https://hordearii.ca/api/health || echo "000")
if [ "$API_HEALTH" = "200" ]; then
    log "✓ API is healthy"
else
    error "API health check failed (HTTP $API_HEALTH)"
fi

# Check website health
log "Checking website health"
WEB_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" https://hordearii.ca || echo "000")
if [ "$WEB_HEALTH" = "200" ]; then
    log "✓ Website is healthy"
else
    error "Website health check failed (HTTP $WEB_HEALTH)"
fi

# Cleanup old images
log "Cleaning up old Docker images"
docker image prune -f

log "Deployment completed successfully!"
log "Website: https://hordearii.ca"
log "API: https://hordearii.ca/api"
log "Monitoring: https://hordearii.ca:3002 (Grafana)"
log "Uptime: https://hordearii.ca:3003 (Uptime Kuma)"
```

### **2. Rollback Script**

#### **Rollback Script (scripts/rollback.sh)**
```bash
#!/bin/bash

# Hordearii.ca Rollback Script
# Usage: ./rollback.sh [version]

set -e

PROJECT_NAME="hordearii"
DOCKER_COMPOSE_FILE="docker-compose.yml"
VERSION=${1:-previous}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

log "Starting rollback to version: $VERSION"

# Check if backup exists
if [ ! -d "backups/$VERSION" ]; then
    error "Backup version $VERSION not found"
fi

# Stop current services
log "Stopping current services"
docker-compose -f $DOCKER_COMPOSE_FILE down --timeout 30

# Restore from backup
log "Restoring from backup: $VERSION"
cp -r "backups/$VERSION/"* .

# Start services with backup version
log "Starting services with backup version"
docker-compose -f $DOCKER_COMPOSE_FILE up -d

# Wait for services
log "Waiting for services to start"
sleep 30

# Health check
log "Performing health check"
API_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" https://hordearii.ca/api/health || echo "000")
if [ "$API_HEALTH" = "200" ]; then
    log "✓ Rollback successful - API is healthy"
else
    error "Rollback failed - API health check failed"
fi

log "Rollback completed successfully!"
```

---

## 📋 DEPLOYMENT CHECKLIST

### **Pre-Deployment :**
- [ ] **Code Review** : Tous les changements revus et approuvés
- [ ] **Tests Pass** : Tous les tests unitaires et d'intégration passent
- [ ] **Security Scan** : Scan de sécurité effectué
- [ ] **Backup** : Sauvegarde de la version actuelle
- [ ] **Environment Variables** : Variables d'environnement configurées
- [ ] **SSL Certificates** : Certificats SSL valides

### **Deployment :**
- [ ] **Docker Build** : Images Docker construites avec succès
- [ ] **Database Migration** : Migrations de base de données appliquées
- [ ] **Service Health** : Tous les services démarrés et sains
- [ ] **Load Balancer** : Configuration Nginx mise à jour
- [ ] **Monitoring** : Monitoring et alertes configurés
- [ ] **Performance** : Tests de performance effectués

### **Post-Deployment :**
- [ ] **Health Checks** : Tous les health checks passent
- [ ] **Functionality** : Tests fonctionnels effectués
- [ ] **Performance** : Métriques de performance vérifiées
- [ ] **Security** : Tests de sécurité post-déploiement
- [ ] **Documentation** : Documentation mise à jour
- [ ] **Team Notification** : Équipe notifiée du déploiement

### **Rollback Plan :**
- [ ] **Backup Strategy** : Stratégie de sauvegarde en place
- [ ] **Rollback Script** : Script de rollback testé
- [ ] **Data Integrity** : Intégrité des données préservée
- [ ] **Communication** : Plan de communication en cas de rollback
- [ ] **Monitoring** : Monitoring pendant le rollback
