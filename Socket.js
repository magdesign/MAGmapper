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

var log4js = require('log4js');
var logger = log4js.getLogger();

logger.level = 'debug';


logger.info("Listen on port: " + port);

wss.on('connection', function (w) {
    w.uid = uuid();
    logger.info("client registered: " + w.uid);

    w.on('message', function (msg) {
        logger.debug(msg);

        wss.clients.forEach(function (client) {
            logger.info("update client: ", client.uid);
            logger.debug(msg);

            client.send(msg)
        })
    });

    w.on('close', function () {
        logger.info("removed client: " + w.uid);
    });
});

function uuid() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}