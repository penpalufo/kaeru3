<template>
	<div>
	<article>
		<h2>{{ category }}</h2>
	</article>

	<article>
		<h4>■ {{ title }}</h4>
		<p><a v-bind:href="source_url" target="_blank" class="btn btn-primary" role="button">preview : {{ source_name }}</a></p>
		<p><a v-bind:href="source_debug_url" target="_blank" class="btn btn-primary" role="button">preview : {{ source_debug_name }}</a></p>
		<p><a v-bind:href="source_pwa_url" target="_blank" class="btn btn-primary" role="button">PWA : {{ source_pwa_name }}</a></p>

<pre><code>/*
 * dist.js
 */

let game;	// ゲームインスタンス

let _opt = {
	kaeruY: 300,
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

	let bgcolor = '#33CCFF';
	if (debug){
		bgcolor = '#8dd3ff';
	}

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
		backgroundColor: bgcolor, // 背景色
		render: {	// ピクセル処理を無効にしてアンチエイリアス
			pixelArt: false
		},
	};

	game = new Phaser.Game(config);

	// ウィンドウにフォーカス
	window.focus();

	// ウィンドウサイズに合わせてキャンバスをリサイズ
	_app.resize(375, 667);

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

		this.img_stone = './assets/img/kaeru/game-stone.png';
		if (debug){
			this.img_stone = './assets/img/kaeru/game-stone-test.png';
		}

		this.load.image('title', './assets/img/geme-title.png');
		this.load.image('play', './assets/img/geme-play.png');
		this.load.spritesheet('player', './assets/img/kaeru/kaeru.png',   { frameWidth: 120, frameHeight: 108 });
		this.load.spritesheet('plant',  './assets/img/kaeru/mizukusa.png',{ frameWidth: 158, frameHeight: 311 });
		this.load.spritesheet('stone', this.img_stone, { frameWidth: 305, frameHeight: 350 });
		this.load.image('shadow', './assets/img/kaeru/shadow.png');
		this.load.image('fish', './assets/img/kaeru/fish.png');
		this.load.image('zari', './assets/img/kaeru/zari.png');
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

		// -- 開始時間
		this.startTime = new Date();

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
				this.grp_stones.children.entries[this.stone_num].setVelocityY(-75);
				this.grp_stones.children.entries[this.stone_num].play('anim_stone'); // アニメ再生
				this.stone_num ++;
				if (debug) alert('岩、追加！岩の数=' + this.stone_num + "\n岩の最大数=" + this.stone_max_num);
			}
		}

		this.ini_stones();
		this.add_stone();



		/*
		 * -- 魚(fish)
		 */
		this.fish_num = 0;
		this.fish_max_num = 10;
		this.fish_counter = 0;
		this.grp_fish = this.physics.add.group({
			key: 'fish',
			quantity: this.fish_max_num,
		});

		// -- 魚グループの初期化
		this.ini_grp_fish = () => {

			this.grp_fish.children.iterate(function(_child){
				_child.setX(_app.rnd(game.config.width, 0));
				_child.setY((_app.rnd(game.config.height, 0) + 100) * -1);
				_child.setScale(0.25);
		    });
		}

		// -- 魚を増やす
		this.add_fish = () => {
			if (this.fish_num < this.fish_max_num){
				this.grp_fish.children.entries[this.fish_num].setVelocityY(175);
				// this.grp_fish.children.entries[this.fish_num].play('anim_stone'); // アニメ再生
				this.fish_num ++;
				if (debug) alert('魚、追加！魚の数=' + this.fish_num + "\n魚の最大数=" + this.fish_max_num);
			}
		}

		this.ini_grp_fish();
		this.add_fish();



		/*
		 * -- プレイヤーのカエル
		 */
		this.player = this.physics.add.sprite(187, 333, "player");
		this.player.anims.play("anim_player");
		this.player.setScale(1.5);
		this.player.body.setSize(40, 40); // 衝突範囲

		// -- プレイヤーの衝突範囲用スプライト
		this.shadow = this.physics.add.sprite(187, 333, "shadow");
		this.shadow.setScale(0.35);
		this.shadow_depth = -1;
		if (debug) this.shadow_depth = 0;
		this.shadow.depth = this.shadow_depth;

		// -- プレイヤーをマウスに追従させる
		this.input.on('pointermove', function (pointer){
			let velocity =  pointer.x - this.player.x;
			this.player.setVelocity(velocity);
		}, this);



		/*
		 * -- ゲームオーバー
		 */

		this.game_over = () => {

			this.scene.pause();
			/*
			this.grp_fish.children.iterate(function(_child){
				_child.setVelocity(0);
			})

			this.grp_stones.children.iterate(function(_child){
				_child.setVelocity(0);
			})
			*/
			this.tryagain = this.add.text(187, 550, 'TRY AGAIN').setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setInteractive();
			this.tryagain.on('pointerdown', (pointer) => {
				this.tryagain.setText('OK!!');
			}, this);
		}



		/*
		 * -- 岩との衝突
		 */
		this.physics.add.overlap(
			this.shadow,
			this.grp_stones,
			(player, stone) => {
				console.log(stone.frame.name);
				let n = stone.frame.name;
				if (n >=3 && n <= 6){
					alert('当たり！スプライトのコマ数=' + n + "\n当たりの範囲は3～6のコマ");
					this.game_over();
					// this.ini_grp_fish();// 魚初期化
					// this.ini_stones();	// 岩初期化
					//_opt.kaeruY += 30;	// 衝突したら１段下がる
				}
			}
		);



		/*
		 * -- 魚との衝突
		 */
		this.physics.add.overlap(
			this.player,
			this.grp_fish,
			(player, fish) => {
				alert('当たり！魚');
				this.game_over();
				// this.ini_grp_fish();// 魚初期化
				// this.ini_stones();	// 岩初期化
				//_opt.kaeruY += 30;	// 衝突したら１段下がる
			}
		);



		/*
		 * スコア定義
		 */
		this.score_counter = 0
		this.score = 0
		this._score = this.add.text(10, 50, "0 m", {font: '30px Arial'})



		/*
		 * 経過時間定義
		 */
		this._timer = this.add.text(10, 10, "", {font: '30px Arial'})


	}



	/*
	 * update
	 */
	update(){

		/*
		 * プレイヤー
		 */
		this.player.y = _opt.kaeruY;	// プレイヤーのY位置を固定（もっとイイ方法あるはず）

		// Playerとマウスポインタの距離
		this.dist = Phaser.Math.Distance.BetweenPoints(this.player, this.input.activePointer);
		if (this.dist < 10){
			this.player.setVelocity(0);
		}


		/*
		 * 岩
		 */

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

		/*
		 * 魚
		 */

		// 魚がステージから外れたら処理
		this.grp_fish.getChildren().forEach(function(child){
			if (child.y > game.config.height + 100){
				child.x = _app.rnd(game.config.width, 0);
				child.y = _app.rnd(game.config.height, 0) * -1;
			}
		});

		// カウンターで魚を追加
		this.fish_counter++;
		if (this.fish_counter >= 5000){
			this.add_fish();
			this.fish_counter = 0;
		}

		// 衝突判定用の影をプレイヤーと同じ位置に
		this.shadow.x = this.player.x;
		this.shadow.y = this.player.y;


		/*
		 * スコア
		 */
		this.score_counter++;
		if (this.score_counter >= 50){
			this.score++
			this.score_counter = 0;
			this._score.setText(this.score + " m")
			//console.log('this.score = ' + this.score);
		}


		/*
		 * 経過時間
		 */
		this._timer.setText('PLAY TIME ' + _app.transit_time(this.startTime));

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
			source_debug_name: 'dist(debug)',
			source_debug_url: './preview.html#' + 'dist/debug',
			source_pwa_name: 'dist',
			source_pwa_url: './pwa.html#' + 'dist',
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