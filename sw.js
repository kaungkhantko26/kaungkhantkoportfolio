const CACHE_NAME = "portfolio-pwa-v2";
const PRECACHE_URLS = [
  "index.html",
  "gallery.html",
  "404.html",
  "action.html",
  "style.css",
  "script.js",
  "action.js",
  "manifest.json",
  "favicon.png",
  "profile.JPG",
  "Po1.pdf",
  "gallery/KAUNGKHANTKO(fb-KaungKhantKo).jpg",
  "gallery/Photoshop.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match("404.html"));
    })
  );
});
