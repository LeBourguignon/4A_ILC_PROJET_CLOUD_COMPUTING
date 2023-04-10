[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

# Twitter

## Code

L'ensemble de l'affichage est géré en HTML/CSS/JS.
Tailwind fournit des composants prêt à être utilisé et a aussi pour avantage de gérer tout le CSS dans le fichier html directement.
Nous avons également utilisé Flowbite qui est elle-même basée sur Tailwind.

Toutes les fonctions d'affichage, d'actions (ajouter un tweet, retweet, ..), d'inscription et de connexion se trouvent dans le fichier JavaScript.

## Interface

### Barre de recherche

La barre de recherche permet de filtrer les tweets affichés.
- En commençant votre recherche avec #, vous obiendrez tous les tweets ayant le même hastage.
- Sinon la recherche se fera en fonction des utilisateurs. Si un utilisateur est trouvé, les tweets de l'utilisateur et ceux qu'il a retweet seront affichés.

À noter que dans le cas où rien n'est spécifié dans la barre de recherche, tous les tweets sont affichés.

![Recherche](https://cloud.tom-roth.fr/index.php/s/ENB7oQzBG4ZfPxm/preview)

### Tweet

Un tweet est composé de différentes informations.
- Date et heure.
- Nom de l'auteur.
- Contenu du tweet.
- Sujets détectés en back.
- Bouton retweet.
- Nombre de retweets et le nom des 5 premières personnes qui ont retweet.

En cliquant sur le nom de l'auteur ou l'un des sujets, on affiche directement une vue filtrée en fonction de la valeur sur laquelle l'utilisateur a cliqué.

![Recherche](https://cloud.tom-roth.fr/index.php/s/yc9x2oP3KsK95NW/preview)

### Menu

Le menu permet de réaliser 3 actions.
- Actualiser le fil.
- Ajouter un nouveau Tweet (dans une fenêtre pop-up).
- Se connecter et s'incrire (dans une fenêtre pop-up).

![Menu](https://cloud.tom-roth.fr/index.php/s/4qcX3TWjaXmneyE/preview)

### Connexion et inscription

Une pop-up permet de se connecter avec un nom d'utilisateur et un mot de passe. Il est également possible de s'inscrire.

![Connexion](https://cloud.tom-roth.fr/index.php/s/2QqN4W777cBsnmC/preview)

### Message d'information

En bas à droite de l'écran se trouve des messages d'informations, d'échecs et de réussites pour chaque action réalisée.

![Alerte](https://cloud.tom-roth.fr/index.php/s/KH6dFGrWLt5dC9a/preview)
