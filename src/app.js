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
    websocketUrl: "ws://localhost:9030",
    cameraPosition: 10,
    wireframe: false,
    size: 30,
    length: 5
};


let connection = new WebSocket(config.websocketUrl);

let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = config.cameraPosition;


let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);


// Button Area
document.getElementById("wireframe").addEventListener("click", () => {
    config.wireframe = !config.wireframe;
    renderMappingWithWebSocket();
});

document.body.appendChild(renderer.domElement);
connection.onopen = () => prepareShapes(camera, scene);
animate();

function getEdgePoints(scene) {
    return {
        topRight: scene.children[4].position,
        topLeft: scene.children[2].position,
        bottomRight: scene.children[3].position,
        bottomLeft: scene.children[1].position
    };
}

function renderMappingWithWebSocket(){
    const points = getEdgePoints(scene);
    renderMapping(points);
    connection.send(JSON.stringify({points, config}));
}

function prepareShapes(camera, scene) {

    let mapper = createMapper(config.size, config.length);
    mapper.scene.forEach(item => scene.add(item));


    let dragControls = new DragControls(mapper.handler, camera, renderer.domElement);
    dragControls.addEventListener('drag', () => {
        renderMappingWithWebSocket();
    });


    connection.onmessage = e => {
        const data = JSON.parse(e.data);
        config  =  data.config;

        const topRight = data.points.topRight;
        const topLeft = data.points.topLeft;

        const bottomRight = data.points.bottomRight;
        const bottomLeft = data.points.bottomLeft;

        scene.children[4].position.x = topRight.x;
        scene.children[4].position.y = topRight.y;

        scene.children[2].position.x = topLeft.x;
        scene.children[2].position.y = topLeft.y;

        scene.children[3].position.x = bottomRight.x;
        scene.children[3].position.y = bottomRight.y;

        scene.children[1].position.x = bottomLeft.x;
        scene.children[1].position.y = bottomLeft.y;

        renderMapping(data.points);
    }
}


function renderMapping(points) {
    let mapping = calcMapping(config.size, config.length);
    let vert = Shift.shift(config.size, points.bottomLeft, points.topLeft, points.bottomRight, points.topRight);
    let geometry = buildBufferGeometry(vert, mapping.uvs, mapping.indices);

    scene.children[0] = buildVideoMesh(geometry);
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


function makeSprite(x, y) {
    const texture = new TextureLoader()
        .load("textures/sprite0.png");

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
    manager.onProgress = function (item, loaded, total) {
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
    let mapping = calcMapping(size, length);
    let geometry = buildBufferGeometry(mapping.vertices, mapping.uvs, mapping.indices);
    let mapperMesh = buildVideoMesh(geometry);

    const handler = Mapper
        .edges(mapping.vertices)
        .map(vert => makeSprite(vert.x, vert.y));

    const scene = Array.concat([mapperMesh], handler);

    return {
        handler,
        scene
    };
}

