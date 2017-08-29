var ws = require('nodejs-websocket');

//Scream server example: 'h1' -> 'HI!!!'

var server = ws.createServer(function(conn){
	console.log('new connection');
	conn.on('text', function(str){
		console.log('Received ' + str);
		conn.sendText(str.toUpperCase() + "!!!");
	})

	conn.on('close', function(code, reason){
		console.log('Connection closed');
	})

	conn.on('error', function(err){
		console.log('handle err');
		console.log(err);
	})
}).listen(3000);

console.log('Server running on port 3000');