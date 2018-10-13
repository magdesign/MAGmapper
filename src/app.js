import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BufferGeometry,
    BufferAttribute,
    LoadingManager,
    MeshBasicMaterial,
    Mesh,
    VideoTexture,
    LinearFilter,
    ClampToEdgeWrapping
} from "three"

import DragControls from "three-dragcontrols"
import {Mapper} from './mapper.js'
import {Shift} from "./shift";
import {DragHandle} from "./draghandle";
import {ButtonBar} from "./buttonbar";
import {VideoBar} from "./videobar";
import {Renderer} from "./renderer";

let config = {
    webSocketUrl: "ws://localhost:9030",
    cameraPosition: 10,
    wireframe: false,
    size: 30,
    length: 5,
    webSocketConnectionToggle: false,
};

let mapper = {
    scene: new Scene(),
    camera: new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer: new WebGLRenderer(),
    webSocket: null
};

const EventType = {
    video: "video",
    drag: "drag"
};

init(mapper, config);

function init(mapper, config) {
    ButtonBar.init();
    VideoBar.init();

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

// Video buttons
document.getElementById("video-stop")
    .addEventListener("click",
        () => Renderer.renderMappingWithWebSocket(mapper, config, EventType.video));

document.getElementById("video-start")
    .addEventListener("click",
        () => Renderer.renderMappingWithWebSocket(mapper, config, EventType.video));


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
