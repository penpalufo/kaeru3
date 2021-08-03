<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<p><a v-bind:href="source_url" target="_blank" class="btn btn-primary" role="button">preview : {{ source_name }}</a></p>

<pre><code>create(){
	// -- 左右ボタンのスプライト定義
	this.btn_left  = this.physics.add.sprite(147, 600, "left");
	this.btn_right = this.physics.add.sprite(228, 600, "right");
}
</code></pre>

	</article>
	</div>
</template>

<script>
module.exports = {
	data: function() {
		return {
			category: 'Top',
			title: 'Kaeru3',
			source_name: 'dist',
			source_url: './preview.html#' + 'dist',
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