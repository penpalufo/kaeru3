<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<dl>
			<dt>blog</dt>
				<dd><a href="https://qiita.com/umamichi/items/0e2b4b1c578e7335ba20" target="_blank">PWA 入門 〜iOS SafariでPWAを体験するまで〜 2019年7月更新</a></dd>
				<dd><a href="https://coliss.com/articles/build-websites/operation/work/turn-your-website-into-a-pwa.html" target="_blank">WebサイトをPWA（プログレッシブウェブアプリ）にする手順とその必要性</a></dd>
				<dd><a href="https://qiita.com/poster-keisuke/items/6651140fa20c7aa18474" target="_blank">PWAをもっと簡単に初めてみる</a></dd>
				<dd><a href="https://qiita.com/k_7016/items/503fbb85c9dba80d23f7" target="_blank">Service Worker触ってみた</a></dd>
				<dd>かなり詳細→<a href="https://qiita.com/y_fujieda/items/f9e765ac9d89ba241154" target="_blank">Service Workerの基本とそれを使ってできること</a></dd>
				<dd><a href="https://knowledge.sakura.ad.jp/23201/" target="_blank">ネイティブアプリ風Webアプリ「PWA」を実現する3つの技術</a></dd>
			<dt>覚書</dt>
				<dd>・「service worker」はブラウザのJSと別で動く（変数とか渡せない）</dd>
				<dd>・同サーバから読み込むファイルはすべてキャッシュしておく。</dd>
				<dd>・「localhost」と「SSL」でしか動かない。localhostでテストする場合はhttpで動かす（SSL証明書ないからhttpsだと動かない）</dd>
		</dl>

		<p>[manifest.json]</p>
<pre><code>{
    "short_name": "kaeru3",
    "name": "PWA kaeru3 app",
    "display": "standalone",
    "start_url": "pwa.html",
    "icons": [
        {
            "src": "./assets/img/icon.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ]
}
</code></pre>

		<p>[service_worker.js]</p>
<pre><code>// キャッシュファイルの指定
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
	'/kaeru3/assets/img/geme-play.png',
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
</code></pre>

	</article>
	</div>
</template>

<script>
module.exports = {
	data: function() {
		return {
			category: 'Memo',
			title: 'PWA化 | メモ',
		}
	},
	created: function(){
		console.log('* created');
	},
	mounted: function(){
		console.log('* mounted');
		document.querySelectorAll('pre code').forEach((el) => {
			hljs.highlightElement(el);
		});
	}
}
</script>

<style scoped>
	dt{
		margin-top: 30px;
	}
</style>
