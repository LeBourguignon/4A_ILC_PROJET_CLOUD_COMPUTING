# Utiliser l'image de base Python avec Flask
FROM python:3.10-slim

# Installer Flask et Redis
RUN pip install Flask redis flask-cors

# Définir le répertoire de travail
WORKDIR /Back

# Copier les fichiers d'application dans le conteneur
COPY . .

# Exposer le port d'écoute de l'application
EXPOSE 5000

# Lancer l'application Flask
CMD ["python", "api.py"]

# docker build -t cloud-computing-api .
# docker run -d --name cloudComputingApi -p 5000:5000 --link cloudComputingRedis:localhost cloud-computing-api