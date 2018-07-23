


var camera, scene, renderer, stats;
var mesh;
// hier ist das hauptprogramm
//
init();
animate();

function init() {

    //hier wird die standard 3d scene generiert/geladen

    camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500);
    camera.position.z = 64;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    //
    //generates the lights, but we need to get rid of this, maybe change material type
    //

    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);


    //Generates the object, in this case a buffer geometry plane

    var geometry = new THREE.BufferGeometry();

    var indices = [];

    var vertices = [];
    var normals = [];
    var colors = [];

    var size = 20;
    var segments = 10;

    var halfSize = size / 2;
    var segmentSize = size / segments;


    //here we add the controls to drag the geo, the thing in brackets is the name of the object?,
    //i think it is not working because there is no cube object, how is the name of out object?:
    // or should the var cube = define the new THREE.BufferGeo?

    var cube = new THREE.Mesh(geometry);
    var controls = prepareControls(cube);

    // generate vertices, normals and color data for a simple grid geometry

    for (var i = 0; i <= segments; i++) {

        var y = (i * segmentSize) - halfSize;

        for (var j = 0; j <= segments; j++) {

            var x = (j * segmentSize) - halfSize;

            vertices.push(x, -y, 0);
            normals.push(0, 0, 1);

            var r = (x / size) + 0.5;
            var g = (y / size) + 0.5;

            colors.push(r, g, 1);

        }

    }

    // generate indices (data for element array buffer)

    for (var i = 0; i < segments; i++) {

        for (var j = 0; j < segments; j++) {

            var a = i * (segments + 1) + (j + 1);
            var b = i * (segments + 1) + j;
            var c = (i + 1) * (segments + 1) + j;
            var d = (i + 1) * (segments + 1) + (j + 1);

            // generate two faces (triangles) per iteration

            indices.push(a, b, d); // face one
            indices.push(b, c, d); // face two

        }

    }

    //

    geometry.setIndex(indices);
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    var material = new THREE.MeshPhongMaterial({
        specular: 0x111111, shininess: 250,
        side: THREE.DoubleSide, vertexColors: THREE.VertexColors
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //

    stats = new Stats();
    document.body.appendChild(stats.dom);

    //

    var gui = new dat.GUI()
    gui.add(material, 'wireframe');

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//some drag controls, have no idea, just copied it, and it does not work so far:
// DragControls benötigt zwangsweise ein array von meshes

var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

dragControls.addEventListener('dragstart', function (event) {
    controls.enabled = false;
});
dragControls.addEventListener('dragend', function (event) {
    controls.enabled = true;
});


// here we add some drag controls:
/**
 hier wird der controller für das drag and drop definiert.
 Dieser wird für die EventListener benötigt
 */
function prepareControls(obj) {
    var controls = new THREE.TrackballControls(obj);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    return controls
}


//schnall ich noch nicht ganz was da abgeht

function animate() {
    requestAnimationFrame(animate);
    stats.update();
    renderer.render(scene, camera);
}


//render und animate sind im beispiel separat, weiss nicht wieso:


//function animate() {

//	requestAnimationFrame( animate );
//	render();
//	stats.update();

//}

//function render() {
//
//	var time = Date.now() * 0.001;

//	mesh.rotation.x = time * 0.25;
//	mesh.rotation.y = time * 0.5;

//	renderer.render( scene, camera );

//}