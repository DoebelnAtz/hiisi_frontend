if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/serviceWorker.js').then(
			function(registration) {
				console.log('service worker online');
			},
			function(err) {
				console.log('service worker failed to start: ' + err);
			},
		);
	});
}
