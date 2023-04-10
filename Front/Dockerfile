# Utiliser une image de base alpine
FROM alpine:latest

# Installer Nginx
RUN apk add --no-cache nginx

# Copier le fichier de configuration de Nginx dans le conteneur
COPY nginx.conf /etc/nginx/nginx.conf

# Copier le fichier html dans le conteneur
COPY index.html /usr/share/nginx/index.html

# Copier le dossier js dans le conteneur
COPY js /usr/share/nginx/js

# Exposer le port 80
EXPOSE 8080

# Démarrer Nginx en arrière-plan lors de l'exécution du conteneur
CMD ["nginx", "-g", "daemon off;"]

# Commande docker :
# docker build -t cloud-computing-nginx .
# docker run -d --name cloudComputingNginx -p 8080:8080 --link cloudComputingApi:api cloud-computing-nginx