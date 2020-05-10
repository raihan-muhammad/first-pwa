const CACHE_NAME = "firstpwa-v2";
const urlsToChace = [
  "./",
  "./nav.html",
  "./index.html",
  "./pages/home.html",
  "./pages/about.html",
  "./pages/contact.html",
  "./css/materialize.min.css",
  "./js/materialize.min.js",
  "./js/nav.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToChace);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then((response) => {
      if (response) {
        console.log(
          `Service Worker menggunakan aset dari cache: ${response.url}`
        );
        return response;
      }
      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          } else {
            console.log("a");
          }
        })
      );
    })
  );
});
