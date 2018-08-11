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


function calcVertices(items){
    let coords = []
    for (let x = 0; x <= items; x++) {
        for (let y = 0; y <= items; y++) {
            coords.push(x, y, 0)
        }        
    }
    return coords
}

function calcUvs(items){
    let uvs = [];
    let size = 1;
    let part = size / items;

    for (let x = 0; x <= size; x = x + part) {
        for (let y = 0; y <= size;y = y + part) {
            uvs.push(x,y)
        }
    }
    return uvs;
}



/*
 
1-2-3-4
5-6-7-8
9-0-1-2
3-4-5-6

*/

function calcIndices(items){
    let indices = [];
    const part = 2;

    for (let index = 1; index <= items^2; index = index + part) {
        indices = calcCube(indices, index, items* items);
    }    
    return indices;
}


/*
1,2,5
2,6,5
*/
function calcCube(indices, index, size){
    const cutPoint = index + size;
    const position2 = index + 1;

    indices.push(
        index, 
        position2, 
        cutPoint,
        position2 , 
        cutPoint + 1, 
        cutPoint
    );
    return indices
}


function createMapper() {

    const SIZE = 2

    var imageSize = {
        width: 1,
        height: 1
    };

    // Identify the x, y, z coords where the image should be placed
    var coords = {
        x: -1,
        y: -1,
        z: 0
    };

    var bias = 0;


    var vertices = new Float32Array([
        coords.x, coords.y, coords.z, // bottom left
        coords.x + imageSize.width, coords.y, coords.z, // bottom right
        coords.x + imageSize.width + bias, coords.y + imageSize.height+ bias, coords.z, // upper right
        coords.x, coords.y + imageSize.height, coords.z, // upper left
    ])

    var uvs = new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ])


    let geometry = new BufferGeometry();
    geometry.setIndex([0,1,2, 2,3,0])
    geometry.addAttribute('position', new BufferAttribute( vertices, 3 ));
    geometry.addAttribute('uv', new BufferAttribute( uvs, 2) )





   // geometry.addAttribute( 'uv', new BufferAttribute( uvs, 2 ) );
    //var material = new MeshBasicMaterial( { color: 0xff0000 } );
    var manager = new LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };
    
    let texture = new TextureLoader(manager).load( 'textures/UV_Grid_Sm.jpg' );
    let material = new MeshBasicMaterial({map: texture});


    return new Mesh(geometry, material);
}
