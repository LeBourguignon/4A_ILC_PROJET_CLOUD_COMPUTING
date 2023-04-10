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

* La route `/register` permet d'enregistrer un nouvel utilisateur.

	Requête (exemple) :

	```
	curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom"}' http://localhost:5000/register
	```

	Réponse (exemple) :

	```
	{ "success": True }
	```

* La route `/login` permet de vérifier si le couple d'utilisateur et de mot de passe est correct.

	Requête (exemple) :

	```
	curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom"}' http://localhost:5000/login
	```

	Réponse (exemple) :

	```
	{ "success": True }
	```

* La route `/changePassword` permet de modifier le mot de passe d'un utilisateur.

	Requête (exemple) :

	```
	curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom", "newPassword": "itsTom"}' http://localhost:5000/changePassword
	```

	Réponse (exemple) :

	```
	{ "success": True }
	```

#### Gestion des Tweets

Pour gérer les Tweets, nous avons implémenté deux routes utilisant la méthode `POST`, et pour chacune d'entre elles, il est nécessaire de prouver l'identité de l'utilisateur en fournissant le mot de passe :

* La route `/newTweet` permet de publier un nouveau Tweet.

	Requête (exemple) :

	```
	curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom", "message": "Ceci est un test ! #test"}' http://localhost:5000/newTweet
	```

	Réponse (exemple) :

	```
	{ "success": True }
	```

* La route `/retweet` permet de retweeter un Tweet en utilisant l'identifiant du Tweet.

	Requête (exemple) :

	```
	curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom", "password": "tomtom", "tweet_id": 0}' http://localhost:5000/retweet
	```

	Réponse (exemple) :

	```
	{ "success": True }
	```

#### Affichage des Tweets

Pour obtenir tous les Tweets ou des Tweets spécifiques, nous avons implémenté plusieurs routes en utilisant les méthodes `GET` ou `POST`:

* La route `/showTweets` permet d'obtenir tous les Tweets en utilisant la méthode `GET`.

	Requête (exemple) :

	```
	curl -X GET http://localhost:5000/showTweets
	```

	Réponse (exemple) :

	```
	{
		"tweets": [
			{
				"id": ...,
				"author": ...,
				"date": ...,
				"hashtags": [...],
				"message": ...,
				"retweets": [...]
			},
			...
		]
	}
	```

* La route `/showUserTweets` permet d'obtenir tous les Tweets liés à un utilisateur, c'est-à-dire ses Tweets ou ses retweets, en utilisant la méthode `POST`.

	Requête (exemple) :

	```
	curl -X POST -H "Content-Type: application/json" -d '{"user": "Tom"}' http://localhost:5000/showUserTweets
	```

	Réponse (exemple) :

	```
	{
		"tweets": [
			{
				"id": ...,
				"author": "Tom",
				"date": ...,
				"hashtags": [...],
				"message": ...,
				"retweets": ["Tom", ...]
			},
			...
		]
	}
	```

* La route `/showHashtags` permet d'obtenir la liste de tous les sujet (hashtags) existants en utilisant la méthode `GET`.

	Requête (exemple) :

	```
	curl -X GET http://localhost:5000/showHashtags
	```

	Réponse (exemple) :

	```
	{
		"hashtags": [...]
	}
	```

* La route `/showHashtagTweets` permet d'obtenir tous les Tweets liés à un sujet (hashtag) en utilisant la méthode `POST`.

	Requête (exemple) :

	```
	curl -X POST -H "Content-Type: application/json" -d '{"hashtag": "#test"}' http://localhost:5000/showHashtagTweets
	```

	Réponse (exemple) :

	```
	{
		"tweets": [
			{
				"id": ...,
				"author": ...,
				"date": ...,
				"hashtags": ["#test", ...],
				"message": ...,
				"retweets": [...]
			},
			...
		]
	}
	```

## Base de données

[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)