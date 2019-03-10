import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {UvDragHandler} from "../../dragger/UvDragHandler";
import {EventHandler, EventTypes} from "../../event/EventHandler";
import {IDimension} from "../../math/DimensionTransformer";
import {VideoSceneHelper} from "../VideoSceneHelper";
import {VideoMaterial} from "./VideoMaterial";

export class VideoCutter extends VideoMaterial {

    private _targetId: string;

    constructor(id: string, targetId: string, source: string, scene: Scene, startPoint: IDimension, renderer: WebGLRenderer, camera: PerspectiveCamera) {
        super(id, source, scene, startPoint);
        this._targetId = targetId;

        super.draghanlder = new UvDragHandler(super.scene, renderer, camera, super.id, super.positions, this._targetId);

        EventHandler.addEventListener(EventTypes.Cutter, (e) => {
            VideoSceneHelper.changeVisibility(e.detail.value, scene, super.id);
            super.draghanlder.visible(e.detail.value);
        });
    }
}
