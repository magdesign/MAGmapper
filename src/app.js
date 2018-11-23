import {PerspectiveCamera, Scene, WebGLRenderer} from "three"

import DragControls from "three-dragcontrols"
import {DragHandle} from "./draghandle";
import {ButtonBar} from "./buttonbar";
import {VideoBar} from "./videobar";
import {Renderer, EventType} from "./renderer";

let config = {
    webSocketUrl: "ws://localhost:9030",
    cameraPosition: 10,
    wireframe: false,
    size: 5,
    length: 5,
    webSocketConnectionToggle: false,
};

let mapper = {
    scene: new Scene(),
    camera: new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: new WebGLRenderer(),
    webSocket: null
};


init(mapper, config);

function init(mapper, config) {
    ButtonBar.init();
    VideoBar.init(mapper, config);

    mapper.camera.position.z = config.cameraPosition;
    mapper.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(mapper.renderer.domElement);

    prepareShapes(mapper, config);

    const animate = () => {
        requestAnimationFrame(animate);
        mapper.renderer.render(mapper.scene, mapper.camera);
    };
    animate();
}

// Button Wireframe
document.getElementById("wireframe").addEventListener("click", () => {
    config.wireframe = !config.wireframe;
    Renderer.renderMappingWithWebSocket(mapper, config, EventType.drag);
});



function setWebSocketToggle(toggle) {
    config.webSocketConnectionToggle = toggle;
    const cssClass = toggle ? "active" : "inactive";
    document.getElementById("websocket-connection").setAttribute("class", cssClass);
}

// Button websocket
document.getElementById("websocket-toggle").addEventListener("click", () => {
    config.webSocketUrl = document.getElementById("websocket-connection").value;

    if (mapper.webSocket !== null && mapper.webSocket !== undefined) {
        mapper.webSocket.close();
    }

    try {
        mapper.webSocket = new WebSocket(config.webSocketUrl);
        setWebSocketToggle(!config.webSocketConnectionToggle);
        mapper.webSocket.onmessage = e => {
            const data = JSON.parse(e.data);
            config = data.config;

            mapper.scene.children = DragHandle.setDragHandleButtons(mapper.scene.children, data.points);
            if (data.eventType === EventType.video){
                VideoBar.setSetting(data.video);
            }

            Renderer.renderMapping(mapper, data.points, config);
        };
    } catch (e) {
        setWebSocketToggle(false);
    }
});

function prepareShapes(mapper, config) {
    let mapperParts = Renderer.createMapper(config);
    mapperParts.scene.forEach(item => mapper.scene.add(item));

    const drag = new DragControls(mapperParts.handler, mapper.camera, mapper.renderer.domElement);
    drag.addEventListener('drag', () => Renderer.renderMappingWithWebSocket(mapper, config, EventType.drag));
}
