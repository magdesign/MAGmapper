import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BufferGeometry,
    BufferAttribute,
    TextureLoader,
    LoadingManager,
    MeshBasicMaterial,
    Mesh,
    VideoTexture,
    Sprite,
    SpriteMaterial,
    LinearFilter,
    ClampToEdgeWrapping
} from "three"

import DragControls from "three-dragcontrols"
import {Mapper} from './mapper.js'
import {Shift} from "./shift";

let config = {
    webSocketUrl: "ws://localhost:9030",
    cameraPosition: 10,
    wireframe: false,
    size: 30,
    length: 5,
    dragHandleSprite: "textures/sprite0.png",
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
    const animate = () => {
        requestAnimationFrame(animate);
        mapper.renderer.render(mapper.scene, mapper.camera);
    };

    mapper.camera.position.z = config.cameraPosition;
    mapper.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(mapper.renderer.domElement);

    prepareShapes(mapper, config);
    animate();
}



// Button Wireframe
document.getElementById("wireframe").addEventListener("click", () => {
    config.wireframe = !config.wireframe;
    renderMappingWithWebSocket(mapper);
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

            mapper.scene.children[4].position.x = data.points.topRight.x;
            mapper.scene.children[4].position.y = data.points.topRight.y;

            mapper.scene.children[2].position.x = data.points.topLeft.x;
            mapper.scene.children[2].position.y = data.points.topLeft.y;

            mapper.scene.children[3].position.x = data.points.bottomRight.x;
            mapper.scene.children[3].position.y = data.points.bottomRight.y;

            mapper.scene.children[1].position.x = data.points.bottomLeft.x;
            mapper.scene.children[1].position.y = data.points.bottomLeft.y;
            renderMapping(mapper ,data.points);
        };

    } catch (e) {
        setWebSocketToggle(false);
    }
});


function getEdgePoints(scene) {
    return {
        bottomLeft: scene.children[1].position,
        topLeft: scene.children[2].position,
        bottomRight: scene.children[3].position,
        topRight: scene.children[4].position
    };
}

function renderMappingWithWebSocket(mapper) {
    const points = getEdgePoints(mapper.scene);
    renderMapping(mapper, points);

    if (config.webSocketConnectionToggle) {
        const body = JSON.stringify({points, config});

        mapper.webSocket.send(body);
    }
}

function prepareShapes(mapper, config) {

    let mapperParts = createMapper(config.size, config.length);
    mapperParts.scene.forEach(item => mapper.scene.add(item));

    const drag = new DragControls(mapperParts.handler, mapper.camera, mapper.renderer.domElement);
    drag.addEventListener('drag', () => renderMappingWithWebSocket(mapper));
}

function renderMapping(mapper ,points) {
    let mapping = calcMapping(config.size, config.length);
    let vert = Shift.shift(config.size, points.bottomLeft, points.topLeft, points.bottomRight, points.topRight);
    let geometry = buildBufferGeometry(vert, mapping.uvs, mapping.indices);

    mapper.scene.children[0] = buildVideoMesh(geometry);
    mapper.renderer.render(mapper.scene, mapper.camera);
}


function makeDragHandleSprite(x, y) {
    const texture = new TextureLoader()
        .load(config.dragHandleSprite);

    const material = new SpriteMaterial({map: texture});

    let sprite = new Sprite(material);
    sprite.position.set(x, y, 0);
    sprite.scale.set(0.3, 0.3, 1);
    return sprite;
}


function buildBufferGeometry(vertices, uvs, indices) {
    let geometry = new BufferGeometry();
    geometry.setIndex(indices);
    geometry.addAttribute('position', new BufferAttribute(Mapper.transform(vertices), 3));
    geometry.addAttribute('uv', new BufferAttribute(Mapper.transform(uvs), 3));
    return geometry;
}

//buildMesh
function buildVideoMesh(geometry) {
    let manager = new LoadingManager();
    manager.onProgress = (item, loaded, total) => {
        console.log(item, loaded, total);
    };

    let video = document.getElementById('video');

    const texture = new VideoTexture(video);

    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
    texture.minFilter = LinearFilter;

    return new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: config.wireframe}))
}


function calcMapping(size, length) {
    return {
        vertices: Mapper.vertices(size, length),
        uvs: Mapper.uv(size),
        indices: Mapper.calcIndices(size)
    }
}

function createMapper(size, length) {
    const mapping = calcMapping(size, length);

    let geometry = buildBufferGeometry(mapping.vertices, mapping.uvs, mapping.indices);
    let mapperMesh = buildVideoMesh(geometry);

    const handler = Mapper
        .edges(mapping.vertices)
        .map(coordinates => makeDragHandleSprite(coordinates.x, coordinates.y));

    const scene = Array.concat([mapperMesh], handler);

    return {
        handler,
        scene
    };
}

