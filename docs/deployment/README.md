# 🚀 DÉPLOIEMENT HIVEOS - HORDEARII.CA

## 📋 Vue d'ensemble

Ce guide vous permet de déployer hordearii.ca sur votre rig de minage HiveOS en quelques étapes simples.

---

## ⚡ DÉPLOIEMENT RAPIDE

### **Option 1 : Script automatisé (Recommandé)**

```bash
# Se connecter à votre rig Ubuntu Server/HiveOS
ssh [utilisateur]@[IP_DE_VOTRE_RIG]

# Exemple :
ssh jiuba@192.168.0.19

# Puis passer en root si nécessaire
sudo su -

# Télécharger et exécuter le script de déploiement
curl -fsSL https://raw.githubusercontent.com/votre-username/jobcv/main/scripts/ubuntu-server-deploy.sh -o ubuntu-server-deploy.sh
chmod +x ubuntu-server-deploy.sh
./ubuntu-server-deploy.sh
```

### **Option 2 : Déploiement manuel**

Suivez le guide détaillé : [Guide complet](deployment-hiveos-detailed-guide.md)

---

## 🎯 RÉSULTAT FINAL

Après le déploiement, vous aurez :

- ✅ **Site web** : https://hordearii.ca
- ✅ **API backend** : https://hordearii.ca/api
- ✅ **SSL sécurisé** : Certificats Let's Encrypt
- ✅ **Monitoring** : Grafana + Prometheus
- ✅ **Backup automatique** : Quotidien
- ✅ **Mise à jour automatique** : Via Git

---

## 🔧 COMMANDES UTILES

```bash
# Vérifier l'état des services
./status.sh

# Faire un backup
./backup.sh

# Mettre à jour le site
./update.sh

# Voir les logs
docker-compose logs -f

# Redémarrer les services
docker-compose restart
```

---

## 📊 MONITORING

- **Grafana** : http://[IP_DU_RIG]:3002 (admin/[mot_de_passe])
- **Prometheus** : http://[IP_DU_RIG]:9090

---

## 🆘 DÉPANNAGE

### **Problèmes courants**

**Site inaccessible :**
```bash
# Vérifier les services
./status.sh

# Vérifier les logs
docker-compose logs nginx
```

**Erreur SSL :**
```bash
# Renouveler les certificats
certbot renew
docker-compose restart nginx
```

**Base de données :**
```bash
# Vérifier PostgreSQL
docker-compose logs postgres
docker-compose restart postgres
```

---

## 📚 DOCUMENTATION

- [Guide détaillé](ubuntu-server-detailed-guide.md) - Pour programmeurs en études
- [Spécifications de déploiement](deployment-specifications.md) - Architecture technique
- [Guide Ubuntu Server](ubuntu-server-deployment-guide.md) - Guide original

---

## 🎓 POUR LES ÉTUDIANTS

Ce projet est parfait pour apprendre :
- **Docker** et conteneurisation
- **DevOps** et déploiement
- **Monitoring** et observabilité
- **Sécurité** web
- **Architecture** microservices
- **Ubuntu Server** et administration système

---

## 📞 SUPPORT

En cas de problème :
1. Consultez la [documentation](deployment-hiveos-detailed-guide.md)
2. Vérifiez les [logs](deployment-hiveos-detailed-guide.md#dépannage)
3. Utilisez les [scripts de diagnostic](deployment-hiveos-detailed-guide.md#commandes-de-diagnostic)

---

## 🚀 BONNE CHANCE !

Votre rig HiveOS est maintenant un serveur web professionnel ! 🎉
