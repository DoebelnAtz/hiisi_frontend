// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA

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
