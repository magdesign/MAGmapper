import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {PositionDragHandler} from "../../dragger/PositionDragHandler";
import {VideoMover} from "../../dragger/VideoMover";
import {EventHandler, EventTypes} from "../../event/EventHandler";
import {IVideoMaterial, VideoMaterialBuilder} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {IDimension} from "../../math/DimensionTransformer";

export class VideoMapper {
    constructor(id: string, source: string, scene: Scene, startPoint: IDimension, renderer: WebGLRenderer, camera: PerspectiveCamera) {

        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(id, source, startPoint);
        scene.add(videoMaterial.mesh);


        const draghanlder = new PositionDragHandler(scene, renderer, camera, videoMaterial.id, videoMaterial.positions);
        const mover: VideoMover = new VideoMover(scene, renderer, camera, videoMaterial.id, [draghanlder]);

        EventHandler.addEventListener(EventTypes.Outlines, (e) => {
            mover.visible(e.detail.value);
        });


        EventHandler.addEventListener(EventTypes.Wireframe, (e) => {
            VideoSceneHelper.changeWireframe(e.detail.value, scene, id);
        });

        EventHandler.addEventListener(EventTypes.Outlines, (e) => {
            draghanlder.visible(e.detail.value);
        });
    }
}
