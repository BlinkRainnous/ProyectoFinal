const STATIC_CACHE = 'static-05-2020';
const DYNAMIC_CACHE = 'dynamic-05-2020';
const INMUTABLE_CACHE = 'inmutable-05-2020';

const DYNAMIC_CACHE_LIMIT = 100;


function limpiarCache(cacheName, numItems) {
    caches.open(cacheName)
        .then(cache => {
            return cache.keys()
                .then(keys => {
                    if (keys.length > numItems) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numItems));
                    }
                });
        });
}


const APP_SHELL = [
    '/',
    '/planes',
    '/general',
    '/error',
    'app.js',
    'js/home.js',
    'js/planes.js',
    'assets/css/styles.css',
    'assets/icons/web/ajustes.svg',
    'assets/icons/web/buscar.svg',
    'assets/icons/web/calendario.svg',
    'assets/icons/web/clima.svg',
    'assets/icons/web/general.svg',
    'assets/icons/web/lugares.svg',
    'assets/icons/web/perfil.svg',
    'assets/icons/web/planes.svg',
    'assets/icons/favicon.ico',
    'assets/img/kda.jpg',
    'assets/img/plumas.jpg',
    'assets/img/error.jpg',
    'assets/img/landscape.png'
];

const APP_SHELL_INMUTABLE = [
    'https://kit.fontawesome.com/3c16f4957b.js',
];



self.addEventListener('install', e => {

    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
        cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }
            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }
        });

    });

    e.waitUntil(respuesta);
});


self.addEventListener('fetch', e => {

    // Cache with Network Fallback
    const respuesta = caches.match(e.request).then(res => {

        if (res) {
            return res;
        } else {
            // Filtro para evitar errores y usar solo peticiones https
            if (!/^https?:$/i.test(new URL(e.request.url).protocol)) return;
            return fetch(e.request).then(newRes => {

                caches.open(DYNAMIC_CACHE)
                    .then(cache => {
                        cache.put(e.request, newRes);
                        limpiarCache(DYNAMIC_CACHE, DYNAMIC_CACHE_LIMIT);
                    });

                return newRes.clone();  // IMPORTANTE: Clonar la respuesta (es un stream) 
            })

                .catch(err => {
                    if (e.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/pages/error.html');
                    }
                });
        }

    });

    e.respondWith(respuesta);
});
