let localUsername = null;
let localPassword = null;

function filterFeed() {
	// Récupérer la valeur de l'input
	const input = document.getElementById('inputSearch');
	const value = input.value;
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
	}
}

async function addTweet() {
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
	}
}

async function login() {
	let inputUsernameLogin = document.getElementById('inputUsernameLogin');
	let inputPasswordLogin = document.getElementById('inputPasswordLogin');

	console.log(inputUsernameLogin.value);
	console.log(inputPasswordLogin.value);

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
	console.log(data.success);
	if (data.success) {
		localUsername = inputUsernameLogin.value;
		localPassword = inputPasswordLogin.value;
		console.log("Logged as " + inputUsernameLogin.value);
	}

	inputUsernameLogin.value = "";
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
	//console.log(data);
	if (data.success) {
		localUsername = inputUsernameRegister.value;
		localPassword = inputPasswordRegister.value;
		console.log("Registered and logged as " + inputUsernameRegister.value);
	}

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

		const time = document.createElement('time');
		time.className = 'mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500';
		const dateFormatted = new Date(tweet.date).toLocaleString('fr-FR', { weekday:"long", day:"numeric", year:"numeric", month:"short", hour:"numeric", minute:"numeric"});
		time.innerHTML = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);

		const author = document.createElement('h3');
		author.className = 'text-lg font-semibold text-gray-900 dark:text-white';
		author.innerHTML = tweet.author;
		author.addEventListener('click', () => {
			const input = document.getElementById('inputSearch');
			input.value = tweet.author;
			displayFilteredTweets();
		});

		const message = document.createElement('p');
		message.className = 'mb-4 text-base font-normal text-gray-500 dark:text-gray-400';
		message.innerHTML = tweet.message;

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

		const btnRetweet = document.createElement('a');
		btnRetweet.className = 'inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700';
		btnRetweet.innerHTML = 'Retweet';
		// Ajouter un événement au clic
		btnRetweet.addEventListener('click', () => {
			// Ajouter le nom de l'utilisateur à la liste des retweets
			tweet.retweets.push('Tom');
			// Rafraîchir la page
			refresh();
		});

		const iconRetweet = document.createElement('i');
		iconRetweet.className = 'fa-solid fa-share-from-square mr-1';

		const countRetweets = document.createElement('span');
		countRetweets.appendChild(iconRetweet);
		countRetweets.className = 'inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400 ml-4';
		countRetweets.innerHTML += tweet.retweets.length + " retweets";

		item.appendChild(time);
		item.appendChild(author);
		item.appendChild(message);
		item.appendChild(hashtagsDetected);
		item.appendChild(btnRetweet);
		item.appendChild(countRetweets);

		feed.appendChild(item);
	});
}

displayAllTweets();