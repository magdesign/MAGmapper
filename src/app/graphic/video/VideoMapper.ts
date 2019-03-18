import {Config} from "../../../config";
import {DragHandler, DragHandlerTypes, IDragHandler} from "../../dragger/DragHandler";
import {LineBuilder} from "../../material/LineBuilder";
import {SpriteBuilder} from "../../material/SpriteBuilder";
import {IVideoMaterial, VideoMaterialBuilder} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {DimensionTransformer, IDimension} from "../../math/DimensionTransformer";
import {Mapper} from "../../math/Mapper";
import {Sprite} from "three";
import {EventHandler, EventTypes} from "../../event/EventHandler";

export class VideoMapper {


    public static create(video: HTMLVideoElement, startPoint: IDimension): IVideoMaterial {
        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(video, startPoint);

        [
            DragHandler.create(videoMaterial.positions, DragHandlerTypes.Mapper, VideoMaterialBuilder.dragVideo(videoMaterial)),
            DragHandler.createMover(videoMaterial, VideoMaterialBuilder.moveVideo(videoMaterial, {x: 1, y: 1, z: 0})),
            DragHandler.createDelete(videoMaterial, () => EventHandler.throwEvent(EventTypes.RemoveQuad, videoMaterial)),
        ].forEach((dh: IDragHandler) => {
            videoMaterial.dragHandler.push(dh);
        });

        return videoMaterial;
    }

}
