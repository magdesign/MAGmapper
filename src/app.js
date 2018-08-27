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
    SpriteMaterial
} from "three"
import DragControls from "three-dragcontrols"
import {Mapper} from './mapper.js'
import {Shift} from "./shift";


let connection = new WebSocket("ws://localhost:9030");


let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


connection.onopen = () => prepareShapes(camera, scene);
animate();

function prepareShapes(camera, scene) {

    const size = 45;
    const length = 5;

    let mapper = createMapper(size, length);
    mapper.scene.forEach(item => scene.add(item));


    let dragControls = new DragControls(mapper.handler, camera, renderer.domElement);
    dragControls.addEventListener('dragend', () => {
        const topRight = scene.children[4].position;
        const topLeft = scene.children[2].position;

        const bottomRight = scene.children[3].position;
        const bottomLeft = scene.children[1].position;

        let mapping = calcMapping(size, length);

        let vert = Shift.shift(size, bottomLeft, topLeft, bottomRight, topRight);

        let geometry = buildBufferGeometry(vert, mapping.uvs, mapping.indices);
        let mapperMesh = buildVideoMesh(geometry);

        scene.children[0] = mapperMesh;

        renderer.render(scene, camera);
        connection.send(JSON.stringify({topRight, topLeft, bottomRight, bottomLeft}));
    });


    connection.onmessage = e => {

        const points = JSON.parse(e.data);
        console.log(points);


        const topRight = points.topRight;
        const topLeft = points.topLeft;

        const bottomRight = points.bottomRight;
        const bottomLeft = points.bottomLeft;


        scene.children[4].position.x = topRight.x;
        scene.children[4].position.y = topRight.y;

        scene.children[2].position.x = topLeft.x;
        scene.children[2].position.y = topLeft.y;

        scene.children[3].position.x = bottomRight.x;
        scene.children[3].position.y = bottomRight.y;

        scene.children[1].position.x = bottomLeft.x;
        scene.children[1].position.y = bottomLeft.y;

        let mapping = calcMapping(size, length);
        let vert = Shift.shift(size, bottomLeft, topLeft, bottomRight, topRight);

        let geometry = buildBufferGeometry(vert, mapping.uvs, mapping.indices);
        let mapperMesh = buildVideoMesh(geometry);

        scene.children[0] = mapperMesh;
        renderer.render(scene, camera);
    }
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


function makeSprite(x, y) {
    const texture = new TextureLoader().load("textures/sprite0.png");
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

function buildVideoMesh2(geometry) {
    let manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    const texture = new TextureLoader(manager).load('textures/UV_Grid_Sm.jpg');
    return new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}))
}

//buildMesh
function buildVideoMesh(geometry) {
    let manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    var video = document.getElementById('video');

    const texture = new VideoTexture(video);
    return new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}))
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

    const handler = Mapper.edges(mapping.vertices).map(vert => makeSprite(vert.x, vert.y));
    const scene = Array.concat([mapperMesh], handler);

    return {
        handler,
        scene
    };
}

