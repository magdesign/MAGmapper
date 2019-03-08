import { VideoMaterial } from "./VideoMaterial";
import { Scene } from "three";
import { WebGLRenderer } from "three";
import { PerspectiveCamera } from "three";
import { IDimension } from "../../math/DimensionTransformer";
import { PositionDragHandler } from "../../dragger/PositionDragHandler";
import { VideoMover } from "../../dragger/VideoMover";
import { EventHandler, EventTypes } from "../../event/EventHandler";

export class VideoMapper extends VideoMaterial {
    constructor(id: string, source: string, scene: Scene, startPoint: IDimension, renderer: WebGLRenderer, camera:PerspectiveCamera){
        super(id, source, scene, startPoint);
        super.draghanlder = new PositionDragHandler(super.scene, renderer, camera, super.id, super.positions);

        const mover: VideoMover = new VideoMover(super.scene, renderer, camera, super.id, [super.draghanlder]);


        EventHandler.addEventListener(EventTypes.Outlines, (e) => {
            mover.visible(e.detail.value);
        });
    }
}
