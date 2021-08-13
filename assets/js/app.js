_app = {

	/*
	 * ウィンドウの縦横比に合わせてキャンバスサイズを変更する
	 * ゲームの縦横比より横長なら横を短く、縦長なら縦を短く
	 */

	resize: function(max_width, max_height){
		let canvas = document.querySelector("canvas");
		let windowWidth  = window.innerWidth;
		let windowHeight = window.innerHeight;
		let windowRatio  = windowWidth / windowHeight;
		let gameRatio    = game.config.width / game.config.height;

		if (windowRatio < gameRatio){
			if (windowWidth > max_width) windowWidth = max_width;
			canvas.style.width  = windowWidth + "px";
			canvas.style.height = (windowWidth / gameRatio) + "px";
		}else{
			if (windowHeight > max_height) windowHeight = max_height;
			canvas.style.width  = (windowHeight * gameRatio) + "px";
			canvas.style.height = windowHeight + "px";
		}
	},

	rnd: function(val, offset){
		return Math.floor(Math.random() * val) + offset;
	},

	is_local: function(){
		let local = true;
		if (document.domain == 'localhost') local = false;

		return local;
	},

};