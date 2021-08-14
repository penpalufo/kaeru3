<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<dl>
			<dt>monaca</dt>
				<dd><a href="https://ja.monaca.io/" target="_blank">公式</a></dd>

			<dt>Cordova</dt>
				<dd><a href="https://cordova.apache.org/" target="_blank">公式</a></dd>

			<dt>Cordova</dt>
				<dd><a href="https://cordova.apache.org/" target="_blank">公式</a></dd>

		</dl>

	</article>
	</div>
</template>

<script>
module.exports = {
	data: function() {
		return {
			category: 'Memo',
			title: 'アプリ化 | メモ',
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
