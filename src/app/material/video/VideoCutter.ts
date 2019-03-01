import { VideoMaterial } from "./VideoMaterial";
import { UvDragHandler, VideoMover } from "../../graphic/DragHandler";
import { Scene, PerspectiveCamera } from "three";
import { WebGLRenderer } from "three";
import { EventHandler, EventTypes } from "../../ui/UiConfig";
import { VideoSceneHelper } from "../VideoSceneHelper";
import { IDimension } from "../../math/DimensionTransformer";

export class VideoCutter extends VideoMaterial {

    private _targetId: string;

    constructor(id: string, targetId: string, source: string, scene: Scene, startPoint: IDimension, renderer: WebGLRenderer, camera:PerspectiveCamera) {
        super(id, source, scene, startPoint);
        this._targetId = targetId;

        super.draghanlder = new UvDragHandler(super.scene, renderer, camera, super.id, super.positions, this._targetId);
        const videoMover = new VideoMover(super.scene, renderer, camera, super.id, [super.draghanlder]);

        EventHandler.addEventListener(EventTypes.Cutter, (e) => {
            VideoSceneHelper.changeVisibility(e.detail.value, scene, super.id);
            super.draghanlder.visibility(e.detail.value);
        });
    }
}
