let WebSocketServer = require('ws').Server;
let PORT = 5010;
let wss = new WebSocketServer({port: PORT});
let messages = [];
wss.on('connection', function (ws) {
    messages.forEach(function(message){
        ws.send(message);
    });
    ws.on('message', function (message) {
        messages.push(message);
        console.log('Message Received: %s', message);
        wss.clients.forEach(function (conn) {
            conn.send(message);
        });
    });
});