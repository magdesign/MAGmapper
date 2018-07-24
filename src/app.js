import {Scene, PerspectiveCamera, WebGLRenderer} from "three"

import DragControls from 'three-dragcontrols';




let scene = new Scene();
let camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




// let drag = new DragControls(objects, camera, renderer.domElement);
