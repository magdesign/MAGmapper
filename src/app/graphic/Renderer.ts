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
    WebGLRenderer,
    Camera,
    Sprite,
    Renderer
} from 'three';
import { VideoMaterial, VideoMapper, VideoCutter } from './VideoMaterial';
import {Mapper, Indices, Edges, DimensionTransformer} from "./Mapper";
import { PositionDragHandler, UvDragHandler } from './DragHandler';

import { v4 as uuid } from 'uuid';
import { EventHandler, EventTypes } from '../ui/UiConfig';

class Graphic {
    public static init(){
        const id  = uuid();

        let scene: Scene = new Scene();
        let camera: PerspectiveCamera = this.loadCamera(scene);
        let renderer: WebGLRenderer = this.loadRenderer();

        let video1: VideoMaterial = new VideoMapper(id, "", scene, {x:0, y:0, z:0}, renderer,camera);
       
        const id2  = uuid();
       
        let video2: VideoMaterial = new VideoCutter(id2, id, "", scene, {x:3, y:0, z:0}, renderer,camera);

        // let dragHanldes: UvDragHandler = new UvDragHandler(scene, renderer, camera, video2, id);
        // PositionDragHandler.initVertices(scene, renderer, camera, video);

        this.rendermagic(renderer, camera, scene);
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


    private static rendermagic (renderer: WebGLRenderer , camera: PerspectiveCamera, scene: any) {
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