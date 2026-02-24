const CACHE_NAME = "portfolio-pwa-v4";
const PRECACHE_URLS = [
  "index.html",
  "gallery.html",
  "newstep.html",
  "404.html",
  "style.css",
  "newstep.css",
  "script.js",
  "newstep.js",
  "manifest.json",
  "favicon.png",
  "NS.png",
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
  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isCriticalAsset =
    event.request.destination === "document" ||
    event.request.destination === "script" ||
    event.request.destination === "style";

  if (isSameOrigin && isCriticalAsset) {
    // Network-first for HTML/CSS/JS so updates appear without hard refresh.
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() =>
          caches.match(event.request).then(cached => cached || caches.match("404.html"))
        )
    );
    return;
  }

  // Cache-first for non-critical assets such as images.
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
