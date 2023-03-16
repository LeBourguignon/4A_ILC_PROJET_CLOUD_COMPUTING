// Fontion ajouter permettant de récupérer les données de l'API et de les afficher dans la console

function getResultAdd() {
    // Récupération des données de l'API
    fetch('http://localhost:5000/add/')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Fonction soustraire permettant de récupérer les données de l'API et de les afficher dans la console

function getResultSub() {
    // Récupération des données de l'API
    fetch('http://localhost:5000/sub/')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Fonction multiplier permettant de récupérer les données de l'API et de les afficher dans la console

function getResultMul() {
    // Récupération des données de l'API
    fetch('http://localhost:5000/mul/')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Fonction diviser permettant de récupérer les données de l'API et de les afficher dans la console

function getResultDiv() {
    // Récupération des données de l'API
    fetch('http://localhost:5000/div/')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
}