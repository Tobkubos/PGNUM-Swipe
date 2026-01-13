const CACHE_NAME = 'Swipe the Game v2';
const ASSETS = [
    "./",
    "./index.html",

    "./main.js",

    "./CSS/gameplay.css",
    "./CSS/menu.css",
    "./CSS/popups.css",
    "./CSS/style.css",
    "./CSS/toast.css",

    "./scripts/player/effects.js",
    "./scripts/player/movementHandler.js",
    "./scripts/player/player.js",
    "./scripts/player/skins.js",

    "./scripts/UI/ui_effectSelector.js",
    "./scripts/UI/ui_game.js",
    "./scripts/UI/ui_menu.js",
    "./scripts/UI/ui_other.js",
    "./scripts/UI/ui_skinSelector.js",

    "./scripts/utils/colors.js",
    "./scripts/utils/colorSetter.js",
    "./scripts/utils/resizer.js",
    "./scripts/utils/sceneTransition.js",
    "./scripts/utils/screenShake.js",
    "./scripts/utils/timeManager.js",
    "./scripts/utils/treasureShaker.js",

    "./scripts/sceneManager.js",
    "./scripts/obstaclesManager.js",

    "./manifest.json",

    "./images/icon-192.png",
    "./images/icon-512.png",

    "./images/skins/devil.png",
    "./images/skins/eyeball.png",
    "./images/skins/ghost.png",
    "./images/skins/pumpkin.png",
    "./images/skins/Skibidi_Toilet.png",
    "./images/skins/spider.png",
    "./images/skins/Stone.png",
    "./images/skins/zombie.png",

    "./images/back.png",
    "./images/close.png",
    "./images/gear.png",
    "./images/google.svg",
    "./images/lock.png",
    "./images/login-avatar.png",
    "./images/logout.png",
    "./images/pause.png",
    "./images/play.png",
    "./images/question-sign.png",
    "./images/restart.png",
    "./images/star.png",
    "./images/treasure-chest.png",
    "./images/trophy.png",

    "./fonts/poppins-v24-latin-regular.woff2",
    "./fonts/poppins-v24-latin-700.woff2",
    "./fonts/PermanentMarker-Regular.woff2"
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
