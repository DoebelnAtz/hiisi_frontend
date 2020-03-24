
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
			new workbox.strategies.CacheFirst({
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
			new workbox.strategies.CacheFirst({
				cacheName: 'api-cache',
			})
		);
		workbox.core.clientsClaim();
    	workbox.precaching.precacheAndRoute([{"revision":"e896bc1c56eae316b9cdb6a6ac891d18","url":"index.html"},{"revision":"4416b3f8cb133848cd743d95a99847cd","url":"ipad-icon.png"},{"revision":"374f92b4684cd4fc84cbe96ffdd95615","url":"ipad-retina-icon.png"},{"revision":"1d5f036aba5fbdf77add90253346808f","url":"iphone-retina-icon.png"},{"revision":"a418d84302dd2101f28932693919bd6b","url":"LogoLarge.png"},{"revision":"825680aafbf98520ccbcc64542ae5355","url":"static/css/main.cc57ad11.chunk.css"},{"revision":"ae05f7744516fdcb0f8443eec100f69c","url":"static/js/2.ac2aa883.chunk.js"},{"revision":"b3e77345cd251e12b49ca41196fc677a","url":"static/js/main.440cca73.chunk.js"},{"revision":"d0d61ad9ea2b7f6c014647a38b9f59cb","url":"static/js/runtime-main.70302f69.js"},{"revision":"4f3a185e0d0d90af484cb96df3fb7234","url":"static/media/giticon.4f3a185e.png"},{"revision":"ebc2274164ca513403873469571af1e8","url":"static/media/GuardsBGDark2.ebc22741.png"}]);
		workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
			  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
			});

} else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}