/*
 * dist.js
 */

let game;	// ゲームインスタンス

let _opt = {
	kaeruY: 100,
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
		this.load.spritesheet('player',   './common/img/kaeru/kaeru.png', 	{ frameWidth: 120, frameHeight: 108 });
		this.load.spritesheet('mizukusa', './common/img/kaeru/mizukusa.png',{ frameWidth: 158, frameHeight: 311 });
		this.load.image('shadow', 	'./common/img/kaeru/shadow.png');
		this.load.image('bear', 	'./common/img/animals/bear.png');
	}




	/*
	 * create()
	 */
	create(){

		console.log('preload_Game | create()');

		// プレイヤーのカエル
		this.anims.create({
			key: "swim",
			frames: this.anims.generateFrameNumbers("player", { start: 0, end: 11 }),
			frameRate: 8,
			repeat: -1
		});

		// 水草
		this.anims.create({
			key: "yurayura",
			frames: this.anims.generateFrameNumbers("mizukusa", { start: 0, end: 47 }),
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

		// -- 水草
		this.kusas = this.physics.add.group({
			key: 'mizukusa',
			quantity: 10,
		});

		this.kusas.children.iterate(function(child){
			child.setX(_app.rnd(game.config.width, 0));
			child.setY(_app.rnd(game.config.height, 0));
			child.play('yurayura'); // アニメ再生
			child.setScale((_app.rnd(5, 0) + 5) * 0.1);
	    });

		// -- プレイヤーの衝突範囲用スプライト
		this.shadow = this.physics.add.sprite(187, 333, "shadow");
		this.shadow.setScale(0.35);

		// -- プレイヤーのカエル
		this.player = this.physics.add.sprite(187, 333, "player");
		this.player.anims.play("swim");
		this.player.setScale(0.5);

		// -- プレイヤーをマウスに追従させる
		this.input.on('pointermove', function (pointer){
			//console.log(pointer.x + ' : ' + this.player.x);
			//this.physics.moveToObject(this.player, pointer, 200);
			let velocity =  pointer.x - this.player.x;
			this.player.setVelocity(velocity);
		}, this);

		// -- 熊グループ
		this.bears = this.physics.add.group({
			key: 'bear',
			quantity: 10,
			// bounceX: 1,
			// bounceY: 1,
			// collideWorldBounds: true,
		});

		let ini_bears = () => {
			this.bears.children.iterate(function(child){
				child.setX(_app.rnd(game.config.width, 0));
				child.setY(_app.rnd(game.config.height, 0) + game.config.height);
				child.setVelocityY(_app.rnd(200, 50) * -1);
				child.setScale(0.5);
		    });
		}

		ini_bears();


		// -- 衝突
		this.physics.add.overlap(
			this.shadow,
			this.bears,
			function (player, bear){
				console.log('衝突');
				//game.scene.pause("play_Game")
				ini_bears();
				//bear.setY(_app.rnd(game.config.height, 0) + game.config.height);
				_opt.kaeruY += 30;
			}
		);

	}


	/*
	 * update
	 */
	update(){

		this.player.y = _opt.kaeruY;

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