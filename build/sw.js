
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
			new RegExp('^https://hivemind-42.com/api/.*'),
			new workbox.strategies.NetworkFirst({
				cacheName: 'api-cache',
			})
		);
		workbox.core.clientsClaim();
    	workbox.precaching.precacheAndRoute([{"revision":"865103ff3d149aa4bb6bb7aadfe879cd","url":"index.html"},{"revision":"4416b3f8cb133848cd743d95a99847cd","url":"ipad-icon.png"},{"revision":"374f92b4684cd4fc84cbe96ffdd95615","url":"ipad-retina-icon.png"},{"revision":"1d5f036aba5fbdf77add90253346808f","url":"iphone-retina-icon.png"},{"revision":"a418d84302dd2101f28932693919bd6b","url":"LogoLarge.png"},{"revision":"681a872a9f117fa6626c8d12b0826736","url":"static/css/main.f28a53e4.chunk.css"},{"revision":"8479bf915adc80b895755933d7b1ba1b","url":"static/js/2.bd41ac19.chunk.js"},{"revision":"b90a64025b733ee334dcb7144808f1b6","url":"static/js/main.e29afcc8.chunk.js"},{"revision":"d0d61ad9ea2b7f6c014647a38b9f59cb","url":"static/js/runtime-main.70302f69.js"},{"revision":"ebc2274164ca513403873469571af1e8","url":"static/media/GuardsBGDark2.ebc22741.png"}]);
		workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
			  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
			});

} else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}