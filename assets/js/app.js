/*
 * fontLoader.js
 	https://www.html5gamedevs.com/topic/32448-google-webfonts-weight-setting-in-phaser/
 	https://jsfiddle.net/sxspvhyk/2/
 */
WebFontConfig = {
	google: { families: ["Fresca","Flamenco","Indie Flower","Poppins:100,200,800"] }
};

(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();



/*
 * _app
 */
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

	transit_time: function(start){
		const now = new Date();
		let t = now.getTime() - start.getTime();	// 通算
		const h = Math.floor(t / (60 * 60 * 1000));	// 時間
		t = t - (h * 60 * 60 * 1000);
		const m = Math.floor(t / (60 * 1000));		// 分
		t = t-(m * 60 * 1000);
		const s = Math.floor( t / 1000);			// 秒
		const ms = t % 1000;						// ミリ秒

		return h + ":" + m + ":" + s + ":" + ms;
	}

};