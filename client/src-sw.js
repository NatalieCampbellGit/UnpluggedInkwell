// Caching js and css requires workbox-strategies to be installed
// To actually respond to requests with a cached response, we need to use a strategy called StaleWhileRevalidate
// This strategy will first check the cache for a response, and if it finds one, it will return it.

// Import the required Workbox modules
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache the assets defined in the __WB_MANIFEST array
precacheAndRoute(self.__WB_MANIFEST);

//! Implement asset caching
// Set up asset cache
registerRoute(
  // Define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new CacheFirst({
    // Name of the cache storage for assets
    cacheName: 'asset-cache',
    plugins: [
      // The plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

//! Implement caching for install.js (if the file exists)
registerRoute(
  // Define the callback function that will filter the requests we want to cache (install.js)
  ({ request }) => request.destination === 'script' && request.url.includes('install.js'),
  new CacheFirst({
    // Name of the cache storage for install.js
    cacheName: 'install-cache',
    plugins: [
      // The plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);