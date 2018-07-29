import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PlaneGeometry,
    TextureLoader,
    MeshPhongMaterial,
    LoadingManager,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    Vector2,
    ShapeBufferGeometry,
    Shape
} from "three"
import DragControls  from "three-dragcontrols"


let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


prepareShapes(camera, scene);
animate();

function prepareShapes(camera,scene){
    let objects = [];

/*    let cube = createCube(Math.random(), Math.random(), 1, 0xffffff);
    scene.add(cube);
    objects.push(cube);*/


    let mapper = createMapper();
    scene.add(mapper);
    objects.push(mapper);

    let dragControls = new DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener( 'mousemove', () =>{ renderer.render(scene, camera); } );
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function createMapper() {

    let triangleShape = new Shape();
    let startpoint = 0.5;

    triangleShape.moveTo(startpoint , startpoint + 1);
    triangleShape.lineTo(startpoint + 1, startpoint);
    triangleShape.lineTo(startpoint, startpoint - 1); // close path
    triangleShape.lineTo(startpoint-1, startpoint); // close path
    
    let geometry = new ShapeBufferGeometry(triangleShape);

    var manager = new LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };
    var texture = new TextureLoader(manager).load( 'textures/UV_Grid_Sm.jpg' );


    let material = new MeshBasicMaterial({map: texture});


    return new Mesh(geometry, material);
}


function createCube(x, y, size, color) {
    let geo = new PlaneGeometry(size, size, 1);
    let mat = new MeshBasicMaterial({color: color});
    let cube = new Mesh(geo, mat);
    cube.position.set(x, y, 0);
    return cube;
}

