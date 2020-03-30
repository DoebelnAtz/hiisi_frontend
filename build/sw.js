
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
			new workbox.strategies.StaleWhileRevalidate({
				cacheName: 'test-build-api-cache',
			})
		);

		workbox.routing.registerRoute(
			new RegExp('^https://cdn.intra.42.fr/.*'),
			new workbox.strategies.CacheFirst({
				cacheName: 'cdn-cache',
			})
		);

		workbox.routing.registerRoute(
			new RegExp('^https://hivemind-42.com/api/.*'),
			new workbox.strategies.StaleWhileRevalidate({
				cacheName: 'api-cache',
			})
		);
		workbox.core.clientsClaim();
    	workbox.precaching.precacheAndRoute([{"revision":"f7c4fcc625a08c3f0960e15bbad5ca6a","url":"index.html"},{"revision":"4416b3f8cb133848cd743d95a99847cd","url":"ipad-icon.png"},{"revision":"374f92b4684cd4fc84cbe96ffdd95615","url":"ipad-retina-icon.png"},{"revision":"1d5f036aba5fbdf77add90253346808f","url":"iphone-retina-icon.png"},{"revision":"a418d84302dd2101f28932693919bd6b","url":"LogoLarge.png"},{"revision":"681a872a9f117fa6626c8d12b0826736","url":"static/css/main.f28a53e4.chunk.css"},{"revision":"620240f2662ad1b6023b5ecb0e1ae689","url":"static/js/2.4deead51.chunk.js"},{"revision":"9b43abc96664958b6947069e8c05b55a","url":"static/js/main.13de623d.chunk.js"},{"revision":"d0d61ad9ea2b7f6c014647a38b9f59cb","url":"static/js/runtime-main.70302f69.js"},{"revision":"ebc2274164ca513403873469571af1e8","url":"static/media/GuardsBGDark2.ebc22741.png"}]);
		workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
			  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
			});

} else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}