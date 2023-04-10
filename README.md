#  4A_ILC_PROJET_CLOUD_COMPUTING

Ce projet a pour objectif de développer les différentes composantes de microservices nécessaires pour recréer un service de type SaaS (Software-as-a-Service) similaire à `Twitter`.

Ce projet sera composé de deux parties distinctes : le [frontend](Front/README.md) et le [backend](Back/README.md).

*Auteurs :* [Baptiste Andres](https://github.com/LeBourguignon) et [Tom Roth](https://github.com/tom-rh)

*Spécialité :* ILC

[![Build API](https://github.com/LeBourguignon/4A_ILC_PROJET_CLOUD_COMPUTING/actions/workflows/build-api.yml/badge.svg)](https://github.com/LeBourguignon/4A_ILC_PROJET_CLOUD_COMPUTING/actions/workflows/build-api.yml)

## Procédure de démarrage

*Prérequis : Docker installé* 

### Démarrage de `Redis`

Conteneurisation de redis

```
docker run --name cloudComputingRedis -p 6379:6379 redis
```

### Démarrage de l'`API`

Création de l'image de l'API :

```
docker build -t cloud-computing-api Back/
```

Conteneurisation de l'API en créant un lien avec Redis :

```
docker run -d --name cloudComputingApi -p 5000:5000 --link cloudComputingRedis:redis cloud-computing-api
```

### Démarrage du serveur `NGINX`

Création de l'image du serveur :

```
docker build -t cloud-computing-nginx Front/
```

Conteneurisation du serveur en créant un lien avec l'API :

```
docker run -d --name cloudComputingNginx -p 8080:8080 --link cloudComputingApi:api cloud-computing-nginx
```