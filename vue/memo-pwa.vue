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
		</dl>

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
