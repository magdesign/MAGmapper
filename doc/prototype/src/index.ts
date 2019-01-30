
import './style.css'
import {
    BoxGeometry, BufferAttribute, BufferGeometry, ClampToEdgeWrapping,
    DirectionalLight, LinearFilter, LoadingManager,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene, TypedArray,
    VideoTexture,
    WebGLRenderer
} from 'three'

// create the scene
let scene: Scene = new Scene();

// create the camera
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

let renderer: WebGLRenderer = new WebGLRenderer();

// set size
renderer.setSize(window.innerWidth, window.innerHeight)

// add canvas to dom
document.body.appendChild(renderer.domElement);

// add axis to the scene



let material = new MeshBasicMaterial({
    color: 0xaaaaaa,
    wireframe: true
});

// create a box and add it to the scene




let video = document.createElement("video");

video.setAttribute("id", "video");
video.setAttribute("controls", "true");
video.setAttribute("src", "assets/testvideo.mp4");
video.setAttribute("type", "video/mp4");
video.setAttribute("codecs", "avc1.42E01E, mp4a.40.2");
video.setAttribute("style", "display:none");


document.getElementsByTagName("body")[0].appendChild(video);

let vid = document.getElementsByTagName("video")[0];

// new LoadingManager()
//     .onProgress = (item, loaded, total) => {
//     console.log(item, loaded, total);
// };



let geometry = new BufferGeometry();


const indices: number[] = [0, 2, 1,1, 2, 3];

const pos = new Float32Array([
    0, 0, 0,
    0, 2, 0,
    2, 0, 0,
    2, 3, 0
]);
const uv= new Float32Array([
    0, 0, 0,
    0, 1, 0,
    1, 0, 0,
    1, 1, 0
]);

geometry.setIndex(indices);
geometry.addAttribute('position', new BufferAttribute(pos,3));
geometry.addAttribute('uv', new BufferAttribute(uv, 3));



let manager = new LoadingManager();
manager.onProgress = (item, loaded, total) => {
    console.log(item, loaded, total);
};

const texture = new VideoTexture(vid);

texture.generateMipmaps = false;
texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
texture.minFilter = LinearFilter;





let mesh = new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}))

scene.children[0] = mesh;




camera.position.z = 5

camera.lookAt(scene.position)

function animate(): void {
    requestAnimationFrame(animate)
    render()
}

function render(): void {
    renderer.render(scene, camera)
}

animate()
