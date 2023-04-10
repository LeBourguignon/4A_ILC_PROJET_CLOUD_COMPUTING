function filterFeed() {
	// Récupérer la valeur de l'input
	const input = document.getElementById('inputSearch');
	const value = input.value;
}

function refresh() {
	console.log('Refreshing...');
	// Créer une alerte avec un message personnalisé
	// https://tailwindcss.com/components/alerts

	const alert = document.createElement('div');
	alert.classList.add('bg-blue-500', 'text-white', 'font-bold', 'rounded-t', 'px-4', 'py-3', 'shadow-md', 'mb-2');
	alert.setAttribute('role', 'alert');
	alert.innerHTML = 'Refreshing...';

	// Récupérer les tweets
	const tweets = data.tweets;

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

refresh();