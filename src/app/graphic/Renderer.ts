import {PerspectiveCamera, Scene, WebGLRenderer,} from "three";
import DragControls from "three-dragcontrols";

import {v4 as uuid} from "uuid";
import {IVideoMaterial} from "../material/VideoMaterialBuilder";
import {VideoCutter} from "./video/VideoCutter";
import {VideoMapper} from "./video/VideoMapper";

class Graphic {
    public static init() {


        const scene: Scene = new Scene();
        const camera: PerspectiveCamera = this.loadCamera(scene);
        const renderer: WebGLRenderer = this.loadRenderer();

        const videoMapper: IVideoMaterial = VideoMapper.create("", {x: 0, y: 0, z: 0});
        VideoMapper.addToScene(videoMapper, scene);

        new DragControls(videoMapper.dragHandler.sprites, camera, renderer.domElement)
            .addEventListener("drag", videoMapper.dragHandlerFn);

        const videoCutter: IVideoMaterial = VideoCutter.create(videoMapper, "",  {x: 3, y: 0, z: 0});

        VideoMapper.addToScene(videoCutter, scene);

        new DragControls(videoCutter.dragHandler.sprites, camera, renderer.domElement)
            .addEventListener("drag", videoCutter.dragHandlerFn);

        // let dragHanldes: CutterDragHandler = new CutterDragHandler(scene, renderer, camera, video2, id);
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
