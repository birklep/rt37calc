const CACHE_NAME = "rt37-cache-v12";   // <- bei jedem Update erhöhen!

// Alle Dateien, die offline verfügbar sein sollen
const OFFLINE_URLS = [
  "/rt37calc/",
  "/rt37calc/index.html",
  "/rt37calc/manifest.json",
  "/rt37calc/icon-192.png",
  "/rt37calc/icon-512.png"
];

// INSTALLATION – Cache vorbereiten
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting(); // sofort aktiv werden
});

// AKTIVIEREN – alte Caches löschen
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)   // alle alten löschen
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // neue Version sofort für alle Tabs verwenden
});

// FETCH – erst Cache prüfen, dann Netzwerk
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});





