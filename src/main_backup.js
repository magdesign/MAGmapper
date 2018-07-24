// ################################
// setup
// ################################
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);




// ################################
// object
// ################################


var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );


var cube = new THREE.Mesh( geometry, material );
var controls = prepareControls(cube);


var objects = [];
for (var i = 0; i < 1; i++) {
	var num = Math.random();
	console.log(num);

	var cube = createCube(num, 0xffffff);
	scene.add(cube);
	objects.push(cube);
}



//scene.add(cube);


// DragControls benötigt zwangsweise ein array von meshes
var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );




function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function createCube(pos, color){	
	var geo = new THREE.PlaneGeometry( 1, 1, 1 );
	var mat = new THREE.MeshBasicMaterial( { color: color } );
	var cube = new THREE.Mesh( geo, mat );
	cube.position.set(pos, 0, 0);
	return cube;
}

/**
hier wird der controller für das drag and drop definiert.
Dieser wird für die EventListener benötigt
*/
function prepareControls(obj){
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

animate();