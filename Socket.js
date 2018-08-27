var Server = require('ws').Server;
var port = process.env.PORT || 9030;
var wss = new Server({port: port});

console.log(
    "###########################################################################\n" +
    "   _____                    _____                                      \n" +
    "  /     \\ _____     ____   /     \\ _____  ______ ______   ___________  \n" +
    " /  \\ /  \\\\__  \\   / ___\\ /  \\ /  \\\\__  \\ \\____ \\\\____ \\_/ __ \\_  __ \\ \n" +
    "/    Y    \\/ __ \\_/ /_/  >    Y    \\/ __ \\|  |_> >  |_> >  ___/|  | \\/ \n" +
    "\\____|__  (____  /\\___  /\\____|__  (____  /   __/|   __/ \\___  >__|    \n" +
    "        \\/     \\//_____/         \\/     \\/|__|   |__|        \\/        \n" +
    "  _________              __           __                               \n" +
    " /   _____/ ____   ____ |  | __ _____/  |_                             \n" +
    " \\_____  \\ /  _ \\_/ ___\\|  |/ // __ \\   __\\                            \n" +
    " /        (  <_> )  \\___|    <\\  ___/|  |                              \n" +
    "/_______  /\\____/ \\___  >__|_ \\\\___  >__|                              \n" +
    "        \\/            \\/     \\/    \\/                                  \n" +
    "###########################################################################");

console.log("listen on port: " + port);



wss.on('connection', function (w) {

    console.log("> connection established");

    w.on('message', function (msg) {
        console.log(msg);

        wss.clients.forEach(function (client) {
            client.send(msg)
        })
    });

    w.on('close', function () {
        console.log("< disconnection")
    });
});
