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
    BackSide,
    DoubleSide,
    Vector2,
    Vector3,
    Face3,
    ShapeBufferGeometry,
    Shape
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



function createMapper() {

    const size = 3;

    let vertices = Mapper.transform(Mapper.cartesis(size)(i => i));
    let uvs = Mapper.transform(Mapper.cartesis(size)(val =>  1/size * (val + 1)));
    let indices =  Mapper.calcIndices(size);


   // vertices = Mapper.transform(Shift.topRigth(vertices, 3, 3));

    console.log(vertices);
    console.log("uv" + uvs);
    console.log(indices);



    let geometry = new BufferGeometry();
    geometry.setIndex(indices);
    geometry.addAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
    geometry.addAttribute('uv', new BufferAttribute(new Float32Array(uvs), 3));


    // geometry.addAttribute( 'uv', new BufferAttribute( uvs, 2 ) );
    // var material = new MeshBasicMaterial( { color: 0xff0000 } );
    let manager = new LoadingManager();

    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    let texture = new TextureLoader(manager).load('textures/UV_Grid_Sm.jpg');
    let material = new MeshBasicMaterial({map: texture, wireframe: false});
    return new Mesh(geometry, material);
}


function createMapper2() {

    console.log(Mapper.calcVertices(2));
    console.log(Mapper.calcUvs(2));
    console.log(Mapper.calcIndices(2));

    //console.log(Mapper.calcIndices(1));
    let imageSize = {
        width: 1,
        height: 1
    };

    // Identify the x, y, z coords where the image should be placed
    let coords = {
        x: -1,
        y: -1,
        z: 0
    };

    let vertices = new Float32Array([
        coords.x, coords.y, coords.z,                                       // bottom left
        coords.x + imageSize.width, coords.y, coords.z,                     // bottom right
        coords.x, coords.y + imageSize.height, coords.z,                    // upper left,
        coords.x + imageSize.width, coords.y + imageSize.height, coords.z,  // upper right
    ]);

    let uvs = new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
    ]);

    let geometry = new BufferGeometry();
    geometry.setIndex([0, 1, 2, 3, 2, 1]);
    geometry.addAttribute('position', new BufferAttribute(vertices, 3));
    geometry.addAttribute('uv', new BufferAttribute(uvs, 2));


    // geometry.addAttribute( 'uv', new BufferAttribute( uvs, 2 ) );
    // var material = new MeshBasicMaterial( { color: 0xff0000 } );
    let manager = new LoadingManager();

    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    let texture = new TextureLoader(manager).load('textures/UV_Grid_Sm.jpg');
    let material = new MeshBasicMaterial({map: texture});
    return new Mesh(geometry, material);
}
