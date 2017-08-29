var ws = require('nodejs-websocket');

var PORT = 3000;

var clientCount = 0;

var server = ws.createServer(function(conn){
	console.log('new connection');
	clientCount++;
	conn.nickname = 'user' + clientCount;
	broadcast(conn.nickname + ' comes in');
	conn.on('text', function(str){
		console.log('Received ' + str);
		broadcast(str);
	})

	conn.on('close', function(code, reason){
		console.log('Connection closed');
		broadcast(conn.nickname + ' left');
	})

	conn.on('error', function(err){
		console.log('handle err');
		console.log(err);
	})
}).listen(PORT);

console.log('Server running on port 3000');

function broadcast(str){
	server.connections.forEach(function(connection){
		connection.sendText(str);
	})
}