/*
 * _Lib
 */





var _Lib = {

	/*
	 * versioin
	 */
	libversion : function(){
		return {libversion: '0.2.2'};
	},



	/*
	 * オブジェクトの検索
	 	_Lib.searchObj({
			_obj: オブジェクト,
			key: '検索するオブジェクトのキー（「key1.key2」という指定もできる）',
			word: '検索ワード（配列['word1','word2']で指定するとOR検索）',
			incl: true or false(「true」を指定すると)
	 	});
	 */
	searchObj : function(_opt){

		var _obj = _opt.obj;
		var key  = _opt.key.replace(/[^A-Za-z0-9_.]/g, '');
		var word = _opt.word;
		var incl = _opt.incl;

		if (!Array.isArray(word)){

			// -- 検索ワード(word)が変数だったら
			var _tmp = _obj.filter(function(item, index){
				var val = item[key];

				if (val){
					if (!incl){
						if (val == word) return true;
					}else{
						if (val.indexOf(word) >= 0) return true;
					}
				}else{
					return false;
				}
			});
			return _tmp;

		}else{

			// -- 検索ワード(word)が配列だったら
			var _pack = [];
			if (word.length){

				var reg_txt = word[0];
				for(var k=1; k < word.length; k++) reg_txt += '|' + word[k];
				var reg = new RegExp(reg_txt, 'i');

				var _tmp = _obj.filter(function(item, index){
					eval('var val = item.' + key);
					if (reg.test(val)) return true;
				});
				_pack = _pack.concat(_tmp);

				return _pack;

			}else{

				return _obj;

			}
		}
	},



	/*
	 * URLにパラメータを追加
	 */
	setUrlParam : function(arg){
		history.pushState('','',arg);
	},



	/*
	 * URLのパラメータを取得
	 */
	getUrlParam : function(arg){
		var _arg  = new Object;
		var pair = location.search.substring(1).split('&');
		for(var i=0;pair[i];i++) {
			var kv = pair[i].split('=');
			_arg[kv[0]]=kv[1];
		}

		if (arg){
			var val = decodeURIComponent(_arg[arg]);
			if (val == 'undefined') val = "";
			return val;
		}else{
			for (key in _arg){
				_arg[key] = decodeURIComponent(_arg[key]); // URLデコード
			}
			return _arg;
		}
	},



	/*
	 * 指定した引数のURLのパラメータを削除する
		_Lib.sukkiriUrl({
			arg1 : true, -- 引数1
			arg2 : true, -- 引数2
			arg3 : true, -- 引数3
		});
	 */
	sukkiriUrl : function(args){

		/*
		 * hisotry APIをサポートしているブラウザでのみ実行
		 */

		if (window.history && window.history.replaceState) {

			console.log('hisotry API');
			do_replaceState = false;   						// replaceStateするかどうかのフラグ
			var url,query_string,hash,matches,domain,path;	// 各種処理変数
			var queries = [];         						// replaceState時に使うquery string

			/*
			 * document.locationを使わずに自力でURL解析
			 */

			url = document.location.toString();
			if (matches = url.match(/(.+?)#(.+)/))  url = matches[1];  hash = matches[2];
			if (matches = url.match(/(.+?)\?(.+)/)) url = matches[1];  query_string = matches[2];


			/*
			 * URLにquery stringがあれば、utm系の存在をチェック
			 */

			if (query_string) {
				query_string = query_string.split(/&/);

				for (var i =0; i < query_string.length; i++) {
					var param = query_string[i].split(/=/);
					if (typeof args[param[0]] != 'undefined') {
						// argsのが1つでもあればreplaceStateフラグをオンに
						do_replaceState = true;
					}else{
						// argsになければreplaceState後のURLにも必要
						queries.push(query_string[i]);
					}
				}
			}

			/*
			 * argsのパラメータがあれば、それを除いたURLにreplaceState
			 */
			if (do_replaceState) {
				// replaceState先の指定
				if (queries.length) url += '?' + queries.join("&");
				if (hash) 			url += '#' + hash;

				// replaceState
				history.replaceState('', '', url);
			}

		}
	},



	/*
	 * 最低限のサニタイズ
	 * 「<」「>」「&」「'」「"」をサニタイズ。
	 */
	sanitaize_enc : function(str){
		if (str) return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	},

	sanitaize_dec : function(str){
		if (str) return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
	},



	/*
	 * 相対パスから絶対パスに変換
	 */
	absolutePath : function(path) {
		var e = document.createElement('span');
		e.insertAdjacentHTML('beforeend', '<a href="' + path + '" />');
		var aurl = e.firstChild.href;
		aurl = aurl.replace(location.protocol + '//' + location.host, "");
		return aurl;
	},



	/*
	 * JSONで簡単なテンプレート
	 */
	miniTpl : function(_obj, selector) {
		for (var key in _obj){
			$(selector + ' [data-mtpl=' + key + ']').html(_obj[key]);
		}
	},



	/*
	 * スクロール
	 */
	scrollTgt : function(speed, tgt){
		var position = $(tgt).offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	},



	/*
	 * 指定の画像のすべてが読み込まれたら
	 *
	(例)
		_Lib.imageReady({
			"selector":"img.image-ready",
			"callback": function(){
				alert('all_loaded!')
			}
		})
	*/
	imageReady : function(_opt){
		var $imgs = $("img");
		if (_opt.selector) $imgs = $(_opt.selector);
		var imgs_count = $imgs.length;
		var comp_count = 0;

		for(var i=0; i < imgs_count; i++){
			$imgs[i].originSrc = $imgs[i].src;
			$imgs[i].src = "";

			$($imgs[i]).bind("load", function(){
				comp_count ++;
				if (imgs_count == comp_count){
					_opt.callback();
				}
			});

			$imgs[i].src = $imgs[i].originSrc;
		}
	},



	/*
	 * 電話番号/メール/URLをリンクに変換
	 */
	convert2link : function(str){
		// 電話番号だと思われる文字列を抽出
		var phone_array = str.match( /\+?[0-9]+[\-\x20]?[0-9]+[\-\x20]?[0-9]+[\-\x20]?[0-9]+/g );
		var cursor = 0;
		for (var i=0; phone_array != null && i < phone_array.length; i++){

			// ハイフンとスペースを削除
			var tmp = phone_array[i];
			tmp = tmp.replace( /[\-\x20]/g, '' );
			if (tmp.length < 10){
				// 10桁未満は電話番号とみなさない
				continue;
			}

			// aタグ文字列を生成
			var tag_a = '<a href="tel:' + tmp + '">' + phone_array[i] + '</a>';

			// 置換する電話番号の出現位置を取得
			var start = str.indexOf( phone_array[i], cursor );

			// 出現した電話番号を置換
			str = str.slice( 0, start ) + tag_a + str.slice( start + phone_array[i].length );
			cursor = start + tag_a.length;
		}

		var re_url = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
		var re_mail = /((?:\w+\.?)*\w+@(?:\w+\.)+\w+)/gi;

		str = str.replace(re_url, '<a href="$1" target="_blank" target="_blank">$1</a>' );
		str = str.replace(re_mail, '<a href="mailto:$1">$1</a>');

		return str;
	},



	/*
	 * URLやパスの取得
		getUrl('url')		 => https://domein.com/dir1/dir2/file.html
		getUrl('path')		 => /domein.com/dir1/dir2/file.html
		getUrl('protocol')	 => https
		getUrl('host')		 => domein.com
		getUrl('file')  	 => file.html
		getUrl('dirpath') 	 => /domein.com/dir1/dir2/
		getUrl('dirpath', 1) => /domein.com/dir1/
		getUrl('dirurl') 	 => https://domein.com/domein.com/dir1/
		getUrl('rooturl')    => https://domein.com
	*/
	getUrl: function(req, n){
		var result;
		var local = window.location;

		if (!n) n = 0;
		var dirpath = local.pathname.replace(new RegExp("(?:\\\/+[^\\\/]*){0," + ((n || 0) + 1) + "}$"), "/");

		switch(req.toLowerCase()){
			case 'url':
				result = local.href;
			break;

			case 'path':
				result = local.pathname;
			break;

			case 'protocol':
				result = local.protocol;
			break;

			case 'host':
				result = local.host;
			break;

			case 'file':
				result = local.href.split('/').pop();
			break;

			case 'dirpath':
				result = dirpath;
			break;

			case 'dirurl':
				result = local.origin + dirpath;
			break;

			case 'rooturl':
				result = local.origin;
			break;
		}

		return result;

	}

}