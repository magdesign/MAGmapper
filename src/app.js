import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PlaneGeometry,
    Geometry,
    BufferGeometry,
    BufferAttribute,
    TextureLoader,
    MeshPhongMaterial,
    LoadingManager,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    Vector2,
    Vector3,
    Face3,
    ShapeBufferGeometry,
    Shape
} from "three"
import DragControls from "three-dragcontrols"


let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


prepareShapes(camera, scene);
animate();

function prepareShapes(camera, scene) {
    let objects = [];

    /*    let cube = createCube(Math.random(), Math.random(), 1, 0xffffff);
        scene.add(cube);
        objects.push(cube);*/


    let mapper = createMapper();
    scene.add(mapper);
    objects.push(mapper);

    let dragControls = new DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener('mousemove', () => {
        renderer.render(scene, camera);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function createMapperShapeBufferGeometry() {

    let triangleShape = new Shape();
    let startpoint = 0.5;

    triangleShape.moveTo(startpoint, startpoint + 1);
    triangleShape.lineTo(startpoint + 1, startpoint);
    triangleShape.lineTo(startpoint, startpoint - 1); // close path
    triangleShape.lineTo(startpoint - 1, startpoint); // close path


    let geometry = new ShapeBufferGeometry(triangleShape);

    var manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    let texture = new TextureLoader(manager).load('textures/UV_Grid_Sm.jpg');
    let material = new MeshBasicMaterial({map: texture});


    return new Mesh(geometry, material);
}

function createMapper2() {

    let geometry = new BufferGeometry();

    var vertices = new Float32Array([
        -1.0, -1.0, 0,
        1.0, -1.0, 0,
        1.0, 1.0, 0,

        1.0, 1.0, 0,
        -1.0, 1.0, 0,
        -1.0, -1.0, 0
    ]);

    //geometry.setIndex([0,1,2,3])

    var uvs = new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        1.0, 1.0,
    ])
    geometry.addAttribute('position', new BufferAttribute(vertices, 3));
    // geometry.addAttribute( 'uv', new BufferAttribute( uvs, 2 ) );
    //var material = new MeshBasicMaterial( { color: 0xff0000 } );
    var manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    let texture = new TextureLoader(manager).load('textures/UV_Grid_Sm.jpg');
    let material = new MeshBasicMaterial({map: texture});


    return new Mesh(geometry, material);
}


function createMapper() {


    var imageSize = {
        width: 1,
        height: 1
    };

    // Identify the x, y, z coords where the image should be placed
    var coords = {
        x: 0,
        y: 0,
        z: 0
    };


    var vertices = new Float32Array([
        coords.x, coords.y, coords.z, // bottom left                                        // 0
        coords.x + imageSize.width*2 , coords.y, coords.z, // bottom right                     // 1
        coords.x + imageSize.width, coords.y + imageSize.height, coords.z, // upper right   // 2
        coords.x, coords.y + imageSize.height, coords.z, // upper left                      // 3
        0.68,  0.68, coords.z           // 4
    ]);


/*
    var vertices = new Float32Array([
        coords.x, coords.y, coords.z, // bottom left                                        // 0
        coords.x + imageSize.width*2 , coords.y, coords.z, // bottom right                     // 1
        coords.x + imageSize.width, coords.y + imageSize.height, coords.z, // upper right   // 2
        coords.x, coords.y + imageSize.height, coords.z, // upper left                      // 3
        coords.x + imageSize.width / 2, coords.y + imageSize.height / 2, coords.z           // 4
    ]);
*/

    console.log(vertices);

    var uvs = new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.5, 0.5
    ]);


    /*

     3-----2
     | \ / |
     |  4  |
     |/  \ |
     0-----1


   */

    const indices = [
        0, 1, 4,
        1, 2, 4,
        2, 3, 4,
        3, 0, 4
    ];

    let geometry = new BufferGeometry();

    //geometry.setIndex([0,1,2, 2,3,0]);
    geometry.setIndex(indices, 1);

    geometry.addAttribute('position', new BufferAttribute(vertices, 3));
    geometry.addAttribute('uv', new BufferAttribute(uvs, 2));


    // geometry.addAttribute( 'uv', new BufferAttribute( uvs, 2 ) );
    //var material = new MeshBasicMaterial( { color: 0xff0000 } );
    var manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    let texture = new TextureLoader(manager).load('textures/UV_Grid_Sm.jpg');
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

