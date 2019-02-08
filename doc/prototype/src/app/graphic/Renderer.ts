import {
    BoxGeometry, 
    BufferAttribute, 
    BufferGeometry, 
    ClampToEdgeWrapping,
    DirectionalLight, 
    LinearFilter,
    LoadingManager,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene, TypedArray,
    VideoTexture,
    WebGLRenderer
} from 'three';
import {VideoMaterial} from "./VideoMaterial";
import {Mapper, Indices} from "./Mapper";

const size = 10;

class Graphic {
    public static init(){
        let scene: Scene = new Scene();
        const video: HTMLVideoElement = VideoMaterial.loadVideo();

        let geometry = new BufferGeometry();

        const indices: number[] = Indices.calcIndices(size);
        const pos = Mapper.transform(Mapper.vertices(size,4))
        const uv =  Mapper.transform(Mapper.uv(size));

        geometry.setIndex(indices);
        geometry.addAttribute('position', new BufferAttribute(pos, 3));
        geometry.addAttribute('uv', new BufferAttribute(uv, 3));

        const texture = new VideoTexture(video);

        texture.generateMipmaps = false;
        texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
        texture.minFilter = LinearFilter;


        let mesh = new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}));
        scene.add(mesh);

        

        this.rendermagic(this.loadRenderer(), this.loadCamera(scene), scene);
    }

    private static loadRenderer(): WebGLRenderer {
        let renderer: WebGLRenderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        return renderer;
    }

    private static loadCamera(scene: Scene): PerspectiveCamera {
        let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 5;
        camera.lookAt(scene.position);
        return camera;
    }


    private static rendermagic (renderer: WebGLRenderer , camera: PerspectiveCamera, scene: Scene) {
        function animate(): void {
            requestAnimationFrame(animate);
            render()
        }

        function render(): void {
            renderer.render(scene, camera)
        }
        animate();
    }

}
Graphic.init();