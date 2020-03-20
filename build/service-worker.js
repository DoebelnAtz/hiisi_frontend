/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.f76f30c20463b58a20cbdad3a412711d.js"
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
