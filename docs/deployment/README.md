# 🚀 Déploiement et Infrastructure

Ce dossier contient toutes les informations relatives au déploiement et à l'infrastructure du projet HORDEARII.CA.

## 📄 Fichiers

### 🏗 [deployment-specifications.md](./deployment-specifications.md)
**Spécifications de déploiement** - Définit l'architecture d'infrastructure et les spécifications de déploiement.

**Contenu :**
- Architecture d'infrastructure
- Spécifications techniques
- Configuration des services
- Monitoring et observabilité
- Stratégies de déploiement

### 🖥️ [hiveos-deployment-guide.md](./hiveos-deployment-guide.md)
**Guide de déploiement HiveOS** - Guide étape par étape pour déployer sur un rig HiveOS.

**Contenu :**
- Préparation de l'environnement HiveOS
- Installation des dépendances
- Configuration des services
- Déploiement de l'application
- Monitoring et maintenance

## 🚀 Utilisation

### Pour le déploiement initial :
1. **`deployment-specifications.md`** - Comprendre l'architecture d'infrastructure
2. **`hiveos-deployment-guide.md`** - Suivre le guide de déploiement HiveOS

### Pour la maintenance :
- Consultez les spécifications pour les mises à jour
- Suivez les procédures de monitoring
- Référez-vous aux guides de maintenance

## 🏗 Architecture d'Infrastructure

```
HiveOS Standard Rig
├── Docker Engine
├── Containers
│   ├── Nginx (reverse proxy + TLS 1.3)
│   ├── Next.js app (frontend)
│   ├── Express.js API (backend)
│   ├── PostgreSQL (database)
│   ├── Redis (cache)
│   └── Prometheus/Grafana (monitoring)
├── PM2 (process manager)
└── SSL/TLS (Let's Encrypt)
```

## 🔗 Liens utiles

- **Spécifications** : `../specifications/`
- **Guides de développement** : `../guides/`
- **Plans d'exécution** : `../plans/`

## 📝 Notes importantes

- **Hébergement** : Infrastructure personnelle sur HiveOS Standard
- **Sécurité** : TLS 1.3, certificate pinning, monitoring avancé
- **Monitoring** : Prometheus + Grafana + Sentry
- **Backup** : Stratégies de sauvegarde automatisées

---

*Ces documents garantissent un déploiement sécurisé et maintenable sur infrastructure personnelle*
