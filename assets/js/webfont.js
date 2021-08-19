/*
 * main.js
 */
var game;
window.onload = function()
{
	game = new Phaser.Game(300,400,Phaser.AUTO,"ph_game");

    game.state.add("StateMain", StateMain);
    game.state.start("StateMain");
}



/*
 * stateMain.js
 */
var StateMain = {
    preload: function() {},
    create: function() {

    	game.time.events.add(Phaser.Timer.SECOND, this.makeText, this);

    },
    makeText: function() {
        this.text1 = game.add.text(game.width / 2, 100, "Some Text Here");
        this.text1.fill = "#ffffff";
        this.text1.anchor.set(0.5, 0.5);
        this.text1.font = "Fresca";

        this.text2 = game.add.text(game.width / 2, 200, "On Fire!");
        this.text2.fill = "#ff0000";
        this.text2.stroke = "#ffff00";
        this.text2.strokeThickness = 6;
        this.text2.anchor.set(0.5, 0.5);
        this.text2.font = "Flamenco";
        
        this.text3 = game.add.text(game.width / 2, 300, "Some Text Here");
        this.text3.fill = "#00ff00";
        this.text3.anchor.set(0.5, 0.5);
        this.text3.font = "Indie Flower";
    },
    update: function() {}
}



/*
 * fontLoader.js
 */
WebFontConfig = {
	google: { families: ["Fresca","Flamenco","Indie Flower"] }
};

(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();