
if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */

	/* custom cache rules*/
	  
		workbox.routing.registerRoute(
			new RegExp('^http://localhost:5000/api/.*'),
			new workbox.strategies.NetworkFirst({
				cacheName: 'dev-build-api-cache',
			})
		);

		workbox.routing.registerRoute(
			new RegExp('^https://cdn.intra.42.fr/.*'),
			new workbox.strategies.CacheFirst({
				cacheName: 'cdn-cache',
			})
		);

		workbox.routing.registerRoute(
			new RegExp('^https:/https://api-dot-hiisi-297910.ew.r.appspot.com/api/.*'),
			new workbox.strategies.NetworkFirst({
				cacheName: 'api-cache',
			})
		);
		workbox.core.clientsClaim();
    	workbox.precaching.precacheAndRoute([{"revision":"c8921704de8a9f8ae2c6353332023d5f","url":"index.html"},{"revision":"4416b3f8cb133848cd743d95a99847cd","url":"ipad-icon.png"},{"revision":"374f92b4684cd4fc84cbe96ffdd95615","url":"ipad-retina-icon.png"},{"revision":"1d5f036aba5fbdf77add90253346808f","url":"iphone-retina-icon.png"},{"revision":"a418d84302dd2101f28932693919bd6b","url":"LogoLarge.png"},{"revision":"681a872a9f117fa6626c8d12b0826736","url":"static/css/main.f28a53e4.chunk.css"},{"revision":"34c43f1e8aa774cf542cff0d90e07c27","url":"static/js/2.70fbefe4.chunk.js"},{"revision":"00782e41c14e0757bf2f7a7e6acab390","url":"static/js/main.eea06581.chunk.js"},{"revision":"d0d61ad9ea2b7f6c014647a38b9f59cb","url":"static/js/runtime-main.70302f69.js"},{"revision":"ebc2274164ca513403873469571af1e8","url":"static/media/GuardsBGDark2.ebc22741.png"}]);
		workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
			  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
			});

} else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}