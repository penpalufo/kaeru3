/*
 * service_worker_local.js
 */



// キャッシュファイルの指定
var CACHE_NAME = 'pwa-kaeru3-caches';
var urlsToCache = [
	'/kaeru3/',
	'/kaeru3/pwa.html',
	'/kaeru3/assets/css/game.css',
	'/kaeru3/assets/js/app.js',
	'/kaeru3/assets/js/dist.js',
	'/kaeru3/assets/img/kaeru/game-stone.png',
	'/kaeru3/assets/img/kaeru/game-stone-test.png',
	'/kaeru3/assets/img/geme-title.png',
	'/kaeru3/assets/img/kaeru/kaeru.png',
	'/kaeru3/assets/img/kaeru/mizukusa.png',
	'/kaeru3/assets/img/kaeru/shadow.png',
	'/kaeru3/assets/img/kaeru/fish.png',
	'/kaeru3/assets/img/kaeru/zari.png',
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});