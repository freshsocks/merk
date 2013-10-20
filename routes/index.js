
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
	}
};

exports.index = function(req, res){
	// marked.setOptions({
	// 	highlight: function (code, lang) {
	// 		return hljs.highlightAuto(lang, code).value;
	// 	}
	// });
	var note = fs.readFile("/Users/stevefloat/Documents/notes/car-computers.md", {encoding: "utf8"}, function(err, res){ 
		if (err) throw err;
		console.log("File Read Successfully.");
		return res;
	});
	var md = marked("I am using __markdown__.", markedOps, function (err, content) {
	  if (err) throw err;
	  console.log(content);
	  return content;
	});
	// var md = marked(note, function(err, content){
	// 	if(err) throw err;
	// 	console.log("Markdown Converted.");
	// 	return content;
	// });
	res.render('index', { title: 'Markdown Viewer', md: md });
};