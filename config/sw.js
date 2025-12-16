const CACHE_NAME = 'Swipe the Game v1';
const ASSETS = [
    '../',
    '../index.html',
    '../styles/style.css',
    '../styles/menu.css',
    '../script.js',
    '../utils/colorSetter.js',
    '../menuManager.js',
    './manifest.json',
    '../icons/icon-192.png',
    '../icons/icon-512.png',
    '../fonts/poppins-v24-latin-regular.woff2',
    '../fonts/poppins-v24-latin-700.woff2',
];

//installation
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

//fetch data
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});