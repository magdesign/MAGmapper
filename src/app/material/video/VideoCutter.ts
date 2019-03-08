import { VideoMaterial } from "./VideoMaterial";
import { Scene, PerspectiveCamera } from "three";
import { WebGLRenderer } from "three";
import { EventHandler, EventTypes } from "../../event/EventHandler";
import { VideoSceneHelper } from "../VideoSceneHelper";
import { IDimension } from "../../math/DimensionTransformer";
import { UvDragHandler } from "../../dragger/UvDragHandler";
import { VideoMover } from "../../dragger/VideoMover";

export class VideoCutter extends VideoMaterial {

    private _targetId: string;

    constructor(id: string, targetId: string, source: string, scene: Scene, startPoint: IDimension, renderer: WebGLRenderer, camera:PerspectiveCamera) {
        super(id, source, scene, startPoint);
        this._targetId = targetId;

        super.draghanlder = new UvDragHandler(super.scene, renderer, camera, super.id, super.positions, this._targetId);

        EventHandler.addEventListener(EventTypes.Cutter, (e) => {
            VideoSceneHelper.changeVisibility(e.detail.value, scene, super.id);
            super.draghanlder.visible(e.detail.value);
        });
    }
}
