var ws = require('nodejs-websocket');

var PORT = 3000;

var clientCount = 0;
//Scream server example: 'h1' -> 'HI!!!'

var server = ws.createServer(function(conn){
	console.log('new connection');
	clientCount++;
	conn.nickname = 'user' + clientCount;
	var mes = {};
	mes.type = "enter";
	mes.data = conn.nickname + ' comes in';
	broadcast(JSON.stringify(mes));
	conn.on('text', function(str){
		console.log('Received ' + str);
		var mes = {};
		mes.type = "message";
		mes.data = conn.nickname + ' says: ' + str;
		broadcast(JSON.stringify(mes));
	})

	conn.on('close', function(code, reason){
		console.log('Connection closed');
		var mes = {};
		mes.type = "leave";
		mes.data = conn.nickname + ' left';
		broadcast(JSON.stringify(mes));
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