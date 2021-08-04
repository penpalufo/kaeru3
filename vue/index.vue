<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<p><a v-bind:href="source_url" target="_blank" class="btn btn-primary" role="button">preview : {{ source_name }}</a></p>

<pre><code>
</code></pre>

	</article>
	</div>
</template>

<script>
module.exports = {
	data: function() {
		return {
			category: 'Top',
			title: 'dist | 公開用',
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