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
    let objects = [];

    let obj = createMapper();

    scene.add(obj.mapper);

    obj.handles.forEach((obj) => {
        scene.add(obj);
        objects.push(obj);
    });

    let dragControls = new DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener('mousemove', () => {
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


function createMapper() {

    const size = 10;

    let vertices = Mapper.vertices(size, 5);

    let uvs = Mapper.transform(Mapper.uv(size));
    let indices = Mapper.calcIndices(size);


    const transVertices = Mapper.transform(Shift.topRigth(vertices, 4, 4));


    let geometry = new BufferGeometry();
    geometry.setIndex(indices);
    geometry.addAttribute('position', new BufferAttribute(transVertices, 3));
    geometry.addAttribute('uv', new BufferAttribute(uvs, 3));


    // geometry.addAttribute( 'uv', new BufferAttribute( uvs, 2 ) );
    // var material = new MeshBasicMaterial( { color: 0xff0000 } );
    let manager = new LoadingManager();

    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    let texture = new TextureLoader(manager).load('textures/UV_Grid_Sm.jpg');

    const sprites = Mapper.edges(vertices).map(vert  => makeSprite(vert.x, vert.y));

    console.log(sprites);
    return {
        mapper: new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: true})),
        handles: sprites
    };
}