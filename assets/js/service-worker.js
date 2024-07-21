const CACHE_NAME = 'tsuki-odissey-cache-v1';
const urlsToCache = [
  '/',
  '/ads.txt',
  '/combinaciones.html',
  '/eventos.html',
  '/gachaboy.html',
  '/index.html',
  '/manifest.json',
  '/personajes.html',
  '/README.md',
  '/robots.txt',
  '/sitemap.xml',
  '/assets/css/movil.css',
  '/assets/css/style.css',
  '/assets/css/wallpaper.jpg',
  '/assets/css/wallpapertsuky.jpg',
  '/assets/fonts/Coffee Fills.ttf',
  '/assets/img/BackgroundTsuki.jpg',
  '/assets/img/ColabDiscord.jpg',
  '/assets/img/Gachaboy.png',
  '/assets/img/Logo.png',
  '/assets/img/Quicksand.zip',
  '/assets/img/The Daily Carrot Logo.png',
  '/assets/img/tsukiportada.jpg',
  '/assets/img/Tsukis_Odyssey_Portada.png',
  '/assets/img/wallpapertsuky.jpg',
  '/assets/img/wikicolabLogo.webp',
  '/assets/img/Colections/Colection 1.png',
  '/assets/img/Colections/Colection 2.png',
  '/assets/img/Colections/Colection 3.png',
  '/assets/img/Colections/Colection 4.png',
  '/assets/img/events/April_Fools_Icon.webp',
  '/assets/img/events/Christmas_Icon.webp',
  '/assets/img/events/Easter_Icon.webp',
  '/assets/img/events/Festival_del_Mar_Evento.webp',
  '/assets/img/events/Halloween_Icon.webp',
  '/assets/img/events/Marine_Matters_Icon.webp',
  '/assets/img/events/SummerFest_Icon.webp',
  '/assets/img/mapa/DawnsWorkshop.png',
  '/assets/img/mapa/Map.webp',
  '/assets/img/mapa/MermaidCoast.png',
  '/assets/img/tips/tipCalabaza.jpg',
  '/assets/img/tips/tipcaña.jpg',
  '/assets/img/tips/TipDescuento.jpg',
  '/assets/img/tips/tippesca.jpeg',
  '/assets/img/tips/tipTreboles.jpg',
  '/assets/js/codes.js',
  '/assets/js/combinations.js',
  '/assets/js/fishes.js',
  '/assets/js/hours.js',
  '/assets/js/notificaciones.js',
  '/assets/js/personajes.js',
  '/assets/js/script.js',
  '/assets/js/service-worker.js',
  '/assets/js/tips.js',
  '/assets/js/database/combinations.json',
  '/assets/js/python/combinationadd.py',
  '/testswebs/codetest.html',
  '/testswebs/dinamicBackground.html',
  '/testswebs/items.csv',
  '/testswebs/logros.html',
  '/testswebs/maptest.html',
  '/testswebs/Personajescodes.html',
  '/testswebs/testdawns.html',
  '/testswebs/Timelinebeta.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


// Intercepción de las peticiones de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          networkResponse => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return networkResponse;
          }
        );
      })
  );
});

// Manejar la reconexión
self.addEventListener('online', () => {
  console.log('Back online');
  // Aquí puedes realizar acciones específicas cuando vuelva la conexión
});
