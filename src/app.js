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
    Sprite,
    SpriteMaterial
} from "three"
import DragControls from "three-dragcontrols"
import {Mapper} from './mapper.js'
import {Shift} from "./shift";

let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


prepareShapes(camera, scene);
animate();

function prepareShapes(camera, scene) {
    const size = 10;
    const length = 5;


    let mapper = createMapper(size,length);
    mapper.scene.forEach( item => scene.add(item));


    let dragControls = new DragControls(mapper.handler, camera, renderer.domElement);
    dragControls.addEventListener('dragend', () => {
        const topRight = scene.children[4].position;
        const topLeft = scene.children[2].position;

        let mapping = calcMapping(size, length);
        let vert = Shift.topRigth(mapping.vertices, topRight.x,topRight.y);
        vert = Shift.topLeft(vert, topLeft.x,topLeft.y);

        let geometry = buildBufferGeometry(vert , mapping.uvs, mapping.indices);
        let mapperMesh = buildMesh(geometry);



        scene.children[0] = mapperMesh;

        renderer.render(scene, camera);
    });


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

function buildMesh(geometry) {
    let manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    const texture = new TextureLoader(manager).load('textures/UV_Grid_Sm.jpg');
    return new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}))
}

function calcMapping(size, length) {
    return {
        vertices:  Mapper.vertices(size, length),
        uvs: Mapper.uv(size),
        indices: Mapper.calcIndices(size)
    }
}

function createMapper(size, length) {
    let mapping = calcMapping(size, length);
    let geometry = buildBufferGeometry(mapping.vertices, mapping.uvs, mapping.indices);
    let mapperMesh = buildMesh(geometry);

    const handler = Mapper.edges(mapping.vertices).map(vert => makeSprite(vert.x, vert.y));
    const scene = Array.concat([mapperMesh], handler);

    return {
        handler,
        scene
    };
}