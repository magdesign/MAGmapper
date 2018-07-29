import DragControls from "three-dragcontrols";
import {Mesh, MeshBasicMaterial, PlaneGeometry} from "three";


function prepareShapes(camera, scene,renderer) {
    let objects = [];

    let cube = createCube(Math.random(), Math.random(), 1, 0xffffff);
    scene.add(cube);
    objects.push(cube);


    let dragControls = new DragControls(objects, camera, renderer.domElement);

    dragControls.addEventListener('mousemove', () => {
        renderer.render(scene, camera);
    });

}

function createCube(x, y, size, color) {
    let geo = new PlaneGeometry(size, size, 1);
    let mat = new MeshBasicMaterial({color: color});
    let cube = new Mesh(geo, mat);
    cube.position.set(x, y, 0);
    return cube;
}