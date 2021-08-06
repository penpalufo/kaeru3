/*
 * btn-velocity.js
 */

let game;	// ゲームインスタンス

let _opt = {

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
		this.load.spritesheet('player', './assets/img/kaeru/kaeru.png',   { frameWidth: 120, frameHeight: 108 });
		this.load.spritesheet('player', './assets/img/kaeru/kaeru.png',   { frameWidth: 120, frameHeight: 108 });
		this.load.spritesheet('plant',  './assets/img/kaeru/mizukusa.png',{ frameWidth: 158, frameHeight: 311 });
		this.load.image('shadow', './assets/img/kaeru/shadow.png');
		this.load.image('rock',   './assets/img/jumperpack/Particles/particle_darkGrey.png');
		this.load.image('left',   './assets/img/ui/White/2x/left.png');
		this.load.image('right',  './assets/img/ui/White/2x/right.png');
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

		// -- 左右ボタンのスプライト定義
		this.btn_left  = this.physics.add.sprite(147, 600, "left");
		this.btn_right = this.physics.add.sprite(228, 600, "right");

		// -- プレイヤーの衝突範囲用スプライト
		this.shadow = this.physics.add.sprite(187, 333, "shadow");
		this.shadow.setScale(0.35);

		// -- プレイヤーのカエル
		this.player = this.physics.add.sprite(187, 100, "player");
		this.player.anims.play("swim");
		this.player.setScale(0.75);

		// -- 岩グループ定義
		this.rocks = this.physics.add.group({
			key: 'rock',
			quantity: 10,
		});

		// -- 岩の初期化
		let ini_rocks = () => {
			this.rocks.children.iterate(function(child){
				child.setX(_app.rnd(game.config.width, 0));
				child.setY(_app.rnd(game.config.height, 0) + game.config.height);
				child.setVelocityY(_app.rnd(200, 50) * -1);
				child.angle = _app.rnd(360, 0);
				child.setScale(1.25);
		    });
		}

		ini_rocks();

		// -- 衝突
		this.physics.add.overlap(
			this.shadow,
			this.rocks,
			function (player, rock){
				console.log('衝突');
				ini_rocks();	// 岩初期化
				_opt.kaeruY += 30;	// 衝突したら１段下がる
			}
		);

		// -- 左右ボタンが押されたら（pointerdown）
		this.btn_left.setInteractive().on('pointerdown', () => {
			this.player.setVelocityX(-200);
		});

		this.btn_right.setInteractive().on('pointerdown', () => {
			this.player.setVelocityX(200);
		});

		// -- 左右ボタンが離れたら（pointerup）
		this.btn_left.setInteractive().on('pointerup', () => {
			this.player.setVelocityX(0);
		})

		this.btn_right.setInteractive().on('pointerup', () => {
			this.player.setVelocityX(0);
		})

	}


	/*
	 * update
	 */
	update(){

		// 岩がステージから外れたら処理
		this.rocks.getChildren().forEach(function(child){
			if (child.y < -100){
				child.y = game.config.height + 100;
				child.angle = _app.rnd(360, 0);
			}
		});

		// 衝突判定用の影をプレイヤーと同じ位置に
		this.shadow.x = this.player.x;
		this.shadow.y = this.player.y;

	}

};
