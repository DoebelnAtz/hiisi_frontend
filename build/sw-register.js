if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/serviceWorker.js').then(
			function(registration) {

			},
			function(err) {

			},
		);
	});
}
