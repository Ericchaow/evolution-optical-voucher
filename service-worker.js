const CACHE_NAME = 'xiaoe-app-shell-v1';

const STATIC_ASSETS = [
  './offline.html',
  './admin-icon-180.png',
  './admin-icon-192.png',
  './admin-icon-512.png',
  './partner-icon-180.png',
  './partner-icon-192.png',
  './partner-icon-512.png',
  './staff-icon-180.png',
  './staff-icon-192.png',
  './staff-icon-512.png',
  './welcome-glasses.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never cache Supabase/API/auth traffic.
  if (
    url.hostname.includes('supabase.co') ||
    url.pathname.includes('/auth/') ||
    url.pathname.includes('/rest/') ||
    url.pathname.includes('/rpc/')
  ) {
    return;
  }

  // HTML/navigation: network first, offline fallback.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('./offline.html'))
    );
    return;
  }

  // Same-origin static files: cache first, then network.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        });
      })
    );
  }
});
