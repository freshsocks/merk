
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
//var routes = require('./routes');
var http = require('http');
var path = require('path');
var _ = require('underscore');

/**
 * Dependencies for markdown portion
 */

var fs = require('fs');
//var marked = require('marked');
//var pygmentize = require('pygmentize-bundled');

var currentDoc = {
		path : "/Users/stevefloat/Documents/notes/car-computers.md",
		contents : "Please select file"
	}
  , docPath = "/Users/stevefloat/Documents/notes/"
  , appPath = "/Users/stevefloat/git/merk/"
  , defaultDoc = "car-computers.md";

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/:doc?', function(req, res){
	var doc = req.params.doc;
	currentDoc.path = typeof doc==="undefined" ? docPath+defaultDoc : doc=="README.md" ? appPath+doc : docPath+doc;
	console.log("doc: "+currentDoc.path);
	fs.readFile(currentDoc.path, {encoding: "utf8"}, function(err, fileOutput){
		if (err) throw err;
		currentDoc.contents = fileOutput;
		console.log("content: "+currentDoc.contents);
	});
	res.render("index");
});

/**
 * Configure socket.io connection
 */

io.configure(function() {
	io.enable('browser client minification');
	io.enable('browser client etag');
	io.enable('browser client gzip');
	io.set('heartbeat interval', 60);
	io.set('heartbeat timeout', 120);
	io.set('log level',1);
	io.set('transports',[
		'websocket',
		'flashsocket',
		'htmlfile',
		'xhr-polling',
		'jsonp-polling'
	]);
});

/**
 * Handle socket.io events
 */

io.sockets.on('connection', function (socket) {
	
	console.log('HANDSHAKE MADE!');

	// socket.on('event', function (data){
	// 	var parsed = data.trim();
	// 	socket.emit('event complete', parsed );
	// 	});
	// });

	socket.on('gimme markdown', function(){
		console.log('Client page has loaded!');
		socket.emit('markdown file', currentDoc.contents);
	});
	socket.on('gimme list of files', function(){
		console.log("lets try to get a file list.")
		fs.readdir(docPath, function(err, files){
			socket.emit('list of files', files);
		});
	});
});


/**
 * Launch the server after everything is set up.
 */

_.defer(function() {
	server.listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
});


/**
 * Custom Functions
 */
function getFileContents(fileName){
	fs.readFile(fileName, {encoding: "utf8"}, function(err, fileOutput){
		if (err) throw err;
		return fileOutput;
	});
}

