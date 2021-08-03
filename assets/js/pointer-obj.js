/*
 * pointer-obj.js
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

		// -- プレイヤーのカエル
		this.player = this.physics.add.sprite(187, 100, "player");
		this.player.anims.play("swim");

		// -- プレイヤーをマウスに追従させる
		this.input.on('pointermove', function (pointer){
			//this.physics.moveToObject(this.player, pointer, 200);
			let velocity =  pointer.x - this.player.x;
			this.player.setVelocity(velocity);
		}, this);
	}


	/*
	 * update
	 */
	update(){


	}

};