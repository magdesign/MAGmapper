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

    createMapper().forEach((obj)=>{
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



function makeSprite( color, parent ) {
    var sprite = new Sprite( new SpriteMaterial( {
        color: color
    } ) );
    parent.add( sprite );
    sprite.position.set();
    return sprite;
}


function createMapper() {

    const size = 10;

    let vertices = Mapper.vertices(size, 10);
    let uvs = Mapper.transform(Mapper.uv(size));
    let indices =  Mapper.calcIndices(size);

    vertices = Mapper.transform(Shift.topRigth(vertices, 4, 4));


    let geometry = new BufferGeometry();
    geometry.setIndex(indices);
    geometry.addAttribute('position', new BufferAttribute(vertices, 3));
    geometry.addAttribute('uv', new BufferAttribute(uvs, 3));


    // geometry.addAttribute( 'uv', new BufferAttribute( uvs, 2 ) );
    // var material = new MeshBasicMaterial( { color: 0xff0000 } );
    let manager = new LoadingManager();

    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    let texture = new TextureLoader(manager).load('textures/UV_Grid_Sm.jpg');
    return [
        new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: true})),
        new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}))
    ];
}