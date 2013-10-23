
var fs = require('fs');
var marked = require('marked');
var pygmentize = require('pygmentize-bundled');

/*
 * GET home page.
 */

// var markedOps = {
// 	gfm: true,
// 	highlight: function (code, lang, callback) {
// 		pygmentize({ lang: lang, format: 'html' }, code, function (err, result) {
// 			if (err) return callback(err);
// 			callback(null, result.toString());
// 		});
// 	},
// 	tables: true,
// 	breaks: false,
// 	pedantic: false,
// 	sanitize: true,
// 	smartLists: true,
// 	smartypants: false,
// 	langPrefix: 'lang-'
// };

var markedOps = {
	highlight: function (code, lang, callback) {
		pygmentize({ lang: lang, format: 'html' }, code, function (err, result) {
			if (err) return callback(err);
			callback(null, result.toString());
		});
	},
	tables: true,
	smartLists: true,
	breaks: false
};

var definitionList = {
	dt : /(^(?!:|#)(?:<p>|<[\w+\s?"?=?]+>)*([\w%$$]+.*)$)(?=[\r|\n]:\s\S)/gm,
	dd : /(?:(^:\s)(.*(?=<\/p>)|.*$)(<\/p>)?)/gm,
	dl : /((?:^(<dt).*>[\n|\r]+|(?:<dd>.*<\/dd>)[\n\r]+)+(?![\r\n\S]*<dt>|[\r\n\S]+<dd>))/gm
};
var refLinkRegex = /^(?!!|\[!)\[(.+)\]:\s(.+)(?=\s"(.+)"$|\s?$)/gm;
var md;
var docPath = "/Users/stevefloat/Documents/notes/";
var appPath = "/Users/stevefloat/git/merk/";
var file = "car-computers.md";
//var file = "/Users/stevefloat/git/merk/public/bower_components/pure/README.md";

exports.index = function(req, res){

	console.log("Params: "+req.params.doc);
	var doc = req.params.doc;

	doc = typeof doc==="undefined" ? docPath+file : doc=="README.md" ? appPath+doc : docPath+doc;

	console.log("Doc preview: "+doc.split(0, 20));

	fs.readFile(doc, {encoding: "utf8"}, function(err, fileOutput){ 
		if (err) errorHandler(err);
		//var preformat = fileOutput;
		var preformat = fileOutput.replace(refLinkRegex, function($0, $1, $2, $3){
			var title = $3 ? $3 : $1;
			var referenceLink = '<a href="'+$2+'" title="'+title+'" target="_blank">'+$1+'</a>';
			return $0+'\n'+referenceLink;
		}).replace(definitionList.dt, function($0, $1, $2){
			return '<dt>'+$2+'</dt>';
		}).replace(definitionList.dd, function($0, $1, $2){
			return '<dd>'+$2+'</dd>';
		}).replace(definitionList.dl, function($0, $1){
			return '<dl>\n'+$1+'</dl>\n\n';
		});
		marked(preformat, markedOps, function (err, content) {
			if (err) errorHandler(err);
			var formatted = content;
			res.render("index", { title: "merk", md: formatted});
		});
	});

	function errorHandler(err){
		res.render('index', { title: err.message });
	}
};