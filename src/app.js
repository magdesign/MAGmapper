import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh
} from "three"

import DragControls  from "three-dragcontrols"
// ################################
// setup
// ################################
let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


// ################################
// object
// ################################


let objects = [];

let cube = createCube(Math.random(), Math.random(), 1, 0xffffff);
scene.add(cube);
objects.push(cube);

let cube1 = createCube(Math.random(), Math.random(), 1, 0xffffff);
scene.add(cube1);



// DragControls benötigt zwangsweise ein array von meshes
let dragControls = new DragControls(objects, camera, renderer.domElement);

dragControls.addEventListener( 'mousemove', () =>{ renderer.render(scene, camera); } );

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function createCube(x, y, size, color) {
    let geo = new PlaneGeometry(size, size, 1);
    let mat = new MeshBasicMaterial({color: color});
    let cube = new Mesh(geo, mat);
    cube.position.set(x, y, 0);
    return cube;
}

animate();