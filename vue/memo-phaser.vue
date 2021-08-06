<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<dl>
			<dt>動きに関しては</dt>
				<dd><a href="https://labs.phaser.io/index.html?dir=physics/arcade/&q=" target="_blank">Physics/Arcade</a></dd>
				<dd><a href="https://labs.phaser.io/index.html?dir=physics/matterjs/&q=" target="_blank">Physics/Matterjs</a></dd>
				<dd><a href="https://labs.phaser.io/index.html?dir=transform/&q=" target="_blank">Transform(オブジェクトの変形や回転)</a></dd>
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
			title: 'Phaser | メモ',
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