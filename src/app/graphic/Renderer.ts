import {PerspectiveCamera, Scene, WebGLRenderer,} from "three";

import {v4 as uuid} from "uuid";
import {VideoCutter} from "../material/video/VideoCutter";
import {VideoMapper} from "../material/video/VideoMapper";
import {VideoMaterial} from "../material/video/VideoMaterial";

class Graphic {
    public static init() {
        const id = uuid();

        const scene: Scene = new Scene();
        const camera: PerspectiveCamera = this.loadCamera(scene);
        const renderer: WebGLRenderer = this.loadRenderer();

        const video1: VideoMaterial = new VideoMapper(id, "", scene, {x: 0, y: 0, z: 0}, renderer, camera);

        const id2 = uuid();
        const video2: VideoMaterial = new VideoCutter(id2, id, "", scene, {x: 3, y: 0, z: 0}, renderer, camera);

        // let dragHanldes: UvDragHandler = new UvDragHandler(scene, renderer, camera, video2, id);
        // PositionDragHandler.initVertices(scene, renderer, camera, video);

        this.rendermagic(renderer, camera, scene);
    }

    private static loadRenderer(): WebGLRenderer {
        const renderer: WebGLRenderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        return renderer;
    }

    private static loadCamera(scene: Scene): PerspectiveCamera {
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 5;
        camera.lookAt(scene.position);
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

}

Graphic.init();
