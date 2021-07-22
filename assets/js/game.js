console.log('test-03.js');
let game;	// ゲームインスタンス



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
			play_Game
		],
		backgroundColor: "#32CAFD", // 背景色
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
		this.load.spritesheet('player', './assets/img/kaeru/kaeru_anim_2.png', { frameWidth: 120, frameHeight: 108 });
		this.load.image('shadow', 	'./assets/img/kaeru/shadow.png');
		this.load.image('bear', 	'./assets/img/animals/bear.png');
		this.load.image('cow',  	'./assets/img/animals/cow.png');
		this.load.image('narwhal', 	'./assets/img/animals/narwhal.png');
		this.load.image('pig', 		'./assets/img/animals/pig.png');
	}




	/*
	 * create()
	 */
	create(){

		console.log('preload_Game | create()');

		// カエル
		this.anims.create({
			key: "swim",
			frames: this.anims.generateFrameNumbers("player", { start: 0, end: 11 }),
			frameRate: 8,
			repeat: -1
		});

		// メインのシーンへ
		this.scene.start("play_Game");
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

		var rndX = function(){
			return Math.floor(Math.random() * game.config.width);
		}

		var rndY = function(){
			return Math.floor(Math.random() * game.config.height);
		}

		this.shadow = this.physics.add.sprite(187, 333, "shadow");
		this.shadow.setScale(0.35);

		this.player = this.physics.add.sprite(187, 333, "player");
		this.player.anims.play("swim");
		this.player.setScale(0.5);

		// マウスに追従
		this.input.on('pointermove', function (pointer){
			this.physics.moveToObject(this.player, pointer, 200);
		}, this);



		// -- GROUP:bears

		this.bears = this.physics.add.group({
			key: 'bear',
			quantity: 10,
			bounceX: 1,
			bounceY: 1,
			//collideWorldBounds: true,
		});

		this.bears.children.iterate(function(child){
			child.setX(rndX());
			child.setY(rndY() + game.config.height);
			var rnd = Math.floor(Math.random() * 200) + 50;
			child.setVelocityY(rnd * -1);
			child.setScale(0.5);
	    });

		this.physics.add.overlap(
			this.shadow,
			this.bears,
			function (player, bear){
				console.log('衝突');
				// game.play_Game.pause();
				game.scene.pause("play_Game")
			}
		);

		/*
		// -- GROUP:cows

		this.cows = this.physics.add.group({
			key: 'cow',
			quantity: 10,
			bounceX: 1,
			bounceY: 1,
			//collideWorldBounds: true,
		});

		this.cows.children.iterate(function(child){
			child.setY(rndY());
			var rnd = Math.floor(Math.random() * 500) + 50;
			child.setVelocityX(rnd);
			child.setScale(0.5);
	    });
	    */

		/*
		this.physics.add.collider(
			this.bears,
			this.cows,
			function (bear, cows){
				console.log('衝突');
				// bear.setAlpha(0.5);
				// cows.setAlpha(0.5);
			}
		);
		*/

		/*
		this.physics.add.overlap(
			this.bears,
			this.cows,
			function (bear, cow){
				console.log('衝突');

			}
		);
		*/
	}


	/*
	 * update
	 */
	update(){

		// Playerとマウスポインタ（game.input.activePointer）の距離
		this.dist = Phaser.Math.Distance.BetweenPoints(this.player, this.input.activePointer);
		if (this.dist < 10){
			//console.log('dist = ' + this.dist);
			this.player.setVelocity(0);
		}

		this.bears.getChildren().forEach(function(child){
			if (child.y < -100){
				child.y = game.config.height + 100;
			}
		});

		this.shadow.x = this.player.x;
		this.shadow.y = this.player.y;

		/*
		this.cows.getChildren().forEach(function(child){
			if (child.x > game.config.width + 50){
				child.x = -100;
			}
		});
		*/

	}

};