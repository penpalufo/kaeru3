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
