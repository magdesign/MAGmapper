import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {UvDragHandler} from "../../dragger/UvDragHandler";
import {EventHandler, EventTypes} from "../../event/EventHandler";
import {IVideoMaterial, VideoMaterialBuilder} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {IDimension} from "../../math/DimensionTransformer";

export class VideoCutter {

    constructor(id: string, targetId: string, source: string, scene: Scene, startPoint: IDimension, renderer: WebGLRenderer, camera: PerspectiveCamera) {

        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(id, source, startPoint);

        scene.add(videoMaterial.mesh);

        const draghanlder = new UvDragHandler(scene, renderer, camera, videoMaterial.id, videoMaterial.positions, targetId);

        EventHandler.addEventListener(EventTypes.Cutter, (e) => {
            VideoSceneHelper.changeVisibility(e.detail.value, scene, videoMaterial.id);
            draghanlder.visible(e.detail.value);
        });

        EventHandler.addEventListener(EventTypes.Wireframe, (e) => {
            VideoSceneHelper.changeWireframe(e.detail.value, scene, id);
        });

        EventHandler.addEventListener(EventTypes.Outlines, (e) => {
            draghanlder.visible(e.detail.value);
        });
    }
}
