<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<p><a v-bind:href="source_url" target="_blank" class="btn btn-primary" role="button">preview : {{ source_name }}</a></p>

<pre><code>/*
 * dist.js
 */

let game;	// ゲームインスタンス

let _opt = {
	kaeruY: 200,
}



/*
 |
 |
 | << onload >>
 |
 |
 */
window.onload = function() {
	console.log('window.onload');

	let config = {
		type: Phaser.AUTO,
		width: 375,
		height: 667,
		parent: 'phaser-example',
		physics: {
			default: 'arcade',
			arcade: {
				debug: false
			}
		},
		scene: [
			preload_Game,
			opening_Game,
			play_Game
		],
		backgroundColor: "#32CAFD", // 背景色
		render: {	// ピクセル処理を無効にしてアンチエイリアス
			pixelArt: false
		},
	};

	game = new Phaser.Game(config);

	// ウィンドウにフォーカス
	window.focus();

	// ウィンドウサイズに合わせてキャンバスをリサイズ
	_app.resize();

	// リサイズイベントにresizeハンドラ登録
	window.addEventListener("resize", _app.resize, false);

}



/*
 |
 |
 | << Scene : preload_Game >>
 |
 |
 */

class preload_Game extends Phaser.Scene{

	// コンストラクタ
	constructor(){
		super("preload_Game");
	}

	/*
	 * -- プリロード
	 */

	preload(){
		console.log('preload_Game | preload()');

		this.load.image('title', './assets/img/geme-title.png');
		this.load.image('play', './assets/img/geme-play.png');
		this.load.spritesheet('player', './assets/img/kaeru/kaeru.png',   { frameWidth: 120, frameHeight: 108 });
		this.load.spritesheet('plant',  './assets/img/kaeru/mizukusa.png',{ frameWidth: 158, frameHeight: 311 });
		this.load.spritesheet('stone',  './assets/img/kaeru/game-stone-test.png',{ frameWidth: 305, frameHeight: 350 });
		this.load.image('shadow', './assets/img/kaeru/shadow.png');
	}




	/*
	 * create()
	 */
	create(){
		console.log('preload_Game | create()');

		// プレイヤーのアニメーション定義
		this.anims.create({
			key: "anim_player",
			frames: this.anims.generateFrameNumbers("player", { start: 0, end: 11 }),
			frameRate: 8,
			repeat: -1
		});

		// 水草のアニメーション定義
		this.anims.create({
			key: "anim_plant",
			frames: this.anims.generateFrameNumbers("plant", { start: 0, end: 47 }),
			frameRate: 8,
			repeat: -1
		});

		// 岩のアニメーション定義
		this.anims.create({
			key: "anim_stone",
			frames: this.anims.generateFrameNumbers("stone", { start: 0, end: 9 }),
			frameRate: 0.75,
			repeat: -1
		});

		// メインのシーンへ
		this.scene.start("opening_Game");
	}


}



/*
 |
 |
 | << Scene : openinng_Game >>
 |
 |
 */

class opening_Game extends Phaser.Scene{

	// コンストラクタ
	constructor(){
		super("opening_Game");
	}

	create(){
		console.log('opening_Game | create()');

		this.title = this.physics.add.sprite(187, 100, "title");
		this.title.setScale(0.4);
		this.btn_play = this.physics.add.sprite(187, 300, "play");
		this.btn_play.setScale(0.4);

		this.btn_play.setInteractive().on('pointerdown', ()=>{
			this.scene.start("play_Game");
		});
	}


}



/*
 |
 |
 | << Scene : play_Game >> メインルーチン
 |
 |
 */

class play_Game extends Phaser.Scene{

	// コンストラクタ
	constructor(){
		super("play_Game");
	}

	/*
	 * 初期化
	 */

	create(){
		console.log('play_Game | create()');

		/*
		 * -- 水草(plants)
		 */
		this.plants = this.physics.add.group({
			key: 'plant',
			quantity: 2,
		});

		this.plants.children.iterate(function(child){
			child.setX(_app.rnd(game.config.width, 0));
			child.setY(_app.rnd(game.config.height, 0));
			child.play('anim_plant'); // アニメ再生
			child.setScale((_app.rnd(5, 0) + 5) * 0.1);
	    });



		/*
		 * -- 岩
		 */
		this.stone_num = 0;
		this.stone_max_num = 10;
		this.stone_counter = 0;

		// -- 岩グループを作成
		this.grp_stones = this.physics.add.group({
			key: 'stone',
			quantity: this.stone_max_num,	//数
		});

		// -- 岩グループの初期化
		this.ini_stones = () => {

			this.grp_stones.children.iterate(function(_child){
				_child.setX(_app.rnd(game.config.width, 0));
				_child.setY(_app.rnd(game.config.height, 0) + game.config.height + 150);
				_child.angle = _app.rnd(360, 0);
				_child.setScale(0.5);
		    });
		}

		// -- 岩を増やす
		this.add_stone = () => {
			if (this.stone_num < this.stone_max_num){
				this.grp_stones.children.entries[this.stone_num].setVelocityY(-100);
				this.grp_stones.children.entries[this.stone_num].play('anim_stone'); // アニメ再生
				this.stone_num ++;
				alert('岩、追加！岩の数=' + this.stone_num + "\n岩の最大数=" + this.stone_max_num);
			}
		}

		this.ini_stones();
		this.add_stone();


		/*
		 * -- プレイヤーのカエル
		 */
		this.player = this.physics.add.sprite(187, 333, "player");
		this.player.anims.play("anim_player");
		this.player.setScale(1.5);
		this.player.body.setSize(23, 23); // 衝突範囲

		// -- プレイヤーの衝突範囲用スプライト
		this.shadow = this.physics.add.sprite(187, 333, "shadow");
		this.shadow.setScale(0.35);

		// -- プレイヤーをマウスに追従させる
		this.input.on('pointermove', function (pointer){
			let velocity =  pointer.x - this.player.x;
			this.player.setVelocity(velocity);
		}, this);



		/*
		 * -- 衝突
		 */
		this.physics.add.overlap(
			this.player,
			this.grp_stones,
			(player, stone) => {
				console.log(stone.frame.name);
				let n = stone.frame.name;
				if (n >=3 && n <= 6){
					alert('当たり！スプライトのコマ数=' + n + "\n当たりの範囲は3～6のコマ");
					this.ini_stones();	// 岩初期化
					_opt.kaeruY += 30;	// 衝突したら１段下がる
				}
			}
		);


	}



	/*
	 * update
	 */
	update(){

		// プレイヤーのY位置を固定（もっとイイ方法あるはず）
		this.player.y = _opt.kaeruY;

		// Playerとマウスポインタの距離
		this.dist = Phaser.Math.Distance.BetweenPoints(this.player, this.input.activePointer);
		if (this.dist < 10){
			this.player.setVelocity(0);
		}

		// 岩がステージから外れたら処理
		this.grp_stones.getChildren().forEach(function(child){
			if (child.y < -100){
				child.y = _app.rnd(game.config.height, 0) + game.config.height;
				child.angle = _app.rnd(360, 0);
			}
		});

		// カウンターで岩を追加
		this.stone_counter++;
		if (this.stone_counter >= 1000){
			this.add_stone();
			this.stone_counter = 0;
		}

		// 衝突判定用の影をプレイヤーと同じ位置に
		this.shadow.x = this.player.x;
		this.shadow.y = this.player.y;

	}



};
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
		hljs.configure({ tabReplace: '  ' }) // スペース4つ
		document.querySelectorAll('pre code').forEach((el) => {
			hljs.highlightElement(el);

		});

	}
}
</script>

<style scoped>
</style>