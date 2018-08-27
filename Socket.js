var Server = require('ws').Server;
var port = process.env.PORT || 9030;
var ws = new Server({port: port});

console.log(
    "################################################\n" +
    "################################################\n" +
    "  _________              __           __   \n" +
    " /   _____/ ____   ____ |  | __ _____/  |_ \n" +
    " \\_____  \\ /  _ \\_/ ___\\|  |/ // __ \\   __\\\n" +
    " /        (  <_> )  \\___|    <\\  ___/|  |  \n" +
    "/_______  /\\____/ \\___  >__|_ \\\\___  >__|  \n" +
    "        \\/            \\/     \\/    \\/      \n" +
    "################################################\n" +
    "################################################");

console.log("listen on port: " + port);


var clients = [];

ws.on('connection', function (w) {

    clients.push(w);
    console.log("> connection established");

    w.on('message', function (msg) {
        console.log(msg);
        sendAll(clients, msg);
    });

    w.on('close', function () {
        console.log('closing connection');
    });
});

function sendAll(clients, message) {
    for (var i = 0; i < clients.length; i++) {
        clients[i].send(message);
    }
}