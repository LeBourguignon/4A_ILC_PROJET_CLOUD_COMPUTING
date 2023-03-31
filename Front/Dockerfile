# Utiliser une image de base alpine
FROM alpine:latest

# Installer Nginx
RUN apk add --no-cache nginx

# Copier le fichier de configuration de Nginx dans le conteneur
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 8080

# Démarrer Nginx en arrière-plan lors de l'exécution du conteneur
CMD ["nginx", "-g", "daemon off;"]
