/*
 * service_worker_local.js
 */



// キャッシュファイルの指定
var CACHE_NAME = 'pwa-kaeru3-caches';
var urlsToCache = [
	'/phaser3/kaeru3/',
	'/phaser3/kaeru3/pwa.html',
	'/phaser3/kaeru3/assets/css/game.css',
	'/phaser3/kaeru3/assets/js/app.js',
	'/phaser3/kaeru3/assets/js/dist.js',
	'/phaser3/kaeru3/assets/img/kaeru/game-stone.png',
	'/phaser3/kaeru3/assets/img/kaeru/game-stone-test.png',
	'/phaser3/kaeru3/assets/img/geme-title.png',
	'/phaser3/kaeru3/assets/img/kaeru/kaeru.png',
	'/phaser3/kaeru3/assets/img/kaeru/mizukusa.png',
	'/phaser3/kaeru3/assets/img/kaeru/shadow.png',
	'/phaser3/kaeru3/assets/img/kaeru/fish.png',
	'/phaser3/kaeru3/assets/img/kaeru/zari.png',
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