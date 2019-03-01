import { VideoMaterial } from "./VideoMaterial";
import { PositionDragHandler, VideoMover } from "../../graphic/DragHandler";
import { Scene } from "three";
import { WebGLRenderer } from "three";
import { PerspectiveCamera } from "three";
import { IDimension } from "../../math/DimensionTransformer";

export class VideoMapper extends VideoMaterial {
    constructor(id: string, source: string, scene: Scene, startPoint: IDimension, renderer: WebGLRenderer, camera:PerspectiveCamera){
        super(id, source, scene, startPoint);
        super.draghanlder = new PositionDragHandler(super.scene, renderer, camera, super.id, super.positions);
        console.log(super.id)
        new VideoMover(super.scene, renderer, camera, super.id, [super.draghanlder]);
    }
}
