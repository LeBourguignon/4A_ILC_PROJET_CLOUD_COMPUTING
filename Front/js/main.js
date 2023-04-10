function refresh() {
	console.log('Refreshing...');
	// Créer une alerte avec un message personnalisé
	// https://tailwindcss.com/components/alerts

	const alert = document.createElement('div');
	alert.classList.add('bg-blue-500', 'text-white', 'font-bold', 'rounded-t', 'px-4', 'py-3', 'shadow-md', 'mb-2');
	alert.setAttribute('role', 'alert');
	alert.innerHTML = 'Refreshing...';

	// Ajouter l'alerte au body
	const container = document.querySelector('body');
	container.insertBefore(alert, container.firstChild);

	// Supprimer l'alerte après 2 secondes
	setTimeout(() => {
		alert.remove();
	}, 2000);
}