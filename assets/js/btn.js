/*
 * btn.js
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
		this.load.spritesheet('player',   './common/img/kaeru/kaeru.png', 	{ frameWidth: 120, frameHeight: 108 });
		this.load.image('left', 	'./common/img/ui/White/2x/left.png');
		this.load.image('right', 	'./common/img/ui/White/2x/right.png');
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

		// -- プレイヤーのカエル
		this.player = this.physics.add.sprite(187, 100, "player");
		this.player.anims.play("swim");

		// -- 左右ボタンが押されたら
		this.btn_left.setInteractive().on('pointerdown', () => {
			console.log('left');
			this.player.x -= 40;
		});

		this.btn_right.setInteractive().on('pointerdown', () => {
			console.log('right');
			this.player.x += 40;
		});

	}


	/*
	 * update
	 */
	update(){


	}

};