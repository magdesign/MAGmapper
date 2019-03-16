import {PerspectiveCamera, Scene, Sprite, WebGLRenderer} from "three";
import DragControls from "three-dragcontrols";
import {IDragHandler} from "../dragger/DragHandler";
import {EventManager} from "../event/EventManager";
import {IVideoMaterial} from "../material/VideoMaterialBuilder";
import {VideoCutter} from "./video/VideoCutter";
import {VideoMapper} from "./video/VideoMapper";
import {HtmlVideoMaterial} from "../material/HtmlVideoMaterial";

class Renderer {

    public static init() {
        const scene: Scene = new Scene();
        const renderer: WebGLRenderer = this.loadRenderer();
        const camera: PerspectiveCamera = this.loadCamera(scene, renderer);
        const video: HTMLVideoElement = HtmlVideoMaterial.loadVideo("assets/testvideo.mp4");


        const videoMapper: IVideoMaterial = VideoMapper.create(video, {x: 0, y: 0, z: 0});
        const videoMapper1: IVideoMaterial = VideoMapper.create(video, {x: 0, y: 0, z: 0});
        const videoMapper2: IVideoMaterial = VideoMapper.create(video, {x: 0, y: 0, z: 0});

        const videoCutter: IVideoMaterial = VideoCutter.create([videoMapper, videoMapper1, videoMapper2], video, {
            x: 3,
            y: 0,
            z: 0,
        });

        VideoMapper.addToScene(videoMapper, scene);
        VideoMapper.addToScene(videoMapper1, scene);
        VideoMapper.addToScene(videoMapper2, scene);


        VideoCutter.addToScene(videoCutter, scene);


        this.createDragHandler([videoMapper, videoMapper1, videoMapper2, videoCutter], camera, renderer);

        EventManager.init([videoMapper, videoMapper1, videoMapper2, videoCutter]);

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

    private static rendermagic(renderer: WebGLRenderer, camera: PerspectiveCamera, scene: any): void {
        function animate(): void {
            requestAnimationFrame(animate);
            render();
        }

        function render(): void {
            renderer.render(scene, camera);
        }

        animate();
    }

    private static createDragHandler(materials: IVideoMaterial[], camera, renderer) {
        const dragHandler: IDragHandler[] = materials
            .map((material: IVideoMaterial) => {
                return material.dragHandler;
            })
            .reduce((a, b) => a.concat(b));

        const sprites = dragHandler.map(dh => {
            return dh.sprites.map((sprite: Sprite) => {
                return sprite;
            });
        })
            .reduce((a, b) => a.concat(b));


        return new DragControls(sprites, camera, renderer.domElement)
            .addEventListener("drag", (value) => {
                dragHandler
                    .filter((dh) =>
                        dh.sprites.filter((sprite) =>
                            sprite.uuid === value.object.uuid).length > 0)
                    .map((dh) => dh.fn(value));
            });
    }
}

Renderer.init();
