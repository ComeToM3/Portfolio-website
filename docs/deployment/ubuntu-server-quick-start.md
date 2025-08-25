# 🚀 GUIDE DE DÉMARRAGE RAPIDE - UBUNTU SERVER
## Déploiement hordearii.ca sur Ubuntu Server

---

## ⚡ **DÉPLOIEMENT EN 5 MINUTES**

### **1. Connexion au serveur**
```bash
# Depuis votre PC, connectez-vous à Ubuntu Server
ssh jiuba@192.168.0.19

# Passez en mode root
sudo su -
```

### **2. Téléchargement et exécution du script**
```bash
# Télécharger le script de déploiement
curl -fsSL https://raw.githubusercontent.com/votre-username/jobcv/main/scripts/ubuntu-server-deploy.sh -o ubuntu-server-deploy.sh

# Rendre le script exécutable
chmod +x ubuntu-server-deploy.sh

# Lancer le déploiement automatisé
./ubuntu-server-deploy.sh
```

### **3. Suivre les instructions du script**
Le script vous guidera à travers :
- Installation de Docker et Docker Compose
- Configuration du firewall
- Transfert du projet
- Configuration SSL
- Création des scripts de maintenance

---

## 🎯 **RÉSULTAT FINAL**

Après le déploiement, vous aurez :
- ✅ **Site web** : https://hordearii.ca
- ✅ **API backend** : https://hordearii.ca/api
- ✅ **SSL sécurisé** : Certificats Let's Encrypt
- ✅ **Monitoring** : 
  - Grafana : http://192.168.0.19:3002
  - Prometheus : http://192.168.0.19:9090

---

## 🔧 **COMMANDES UTILES**

```bash
# Se connecter au serveur
ssh jiuba@192.168.0.19

# Vérifier l'état des services
cd /var/www/hordearii && ./status.sh

# Faire un backup
./backup.sh

# Voir les logs
docker-compose logs -f

# Redémarrer les services
docker-compose restart
```

---

## 📊 **CONFIGURATION DNS**

Dans votre panneau DNS, ajoutez :
```
Type: A
Name: @
Value: 192.168.0.19

Type: A
Name: www
Value: 192.168.0.19
```

---

## 🆘 **DÉPANNAGE RAPIDE**

**Site inaccessible :**
```bash
./status.sh
docker-compose logs nginx
```

**Erreur SSL :**
```bash
sudo certbot renew
docker-compose restart nginx
```

**Base de données :**
```bash
docker-compose logs postgres
docker-compose restart postgres
```

---

## 📚 **DOCUMENTATION COMPLÈTE**

- [Guide détaillé](ubuntu-server-detailed-guide.md) - Guide complet pour programmeurs
- [Spécifications](deployment-specifications.md) - Architecture technique

---

## 🎓 **POUR LES ÉTUDIANTS**

Ce déploiement vous apprendra :
- **Ubuntu Server** administration
- **Docker** et conteneurisation
- **DevOps** et déploiement automatisé
- **SSL/TLS** et sécurité web
- **Monitoring** avec Grafana/Prometheus

---

## 🚀 **BONNE CHANCE !**

Votre Ubuntu Server est maintenant un serveur web professionnel ! 🎉
