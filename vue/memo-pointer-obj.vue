<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<p><a v-bind:href="source_url" target="_blank" class="btn btn-primary" role="button">preview : {{ source_name }}</a></p>

<pre><code>create(){

	// -- プレイヤーのカエル
	this.player = this.physics.add.sprite(187, 100, "player");
	this.player.anims.play("swim");

	// -- プレイヤーをマウスに追従させる
	this.input.on('pointermove', (pointer)=>{
		this.physics.moveToObject(this.player, pointer, 200);
	}, this);

}
</code></pre>

	</article>
	</div>
</template>

<script>
module.exports = {
	data: function() {
		return {
			category: 'Memo',
			title: 'pointer-obj | 自機がポインターに追従',
			source_name: 'pointer-obj',
			source_url: './preview.html#' + 'pointer-obj',
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