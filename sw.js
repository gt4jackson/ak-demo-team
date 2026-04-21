const CACHE_NAME = 'ak-demo-v2';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Never cache API calls — always go to network. Cache-first for static assets only.
  if (e.request.url.includes('script.google.com')) {
    e.respondWith(fetch(e.request));
    return;
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});
