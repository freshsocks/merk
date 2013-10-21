
var fs = require('fs');
var marked = require('marked');
var pygmentize = require('pygmentize-bundled');
var highlight = require('highlight.js');

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
	highlight: function (code, lang) {
		return highlight.highlightAuto(lang, code).value;
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
var refLinkRegex = /^\[(.+)\]:\s(.+)(?=\s"(.+)"$|\s?$)/gm;
var md;
var file = "/Users/stevefloat/Documents/notes/car-computers.md";

exports.index = function(req, res){
	fs.readFile(file, {encoding: "utf8"}, function(err, fileOutput){ 
		if (err) errorHandler(err);
		var preformat = fileOutput.replace(refLinkRegex, function($0, $1, $2, $3){
			console.log('preformatting');
			// $0	Whole line
			// $1	Reference Text
			// $2	URL (not verified, use relative links or whatever)
			// $3	Title text
			var title = $3 ? $3 : $1; // Set Title to label if there is no alt specified
			var referenceLink = '<a href="'+$2+'" title="'+title+'" target="_blank">'+$1+'</a>';
			var referenceString = $0+'\n'+referenceLink;
			//console.log("$3 "+$3+";\n$2 "+$2+";\n$1 "+$1+";\n$0 "+$0+";");
			return referenceString;
		});
		marked(preformat, markedOps, function (err, content) {
			if (err) errorHandler(err);
			console.log("markdown conversion successful");
			var formatted = content.replace(definitionList.dt, function($0, $1, $2){
										return '<dt>'+$2+'</dt>';
									}).replace(definitionList.dd, function($0, $1, $2){
										return '<dd>'+$2+'</dd>';
									}).replace(definitionList.dl, function($0, $1){
										return '<dl>\n'+$1+'</dl>\n\n';
									});
			res.render("index", { title: "Markdown Viewer", md: formatted});
		});
	});

	function errorHandler(err){
		res.render('index', { title: err.message });
	}
};