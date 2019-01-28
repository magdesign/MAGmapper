import './style.css'
import {
    BoxGeometry, BufferAttribute, BufferGeometry, ClampToEdgeWrapping,
    DirectionalLight, LinearFilter, LoadingManager,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    VideoTexture,
    WebGLRenderer
} from 'three'

// create the scene
let scene: Scene = new Scene();

// create the camera
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer: WebGLRenderer = new WebGLRenderer();

// set size
renderer.setSize(window.innerWidth, window.innerHeight)

// add canvas to dom
document.body.appendChild(renderer.domElement);

// add axis to the scene

// add lights
let light = new DirectionalLight(0xffffff, 1.0);

light.position.set(100, 100, 100);
scene.add(light);


let material = new MeshBasicMaterial({
    color: 0xaaaaaa,
    wireframe: true
});

// create a box and add it to the scene
let box = new Mesh(new BoxGeometry(1, 1, 1), material);
scene.add(box);


let video = document.createElement("video");

video.setAttribute("id", "video");
video.setAttribute("controls", "true");
video.setAttribute("crossOrigin", "anonymous");
video.setAttribute("style", "display:none");


let source = document.createElement("source");
source.setAttribute("src", "testvideo.mp4");
source.setAttribute("type", "video/mp4");
source.setAttribute("codecs", "avc1.42E01E, mp4a.40.2");
video.appendChild(source);

document
    .getElementsByTagName("body")[0]
    .appendChild(video);


// new LoadingManager()
//     .onProgress = (item, loaded, total) => {
//     console.log(item, loaded, total);
// };

const texture = new VideoTexture(video);

texture.generateMipmaps = false;
texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
texture.minFilter = LinearFilter;

let geometry = new BufferGeometry();
geometry.setIndex([0,1,2,3]);
geometry.addAttribute('position', new BufferAttribute([0,1,0,1]));
geometry.addAttribute('uv', new BufferAttribute(, 3));

let mesh = new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: true}))

/*
<video
    id="video"
    autoplay loop
    controls="true"
    crossOrigin="anonymous"
    webkit-playsinline
    style="display:none" >
    <source
            src="textures/testvideo.mp4"
            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
</video>*/



camera.position.x = 5
camera.position.y = 0
camera.position.z = 0

camera.lookAt(scene.position)

function animate(): void {
    requestAnimationFrame(animate)
    render()
}

function render(): void {
    renderer.render(scene, camera)
}

animate()
