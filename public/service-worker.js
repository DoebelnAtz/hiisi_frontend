// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.d9a7384cc75b43db24765a2bf3050c39.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

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

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {

  blacklist: [/^\/_/,/\/[^\/?]+\.[^\/]+$/],
});
