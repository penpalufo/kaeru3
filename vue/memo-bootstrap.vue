<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<p><a href="https://getbootstrap.jp/" target="_blank">オフィシャルサイト</a></p>
		<p><a href="https://getbootstrap.jp/docs/5.0/getting-started/introduction/" target="_blank">ドキュメント</a></p>
		<p><a href="https://icons.getbootstrap.com/" target="_blank">アイコン一覧</a></p>

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
			title: 'Bootstrap | メモ',
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