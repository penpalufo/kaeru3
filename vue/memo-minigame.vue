<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<dl>
			<dt><a href="https://h5games.success-corp.co.jp/" target="_blank">ゲームの窓</a></dt>
			<dt><a href="https://icolor.jp/minigame/" target="_blank">テンプレ・ゲームをカスタマイズして販売</a></dt>
		</dl>

		<h4>■ ゲーム素材</h4>
		<dl>
			<dt><a href="https://biz.moneyforward.com/blog/21173/" target="_blank">【要保存】アプリ開発の初心者必見！アイコンやキャラクターの制作に役立つ、フリー素材サイト20選</a></dt>
			<dt><a href="http://yms.main.jp/index.html" target="_blank">■ ドット絵世界</a></dt>
			<dt><a href="https://sites.google.com/site/closetvx/" target="_blank">■ CLOSET</a></dt>
			<dt><a href="https://qiita.com/TD12734/items/5dc8068732f94452efe2" target="_blank">■ 無料で使えるゲーム素材公開サイト まとめ</a></dt>
			<dt><a href="https://kenney.nl/assets" target="_blank">■ Kenny（ココイイ！）</a></dt>
		</dl>

<pre><code>
</code></pre>

	</article>
	</div>
</template>

<script>
module.exports = {
	data: function() {
		return {
			category: 'Memo',
			title: 'minigame | メモ',
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
</style>
