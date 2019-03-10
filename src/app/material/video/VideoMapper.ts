import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {PositionDragHandler} from "../../dragger/PositionDragHandler";
import {VideoMover} from "../../dragger/VideoMover";
import {EventHandler, EventTypes} from "../../event/EventHandler";
import {IDimension} from "../../math/DimensionTransformer";
import {VideoMaterial} from "./VideoMaterial";

export class VideoMapper extends VideoMaterial {
    constructor(id: string, source: string, scene: Scene, startPoint: IDimension, renderer: WebGLRenderer, camera: PerspectiveCamera) {
        super(id, source, scene, startPoint);
        super.draghanlder = new PositionDragHandler(super.scene, renderer, camera, super.id, super.positions);

        const mover: VideoMover = new VideoMover(super.scene, renderer, camera, super.id, [super.draghanlder]);

        EventHandler.addEventListener(EventTypes.Outlines, (e) => {
            mover.visible(e.detail.value);
        });
    }
}
