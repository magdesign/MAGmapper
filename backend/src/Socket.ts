import uuid = require("uuid");
import {Server} from "ws";

const port = 9030;

let wss = new Server({port});

let log4js = require("log4js");
let logger = log4js.getLogger();

logger.level = "debug";
logger.info("Listen on port: " + port);


wss.on("connection", (ws: any) => {
    ws.id = uuid();
    console.log(ws.id);


    sendRegistrationRequest(ws.id, wss.clients);

    ws.on("message", (msg) => {
        console.log("message");
        console.log(msg);

    });

    ws.on("close",  (client) => {
        console.log(client)
    });
});


function sendRegistrationRequest(id: string, clients: any) {
    const ids = clients.map((client: any) => client.id);


    clients.forEach( (client) => {

        client.send(JSON.stringify({
            id,
            clients: ids
        }));
    })
}
