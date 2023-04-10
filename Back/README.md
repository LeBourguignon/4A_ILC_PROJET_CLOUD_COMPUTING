# Backend

Le backend de notre SaaS est constitué d'une API qui est le cerveau et d'une base de données qui est la mémoire.

## API 

Notre API a été réalisée en utilisant le langage de programmation Python ainsi que la bibliothèque Flask.

[![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)

[![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/en/2.2.x/)

Pour communiquer des données avec notre API, nous utilisons uniquement des requêtes et des réponses `HTTP` avec la structure [`JSON`](https://fr.wikipedia.org/wiki/JavaScript_Object_Notation)

### Requêtes et réponses `HTTP`

#### Gestion de l'API

Pour nous assurer du bon fonctionnement de l'API, nous avons implémenté deux routes en utilisant la méthode `GET`:

* La route racine `/` qui renvoie simplement un message `Hello World!`.

Requête :

```
curl -X GET http://localhost:5000/
```

* La route `/healthz`, souvent utilisée par des systèmes tels que Kubernetes, qui retourne `200`.

Requête :

```
curl -X GET http://localhost:5000/healthz
```

#### Gestion des utilisateurs

Pour gérer les utilisateurs, nous avons implémenté plusieurs routes utilisant la méthode `POST`:

* La route `/seekUser` permet de rechercher si un utilisateur existe.

Requête (exemple) :

```
curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom"}' http://localhost:5000/seekUser
```

Réponse (exemple) :

```
{ "find": True }
```

## Base de données

[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)