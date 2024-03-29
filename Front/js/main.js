let localUsername = null;
let localPassword = null;

function messageAlert(message, type = 1) {
	const alert = document.getElementById('alert-text');
	alert.innerHTML = message;

	const icon = document.getElementById('alert-icon');
	switch(type) {
		case 0:	// Action réussie
			icon.className = "fa-solid fa-check";
			icon.style = "color: #00ff40;";
			break;

		default:
		case 1:	// Message d'information
			icon.className = "fa-solid fa-circle-info";
			icon.style = "color: #0e7ab8;";
			break;

		case 2:	// Action échouée
			icon.className = "fa-solid fa-xmark";
			icon.style = "color: #ff0000;";
			break;
	}
}

async function displayAllTweets() {
	const input = document.getElementById('inputSearch');
	input.value = "";

	// Récupérer tous les tweets
	const url = 'http://localhost:5000/showTweets';
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();

	display(data.tweets);
}

async function displayFilteredTweets() {
	const input = document.getElementById('inputSearch');

	if (input.value == "") {
		displayAllTweets();
		return;
	}

	const url = 'http://localhost:5000/searchRelatedTweets';
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"search": input.value
		})
	});
	const data = await response.json();

	display(data.tweets);
}

async function retweet(tweet_id) {
	if (localUsername && localPassword) {
		const url = 'http://localhost:5000/retweet';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"user": localUsername,
				"password": localPassword,
				"tweet_id": tweet_id
			})
		});
		const data = await response.json();
		if (data.success) {
			displayFilteredTweets();
			messageAlert("Tweet retweeté.", 0);
		}
		else
			messageAlert("Tweet déjà retweeté.", 2)
	}
	else
		messageAlert("Veuillez vous connecter.", 1);
}

async function addTweet() {
	if (localUsername && localPassword) {
		const input = document.getElementById('inputTweet');
		const value = input.value;

		const url = 'http://localhost:5000/newTweet';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"user": localUsername,
				"password": localPassword,
				"message": value
			})
		});
		const data = await response.json();
		if (data.success) {
			displayFilteredTweets();
			messageAlert("Tweet ajouté.", 0);
		}
		else
			messageAlert("Tweet n'a pas été ajouté.", 2);
	}
	else
		messageAlert("Veuillez vous connecter.", 1);
}

async function login() {
	let inputUsernameLogin = document.getElementById('inputUsernameLogin');
	let inputPasswordLogin = document.getElementById('inputPasswordLogin');

	const url = 'http://localhost:5000/login';
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"user": inputUsernameLogin.value,
			"password": inputPasswordLogin.value
		})
	});
	const data = await response.json();
	if (data.success) {
		localUsername = inputUsernameLogin.value;
		localPassword = inputPasswordLogin.value;
		messageAlert("Connexion réussie.", 0);
		console.log("Logged as " + inputUsernameLogin.value);
	}
	else {
		inputUsernameLogin.value = "";
		messageAlert("Echec de connexion.", 2);
	}

	inputPasswordLogin.value = "";
}

async function register() {
	let inputUsernameRegister = document.getElementById('inputUsernameRegister');
	let inputPasswordRegister = document.getElementById('inputPasswordRegister');

	const url = 'http://localhost:5000/register';
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"user": inputUsernameRegister.value,
			"password": inputPasswordRegister.value
		})
	});
	const data = await response.json();
	if (data.success) {
		localUsername = inputUsernameRegister.value;
		localPassword = inputPasswordRegister.value;
		messageAlert("Inscription et connexion réussie.", 0);
		console.log("Registered and logged as " + inputUsernameRegister.value);

		let inputUsernameLogin = document.getElementById('inputUsernameLogin');
		inputUsernameLogin.value = localUsername;
	}
	else
		messageAlert("Echec d'inscription.", 2);

	inputUsernameRegister.value = "";
	inputPasswordRegister.value = "";
}

function display(tweets) {
	// Supprimer les tweets existants
	const feed = document.getElementById("feed");
	feed.innerHTML = "";

	// Ajouter les tweets à la liste
	// Template du feed disponible sur https://flowbite.com/docs/components/timeline/
	tweets.forEach(tweet => {
		const item = document.createElement('li');
		item.className = 'mb-10 ml-4';

		// Heure du tweet
		const time = document.createElement('time');
		time.className = 'mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500';
		const dateFormatted = new Date(tweet.date).toLocaleString('fr-FR', { weekday:"long", day:"numeric", year:"numeric", month:"short", hour:"numeric", minute:"numeric"});
		time.innerHTML = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);

		// Auteur du tweet
		const author = document.createElement('h3');
		author.className = 'text-lg font-semibold text-gray-900 dark:text-white';
		author.innerHTML = tweet.author;
		author.addEventListener('click', () => {
			const input = document.getElementById('inputSearch');
			input.value = tweet.author;
			displayFilteredTweets();
		});

		// Contenu du tweet
		const message = document.createElement('p');
		message.className = 'mb-4 text-base font-normal text-gray-500 dark:text-gray-400';
		message.innerHTML = tweet.message;

		// Sujets détectés
		const hashtagsDetected = document.createElement('div');
		hashtagsDetected.className = 'mb-4 text-base font-normal text-gray-500 dark:text-gray-400';
		hashtagsDetected.innerHTML = 'Sujets : ';
		tweet.hashtags.forEach(hashtag => {
			const hashtagDetected = document.createElement('span');
			hashtagDetected.className = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 mr-1';
			hashtagDetected.innerHTML = hashtag;
			hashtagDetected.addEventListener('click', () => {
				const input = document.getElementById('inputSearch');
				input.value = hashtag;
				displayFilteredTweets();
			});
			hashtagsDetected.appendChild(hashtagDetected);
		});

		// Bouton de retweet
		const btnRetweet = document.createElement('a');
		btnRetweet.className = 'inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700';
		btnRetweet.innerHTML = 'Retweet';
		// Ajouter un événement au clic
		btnRetweet.addEventListener('click', () => {
			retweet(tweet.id);
		});

		// Icon de retweet
		const iconRetweet = document.createElement('i');
		iconRetweet.className = 'fa-solid fa-share-from-square mr-1';

		// Nombre de retweets
		const countRetweets = document.createElement('span');
		countRetweets.appendChild(iconRetweet);
		countRetweets.className = 'inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400 ml-4';
		if (tweet.retweets.length > 1) {
			countRetweets.innerHTML += tweet.retweets.length + " retweets - ";
			tweet.retweets.forEach(retweet => {
			countRetweets.innerHTML += retweet + " ";
			});
		} else if (tweet.retweets.length == 1 ) {
			countRetweets.innerHTML += tweet.retweets.length + " retweet - " ;
			tweet.retweets.forEach(retweet => {
			countRetweets.innerHTML += retweet + " ";
			});
		} else if (tweet.retweets.length > 5 ) {
			countRetweets.innerHTML += tweet.retweets.length + " retweets - ";
			for (let i = 0; i < 5; i++) {
				countRetweets.innerHTML += tweet.retweets[i] + " ";
			countRetweets.innerHTML += "...";
		}
		} else {
			countRetweets.innerHTML += "Aucun retweet";
		}

		item.appendChild(time);
		item.appendChild(author);
		item.appendChild(message);
		if (tweet.hashtags.length > 0) {
			item.appendChild(hashtagsDetected);
		}
		item.appendChild(btnRetweet);
		item.appendChild(countRetweets);

		feed.appendChild(item);
	});
}

displayAllTweets();