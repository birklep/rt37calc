self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("rt37-cache-20251119").then(cache => {
      return cache.addAll([
        "./index.html",
        "./manifest.json"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

