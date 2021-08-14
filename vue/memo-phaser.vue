<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<dl>
			<dt>リファレンス</dt>
				<dd><a href="https://phaser.io/phaser3" target="_blank">Phaser3 official</a></dd>
				<dd><a href="https://photonstorm.github.io/phaser3-docs/index.html" target="_blank">Phaser3 APIドキュメント</a></dd>
				<dd><a href="https://rexrainbow.github.io/phaser3-rex-notes/docs/site/index.html" target="_blank">Phaser3 リファレンス（本家よりイイ）</a></dd>
			<dt>まずはココ</dt>
				<dd><a href="https://naruhodo.repop.jp/phaser-3-memo/" target="_blank">Phaser 3での各種記述や変更点メモ</a></dd>
				<dd><a href="https://qiita.com/gakuseikai/items/062d2c3d132bf430fcb9" target="_blank">Phaser3の豆知識（背景の画像がずっと横移動する方法）</a></dd>
				<dd><a href="https://1-notes.com/phaser-3-group-codes/" target="_blank">Phaser 3 | group関連のサンプルコード集</a></dd>
				<dd><a href="https://naosim.hatenablog.jp/entry/2018/10/17/075533" target="_blank">アクションRPG Day5 衝突</a></dd>
				<dd><a href="https://gpnotes.hatenablog.jp/entry/2018/11/26/160756" target="_blank">Phaser 3 : ブロック崩しを作ってみる ④　Dataを使ってみる</a></dd>
				<dd><a href="https://1-notes.com/add-text-set-parameter/" target="_blank">Phaser 3 | テキストの各パラメータ一覧と指定方法</a></dd>
				<dd><a href="https://mijinc0.github.io/blog/post/20200820_phaser3_about/" target="_blank">html5ゲームフレームワーク Phaser3</a></dd>
				<dd><a href="https://qiita.com/41semicolon/items/0d2f2509d4ac1558badb" target="_blank">Phaser 3 でゲーム作成入門</a></dd>
				<dd><a href="https://1-notes.com/add-text-set-touch-events/" target="_blank">Phaser 3 | テキストにクリックイベントを実装する方法</a></dd>
				<dd><a href="https://qiita.com/r-ytakada/items/79456097c294fb49cf08" target="_blank">Phaserでブラウザゲー制作 Part.2 ジャンピングゲーム</a></dd>
				<dd><a href="https://gpnotes.hatenablog.jp/entry/2019/01/16/170100" target="_blank">Phaser 3 : depthで重なり順の制御</a></dd>


			<dt>動きに関しては</dt>
				<dd><a href="https://labs.phaser.io/index.html?dir=physics/arcade/&q=" target="_blank">Physics/Arcade</a></dd>
				<dd><a href="https://labs.phaser.io/index.html?dir=physics/matterjs/&q=" target="_blank">Physics/Matterjs</a></dd>
				<dd><a href="https://labs.phaser.io/index.html?dir=transform/&q=" target="_blank">Transform(オブジェクトの変形や回転)</a></dd>
			<dt>衝突の範囲指定</dt>
				<dd><pre><code>this.スプライト.body.setSize(23, 23); // 衝突範囲</code></pre></dd>
			<dt>アニメーションの現在のコマ番号</dt>
				<dd><pre><code>アニメのオブジェクト.frame.name</code></pre></dd>
			<dt>グループの作成とスプライトの追加</dt>
				<dd><pre><code>this.grp_stones = this.physics.add.group();
this.grp_stones.add(this.physics.add.sprite("stone"));</code></pre></dd>
		</dl>

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
	dt{
		margin-top: 30px;
	}
</style>