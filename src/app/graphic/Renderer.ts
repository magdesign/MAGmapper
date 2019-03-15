import {PerspectiveCamera, Scene, WebGLRenderer,} from "three";
import DragControls from "three-dragcontrols";
import {IDragHandler} from "../dragger/DragHandler";
import {EventManager} from "../event/EventManager";
import {IVideoMaterial} from "../material/VideoMaterialBuilder";
import {VideoCutter} from "./video/VideoCutter";
import {VideoMapper} from "./video/VideoMapper";

class Renderer {

    public static init() {
        const scene: Scene = new Scene();
        const renderer: WebGLRenderer = this.loadRenderer();
        const camera: PerspectiveCamera = this.loadCamera(scene, renderer);

        const videoMapper: IVideoMaterial = VideoMapper.create("assets/testvideo.mp4", {x: 0, y: 0, z: 0});

        const videoCutter: IVideoMaterial = VideoCutter.create(videoMapper, "assets/testvideo.mp4", {x: 3, y: 0, z: 0});

        VideoMapper.addToScene(videoMapper, scene);
        VideoCutter.addToScene(videoCutter, scene);

        this.createDragHandler([
            videoCutter.dragHandler,
            videoMapper.dragHandler,
            videoMapper.mover,
        ], camera, renderer);

        EventManager.init(videoCutter, videoMapper);

        // let dragHanldes: CutterDragHandler = new CutterDragHandler(scene, renderer, camera, video2, id);
        // PositionDragHandler.initVertices(scene, renderer, camera, video);

        this.rendermagic(renderer, camera, scene);
    }

    private static loadRenderer(): WebGLRenderer {
        const renderer: WebGLRenderer = new WebGLRenderer();
        // here we should notify the renderer about window resize
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);
        return renderer;
    }

    private static loadCamera(scene: Scene, renderer: WebGLRenderer): PerspectiveCamera {
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 5;
        camera.lookAt(scene.position);

        window.addEventListener("resize", () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }, false);

        return camera;
    }

    private static rendermagic(renderer: WebGLRenderer, camera: PerspectiveCamera, scene: any) {
        function animate(): void {
            requestAnimationFrame(animate);
            render();
        }

        function render(): void {
            renderer.render(scene, camera);
        }

        animate();
    }

    private static createDragHandler(dragger: IDragHandler[], camera, renderer) {
        dragger
            .forEach((dragHandler) => new DragControls(dragHandler.sprites, camera, renderer.domElement)
                .addEventListener("drag", dragHandler.fn));
    }
}

Renderer.init();
