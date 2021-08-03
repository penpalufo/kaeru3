<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ 左右ボタンで自機移動</h4>
		<p><a v-bind:href="source_url" target="_blank" class="btn btn-primary" role="button">preview : {{ source_name }}</a></p>

<pre><code>create(){
	// -- 左右ボタンのスプライト定義
	this.btn_left  = this.physics.add.sprite(147, 600, "left");
	this.btn_right = this.physics.add.sprite(228, 600, "right");

	// -- プレイヤーのカエル
	this.player = this.physics.add.sprite(187, 100, "player");
	this.player.anims.play("swim");

	// -- 左右ボタンが押されたら
	this.btn_left.setInteractive().on('pointerdown', ()=>{
		this.player.x -= 40;
	});
	this.btn_right.setInteractive().on('pointerdown', ()=>{
		this.player.x += 40;
	});
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
			title: 'ボタンで自機移動',
			source_name: 'btn',
			source_url: './preview.html#' + 'btn',
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